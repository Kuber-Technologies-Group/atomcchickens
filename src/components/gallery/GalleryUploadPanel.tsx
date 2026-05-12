import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Upload, X, ImagePlus, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { GALLERY_CATEGORIES } from "@/types/gallery";

const IK_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const IK_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

interface GalleryUploadPanelProps {
  onUploaded: () => void;
}

interface FilePreview {
  file: File;
  preview: string;
  title: string;
  caption: string;
  category: string;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
  errorMsg?: string;
}

const uploadToImageKit = async (
  file: File,
  fileName: string,
  onProgress: (pct: number) => void
): Promise<{ publicUrl: string; storagePath: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("publicKey", IK_PUBLIC_KEY);
    formData.append("fileName", fileName);
    formData.append("folder", "/atomcchickens/gallery");
    formData.append("useUniqueFileName", "true");
    // Required by ImageKit even for unsigned uploads — send as empty strings
    formData.append("signature", "");
    formData.append("expire", "0");
    formData.append("token", "");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", IK_UPLOAD_URL);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve({
          publicUrl: data.url,
          storagePath: data.fileId,
          width: data.width || 0,
          height: data.height || 0,
        });
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          // Surface the exact ImageKit error message so we can debug
          reject(new Error(err?.message || `ImageKit error: ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed: status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error — check your connection"));
    xhr.send(formData);
  });
};

const GalleryUploadPanel = ({ onUploaded }: GalleryUploadPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const addFiles = (selected: File[]) => {
    const imageFiles = selected.filter(f => f.type.startsWith("image/"));
    setFiles(prev => [
      ...prev,
      ...imageFiles.map(f => ({
        file: f,
        preview: URL.createObjectURL(f),
        title: f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        caption: "",
        category: "Birds",
        status: "pending" as const,
        progress: 0,
      })),
    ]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(e.target.files || []));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const updateFile = (index: number, field: keyof FilePreview, value: string) => {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, [field]: value } : f));
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleClose = () => {
    if (uploading) return;
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setIsOpen(false);
  };

  const handleUpload = async () => {
    if (!currentUser || files.length === 0) return;
    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const fp = files[i];
      if (fp.status === "done") { successCount++; continue; }
      if (fp.status !== "pending" && fp.status !== "error") continue;

      setFiles(prev => prev.map((f, idx) =>
        idx === i ? { ...f, status: "uploading", progress: 0, errorMsg: undefined } : f
      ));

      try {
        const safeName = fp.file.name.replace(/[^a-zA-Z0-9._-]/g, "-");

        const { publicUrl, storagePath, width, height } = await uploadToImageKit(
          fp.file,
          safeName,
          (pct) => setFiles(prev => prev.map((f, idx) =>
            idx === i ? { ...f, progress: pct } : f
          ))
        );

        const { error: dbError } = await supabase.from("gallery_photos").insert({
          title: fp.title || null,
          caption: fp.caption || null,
          category: fp.category,
          storage_path: storagePath,
          public_url: publicUrl,
          width,
          height,
          uploaded_by: currentUser.id,
          sort_order: 0,
        });

        if (dbError) throw dbError;

        setFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, status: "done", progress: 100 } : f
        ));
        successCount++;

      } catch (err: any) {
        console.error("Upload error:", err);
        setFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, status: "error", errorMsg: err?.message || "Upload failed" } : f
        ));
      }
    }

    setUploading(false);

    if (successCount > 0) {
      toast({ title: `${successCount} photo${successCount > 1 ? "s" : ""} uploaded!` });
      onUploaded();
      if (successCount === files.length) {
        setTimeout(() => {
          files.forEach(f => URL.revokeObjectURL(f.preview));
          setFiles([]);
          setIsOpen(false);
        }, 1000);
      }
    }
  };

  const pendingCount = files.filter(f => f.status === "pending").length;
  const errorCount  = files.filter(f => f.status === "error").length;
  const doneCount   = files.filter(f => f.status === "done").length;

  const modal = isOpen ? createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999, background: "rgba(0,0,0,0.65)" }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full relative shadow-2xl flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-charcoal">Upload Photos</h2>
            <p className="text-xs text-gray-400 font-inter mt-0.5">Powered by ImageKit · 20GB free</p>
          </div>
          <button
            onClick={handleClose}
            disabled={uploading}
            className="p-1.5 rounded-full text-gray-400 hover:text-charcoal hover:bg-gray-100 transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 min-h-0 px-6 py-4">
          {/* Drop zone */}
          {!uploading && (
            <div
              className="border-2 border-dashed border-warmBrown/30 rounded-xl p-8 text-center cursor-pointer hover:border-warmBrown/60 hover:bg-yellow-50 transition-colors mb-4"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); addFiles(Array.from(e.dataTransfer.files)); }}
            >
              <Upload className="w-8 h-8 text-warmBrown/50 mx-auto mb-2" />
              <p className="text-gray-500 font-inter">
                <span className="text-warmBrown font-medium">Click to select</span> or drag & drop
              </p>
              <p className="text-gray-400 text-sm mt-1">JPG, PNG, WEBP · multiple files OK</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          )}

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-3">
              {files.map((fp, i) => (
                <div
                  key={i}
                  className={`flex gap-4 rounded-xl p-3 relative border transition-colors ${
                    fp.status === "done"      ? "bg-green-50 border-green-100" :
                    fp.status === "error"     ? "bg-red-50 border-red-100" :
                    fp.status === "uploading" ? "bg-blue-50 border-blue-100" :
                    "bg-gray-50 border-transparent"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 w-20 h-20">
                    <img src={fp.preview} alt={fp.title} className="w-20 h-20 object-cover rounded-lg" />
                    {fp.status === "uploading" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <span className="text-white text-xs font-bold">{fp.progress}%</span>
                      </div>
                    )}
                    {fp.status === "done" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-500/50 rounded-lg">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    )}
                    {fp.status === "error" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-500/50 rounded-lg">
                        <AlertCircle className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {fp.status === "uploading" && (
                      <div className="w-full bg-blue-100 rounded-full h-1">
                        <div className="bg-blue-500 h-1 rounded-full transition-all" style={{ width: `${fp.progress}%` }} />
                      </div>
                    )}
                    {fp.status === "error" && fp.errorMsg && (
                      <p className="text-red-500 text-xs font-inter leading-snug">{fp.errorMsg}</p>
                    )}
                    <Input
                      value={fp.title}
                      onChange={e => updateFile(i, "title", e.target.value)}
                      placeholder="Title (optional)"
                      className="text-sm h-8"
                      disabled={fp.status === "uploading" || fp.status === "done"}
                    />
                    <Input
                      value={fp.caption}
                      onChange={e => updateFile(i, "caption", e.target.value)}
                      placeholder="Caption (optional)"
                      className="text-sm h-8"
                      disabled={fp.status === "uploading" || fp.status === "done"}
                    />
                    <select
                      value={fp.category}
                      onChange={e => updateFile(i, "category", e.target.value)}
                      disabled={fp.status === "uploading" || fp.status === "done"}
                      className="w-full h-8 text-sm border border-gray-200 rounded-md px-2 bg-white font-inter disabled:opacity-60"
                    >
                      {GALLERY_CATEGORIES.filter(c => c !== "All").map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {fp.status === "pending" && !uploading && (
                    <button onClick={() => removeFile(i)} className="absolute top-2 right-2 text-gray-300 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {files.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 flex-shrink-0">
            <p className="text-sm font-inter text-gray-500">
              {uploading ? (
                <span className="text-blue-500 font-medium">Uploading {doneCount + 1} of {files.length}…</span>
              ) : errorCount > 0 ? (
                <span className="text-red-500">{errorCount} failed — retry below</span>
              ) : doneCount === files.length ? (
                <span className="text-green-600 font-medium">✓ All uploaded!</span>
              ) : (
                <span>{pendingCount} photo{pendingCount !== 1 ? "s" : ""} ready</span>
              )}
            </p>
            <div className="flex gap-3">
              {!uploading && pendingCount > 0 && (
                <Button variant="outline" onClick={() => { files.forEach(f => URL.revokeObjectURL(f.preview)); setFiles([]); }}>
                  Clear
                </Button>
              )}
              <Button
                onClick={handleUpload}
                disabled={uploading || (pendingCount === 0 && errorCount === 0)}
                className="bg-warmBrown hover:bg-warmBrown/90 text-white gap-2 min-w-[160px] justify-center"
              >
                {uploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Uploading…</>
                ) : errorCount > 0 ? (
                  <><Upload className="w-4 h-4" />Retry {errorCount} failed</>
                ) : (
                  <><Upload className="w-4 h-4" />Upload {pendingCount} photo{pendingCount !== 1 ? "s" : ""}</>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-warmBrown hover:bg-warmBrown/90 text-white gap-2">
        <ImagePlus className="w-4 h-4" />
        Upload Photos
      </Button>
      {modal}
    </>
  );
};

export default GalleryUploadPanel;

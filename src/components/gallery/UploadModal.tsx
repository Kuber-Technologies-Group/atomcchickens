
import { useState, useRef, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { X, Upload, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
  breedOptions: string[];
}

const UploadModal = ({ isOpen, onClose, onUploadSuccess, breedOptions }: UploadModalProps) => {
  const { currentUser } = useAuth();
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedBreed || !currentUser) {
      toast({
        title: "Error",
        description: "Please select a breed and an image file.",
        variant: "destructive",
      });
      return;
    }

    // Check if the file is an image
    if (!selectedFile.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Generate a unique ID for the image
      const imageId = uuidv4();
      const fileName = `${imageId}-${selectedFile.name}`;
      
      // Create a reference to the storage location
      const storageRef = ref(storage, `gallery/${selectedBreed}/${fileName}`);
      
      // Upload the file with progress monitoring
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          toast({
            title: "Error",
            description: "Upload failed. Please try again.",
            variant: "destructive",
          });
          setUploading(false);
        },
        async () => {
          // Upload completed successfully
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save metadata to Firestore
          await setDoc(doc(db, "gallery", imageId), {
            id: imageId,
            name: selectedFile.name,
            breed: selectedBreed,
            url: downloadURL,
            uploadedBy: currentUser.uid,
            uploadedByName: currentUser.displayName || currentUser.email,
            createdAt: new Date().toISOString()
          });
          
          // Reset the form
          setSelectedFile(null);
          setPreviewUrl(null);
          setSelectedBreed("");
          setProgress(0);
          setUploading(false);
          
          // Close the modal and notify parent component
          onClose();
          onUploadSuccess();
        }
      );
    } catch (error) {
      console.error("Error during upload:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Chicken Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="breed">Breed</Label>
            <Select 
              value={selectedBreed} 
              onValueChange={setSelectedBreed}
              disabled={uploading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a breed" />
              </SelectTrigger>
              <SelectContent>
                {breedOptions.map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Image</Label>
            <Input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            
            {!previewUrl ? (
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:bg-muted transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Image className="h-12 w-12 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    Drag and drop an image, or click to browse
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-auto rounded-md max-h-64 object-contain"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleRemoveFile}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || !selectedBreed || uploading}
            className="bg-primary hover:bg-primary/90"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;

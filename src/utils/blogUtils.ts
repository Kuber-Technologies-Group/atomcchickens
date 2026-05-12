export const createSlug = (title: string, id: string): string => {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return `${titleSlug}-${id}`;
};

export const getIdFromSlug = (slug: string): string => {
  // ID is always the last segment after the final hyphen group (UUID = 36 chars)
  const parts = slug.split("-");
  // UUID is 5 parts joined by hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  if (parts.length >= 5) {
    return parts.slice(-5).join("-");
  }
  return parts[parts.length - 1];
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getExcerpt = (content: string, length = 160): string => {
  const plain = content.replace(/<[^>]+>/g, "");
  return plain.length > length ? plain.slice(0, length).trimEnd() + "…" : plain;
};

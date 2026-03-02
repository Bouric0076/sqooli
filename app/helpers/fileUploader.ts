  export const uploadDocument = async (
    file: File,
    title: string,
    entityId: string,
    entityType:string,
    category: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("Title", title);
    formData.append("Category", category);
    formData.append("EntityType", entityType);
    formData.append("EntityId", entityId.toString());
    formData.append("IsPublic", "false");

    const res = await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "File upload failed");
    }
  };


  export const validateFile = (file: File) => {
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowed.includes(file.type)) return "Only PDF, PNG or JPG allowed";
    if (file.size > 10 * 1024 * 1024) return "File must be less than 10MB";
    return null;
  };

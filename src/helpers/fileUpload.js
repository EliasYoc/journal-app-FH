export const fileUpload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/diusrxrra/upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "react-journal-fh");
  try {
    const res = await fetch(cloudUrl, { method: "POST", body: formData });
    if (res.ok) {
      const data = await res.json();
      return data.secure_url;
    } else {
      throw await res.json();
    }
  } catch (error) {
    console.log("catch", error);
  }
};

import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { apiService } from "@utils/apiService";

const FileUploader = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "video/*": [".mp4", ".mov", ".avi"],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    onDrop: handleUpload,
  });

  async function handleUpload(files) {
    if (files.length === 0) return;

    setUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiService.uploadFile("/upload/media", file, {
          title: file.name,
          type: file.type.startsWith("image/") ? "image" : "video",
        });

        onUploadSuccess?.(response);
      }

      toast.success("تم الرفع بنجاح");
    } catch (error) {
      toast.error("خطأ في الرفع");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div>جاري الرفع... {progress}%</div>
      ) : (
        <div>
          <p>اسحب الملفات هنا أو اضغط للاختيار</p>
          <p className="mt-2 text-sm text-gray-500">
            الصور والفيديوهات فقط (حد أقصى 100MB)
          </p>
        </div>
      )}
    </div>
  );
};

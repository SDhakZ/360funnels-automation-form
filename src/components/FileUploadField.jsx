import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { File } from "lucide-react";

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const acceptedFormats = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "image/*": [".png", ".jpg", ".jpeg", ".webp"],
};

export default function FileUploadField({
  label = "Brand Book",
  onFileSelect,
  error,
}) {
  const [fileName, setFileName] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        alert(fileRejections[0].errors[0].message);
        return;
      }

      const file = acceptedFiles[0];
      setFileName(file.name);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: MAX_SIZE_BYTES,
    accept: acceptedFormats,
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-sm font-medium text-gray-800">{label}</label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
          <File className="text-slate-00" size={56} />
          <p className="font-medium text-slate-600">
            {fileName || "Drag and drop a file or click to browse"}
          </p>
          <p className="text-sm text-slate-600">
            PDF, DOCX, image • Max {MAX_SIZE_MB}MB
          </p>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

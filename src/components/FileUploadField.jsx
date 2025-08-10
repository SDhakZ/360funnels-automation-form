import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { File } from "lucide-react";

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const MAX_FILES = 10;

// light extension check (extra safety; server still validates)
const hasAllowedExt = (file) => {
  const name = (file.name || "").toLowerCase();
  return (
    name.endsWith(".pdf") ||
    name.endsWith(".docx") ||
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".webp")
  );
};

const acceptedFormats = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "image/*": [".png", ".jpg", ".jpeg", ".webp"],
};

export default function FileUploadField({
  label = "Brand assets",
  onFileSelect,
  error,
  multiple = true,
  selectedLabel,
  alreadySelectedCount = 0,
}) {
  const [localLabel, setLocalLabel] = useState(null);

  useEffect(() => {
    if (!selectedLabel) setLocalLabel(null);
  }, [selectedLabel]);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        alert(fileRejections[0].errors[0].message);
        return;
      }

      const incoming = multiple ? acceptedFiles : acceptedFiles.slice(0, 1);

      const safe = incoming.filter(hasAllowedExt);
      if (!safe.length) {
        alert("Unsupported file type.");
        return;
      }

      let allowed = safe;
      if (multiple) {
        const slots = Math.max(0, MAX_FILES - alreadySelectedCount);
        if (slots === 0) {
          alert(`You can upload up to ${MAX_FILES} files.`);
          return;
        }
        allowed = safe.slice(0, slots);
      }

      if (multiple) {
        setLocalLabel(`${allowed.length} file(s) selected`);
        onFileSelect?.(allowed);
      } else {
        const file = allowed[0];
        setLocalLabel(file?.name || null);
        onFileSelect?.(file);
      }
    },
    [onFileSelect, multiple, alreadySelectedCount]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxSize: MAX_SIZE_BYTES,
    accept: acceptedFormats,
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-sm font-medium text-gray-800">{label}</label>

      <div
        {...getRootProps()}
        className={`rounded-md border-2 border-dashed p-6 text-center transition cursor-pointer ${
          isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
          <File className="text-slate-600" size={56} />
          <p className="font-medium text-slate-600">
            {selectedLabel ||
              localLabel ||
              "Drag & drop files or click to browse"}
          </p>
          <p className="text-sm text-slate-600">
            PDF, DOCX, images • Max {MAX_SIZE_MB}MB each • Up to {MAX_FILES}{" "}
            files
          </p>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

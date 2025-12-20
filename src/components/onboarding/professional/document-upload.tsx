"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Upload,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import {
  uploadVerificationDocument,
  validateFile,
  deleteVerificationDocument
} from "@/lib/onboarding/storage";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/onboarding/professional-constants";

interface DocumentUploadProps {
  label: string;
  description?: string;
  documentType: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function DocumentUpload({
  label,
  description,
  documentType,
  value,
  onChange,
  required = false,
  error,
  className,
}: DocumentUploadProps) {
  const [status, setStatus] = useState<UploadStatus>(value ? "success" : "idle");
  const [fileName, setFileName] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [filePath, setFilePath] = useState<string>("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        setStatus("error");
        setUploadError(validation.error || "Invalid file");
        return;
      }

      setStatus("uploading");
      setFileName(file.name);
      setUploadError("");

      // Upload file
      const result = await uploadVerificationDocument(file, documentType);

      if (result.success && result.url) {
        setStatus("success");
        setFilePath(result.path || "");
        onChange(result.url);
      } else {
        setStatus("error");
        setUploadError(result.error || "Upload failed");
      }
    },
    [documentType, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: status === "uploading",
  });

  const handleRemove = async () => {
    if (filePath) {
      await deleteVerificationDocument(filePath);
    }
    setStatus("idle");
    setFileName("");
    setFilePath("");
    setUploadError("");
    onChange(undefined);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {status === "success" && value ? (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-800 dark:text-green-200 truncate">
              {fileName || "Document uploaded"}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              Uploaded successfully
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-green-700 hover:text-green-900 hover:bg-green-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors",
            isDragActive
              ? "border-nova-500 bg-nova-50 dark:bg-nova-950"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            status === "error" && "border-destructive bg-destructive/5",
            status === "uploading" && "pointer-events-none opacity-60",
            error && "border-destructive"
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center gap-2 text-center">
            {status === "uploading" ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-nova-500" />
                <p className="text-sm text-muted-foreground">
                  Uploading {fileName}...
                </p>
              </>
            ) : status === "error" ? (
              <>
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p className="text-sm text-destructive">{uploadError}</p>
                <p className="text-xs text-muted-foreground">
                  Click or drag to try again
                </p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-muted p-3">
                  {isDragActive ? (
                    <File className="h-6 w-6 text-nova-500" />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive
                      ? "Drop your file here"
                      : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG or WebP (max 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {error && !uploadError && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

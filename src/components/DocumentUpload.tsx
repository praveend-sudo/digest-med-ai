import { useCallback, useState } from "react";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "success" | "error";
  content?: string;
}

interface DocumentUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  onRemoveFile: (id: string) => void;
}

export function DocumentUpload({ onFilesUploaded, uploadedFiles, onRemoveFile }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback(async (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (const file of Array.from(files)) {
      const id = crypto.randomUUID();
      const uploadedFile: UploadedFile = {
        id,
        file,
        status: "uploading",
      };
      newFiles.push(uploadedFile);
    }

    onFilesUploaded(newFiles);

    // Simulate file processing
    for (const uploadedFile of newFiles) {
      try {
        const content = await readFileContent(uploadedFile.file);
        uploadedFile.content = content;
        uploadedFile.status = "success";
      } catch (error) {
        uploadedFile.status = "error";
      }
    }
    
    onFilesUploaded([...newFiles]);
  }, [onFilesUploaded]);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-2xl border-2 border-dashed p-8 transition-all duration-300",
          "flex flex-col items-center justify-center gap-4 text-center",
          isDragging
            ? "border-primary bg-accent/50 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-accent/30"
        )}
      >
        <div className={cn(
          "rounded-full p-4 transition-all duration-300",
          isDragging ? "bg-primary text-primary-foreground" : "bg-secondary"
        )}>
          <Upload className="h-8 w-8" />
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">
            Drop your medical records here
          </p>
          <p className="text-sm text-muted-foreground">
            PDF, TXT, DOC, or DOCX files up to 10MB each
          </p>
        </div>

        <label className="cursor-pointer">
          <Button variant="outline" className="pointer-events-none">
            Browse Files
          </Button>
          <input
            type="file"
            className="sr-only"
            multiple
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileInput}
          />
        </label>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Uploaded Documents ({uploadedFiles.length})
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="group flex items-center gap-3 rounded-xl bg-card p-3 shadow-soft transition-all hover:shadow-card animate-slide-up"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <FileText className="h-5 w-5 text-accent-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.file.size)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {file.status === "uploading" && (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  )}
                  {file.status === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  )}
                  {file.status === "error" && (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                  
                  <button
                    onClick={() => onRemoveFile(file.id)}
                    className="rounded-lg p-1.5 opacity-0 transition-opacity hover:bg-destructive/10 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

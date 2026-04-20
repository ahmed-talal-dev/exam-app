"use client";

import React from "react";
import { UploadCloud, Trash2, Download } from "lucide-react";

type FileUploadProps = {
    label?: string;
    multiple?: boolean;
};

function FileUpload({
    label = "Label",
    multiple = false,
}: FileUploadProps) {
    const [files, setFiles] = React.useState<File[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const [previews, setPreviews] = React.useState<string[]>([]);

    const addFiles = (newFiles: File[]) => {
        const urls = newFiles.map((file) =>
            URL.createObjectURL(file)
        );

        setFiles((prev) =>
            multiple ? [...prev, ...newFiles] : newFiles
        );

        setPreviews((prev) =>
            multiple ? [...prev, ...urls] : urls
        );
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;
        addFiles(Array.from(e.target.files));
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const removeFile = (index: number) => {
        URL.revokeObjectURL(previews[index]);

        setFiles((prev) =>
            prev.filter((_, i) => i !== index)
        );

        setPreviews((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const downloadFile = (file: File) => {
        const url = URL.createObjectURL(file);

        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-3">
            <p className="font-mono text-[16px] font-medium text-[var(--gray-800)]">
                {label}
            </p>

            <label
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex h-[86px] cursor-pointer items-center justify-center border transition-all ${isDragging
                    ? "border-[var(--blue-600)] bg-[var(--blue-50)]"
                    : "border-[var(--gray-300)]"
                    }`}
            >
                <div className="flex items-center gap-2">
                    <UploadCloud className="size-5 text-[var(--gray-500)]" />

                    <span className="font-mono text-sm text-[var(--gray-500)]">
                        Drop an image here or{" "}
                        <span className="text-[var(--blue-600)]">
                            select from your computer
                        </span>
                    </span>
                </div>

                <input
                    type="file"
                    multiple={multiple}
                    className="hidden"
                    onChange={handleChange}
                />
            </label>

            {files.map((file, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between bg-[var(--gray-50)] px-4 py-3"
                >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                        <img
                            src={previews[index]}
                            alt={file.name}
                            className="size-16 shrink-0 object-cover"
                        />

                        <span className="truncate font-mono text-sm text-[var(--gray-700)]">
                            {file.name}
                        </span>
                    </div>

                    <div className="ml-4 flex shrink-0 items-center gap-3">
                        <span className="text-sm text-[var(--gray-400)]">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>

                        <div className="h-[18px] w-px bg-[var(--gray-200)]" />

                        <button onClick={() => downloadFile(file)}>
                            <Download className="size-4 text-[var(--blue-600)]" />
                        </button>

                        <button onClick={() => removeFile(index)}>
                            <Trash2 className="size-4 text-[var(--red-600)]" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export { FileUpload };
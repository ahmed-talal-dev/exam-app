"use client";

import React from "react";
import { UploadCloud, Trash2, Download } from "lucide-react";
import Image from "next/image";

type FileUploadProps = {
    label?: string;
    multiple?: boolean;
};

function FileUpload({
    label = "Label",
    multiple = false,
}: FileUploadProps) {
    // Stores uploaded files
    const [files, setFiles] = React.useState<File[]>([]);

    // Controls drag-and-drop active state styling
    const [isDragging, setIsDragging] = React.useState(false);

    // Stores preview URLs for uploaded images
    const [previews, setPreviews] = React.useState<string[]>([]);

    // Adds selected or dropped files to state
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
    // Handles file selection from input
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;
        addFiles(Array.from(e.target.files));
    };

    // Handles files dropped inside the upload area
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    // Removes selected file and its preview
    const removeFile = (index: number) => {
        URL.revokeObjectURL(previews[index]);

        setFiles((prev) =>
            prev.filter((_, i) => i !== index)
        );

        setPreviews((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // Downloads the selected file
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
            {/* Upload section label */}
            <p className="font-mono text-[16px] font-medium text-(--gray-800)">
                {label}
            </p>

            {/* Drag and drop upload area */}
            <label
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex h-21.5 cursor-pointer items-center justify-center border transition-all ${isDragging
                    ? "border-(--blue-600) bg-(--blue-50)"
                    : "border-(--gray-300)"
                    }`}
            >
                <div className="flex items-center gap-2 px-12">
                    <UploadCloud className="size-5 text-(--gray-500)" />

                    <span className="font-mono text-sm text-(--gray-500)">
                        Drop an image here or{" "}
                        <span className="text-(--blue-600)">
                            select from your computer
                        </span>
                    </span>
                </div>

                {/* Hidden native file input */}
                <input
                    type="file"
                    multiple={multiple}
                    className="hidden"
                    onChange={handleChange}
                />
            </label>

            {/* Uploaded files list */}
            {files.map((file, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between bg-(--gray-50) px-4 py-3"
                >
                    {/* Left section: preview + file name    
                     flex-1 keeps right actions fixed
                     truncate prevents long names from breaking layout*/}

                    <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="relative size-16 shrink-0">
                            <Image
                                src={previews[index]}
                                alt={file.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>

                        <span className="truncate font-mono text-sm text-(--gray-700)">
                            {file.name}
                        </span>
                    </div>

                    {/* Right section:fixed size info + actions */}
                    <div className="ml-4 flex shrink-0 items-center gap-3">
                        <span className="text-sm text-(--gray-400)">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>

                        {/* Vertical divider */}
                        <div className="h-4.5 w-px bg-(--gray-200)" />

                        {/* Download button */}
                        <button onClick={() => downloadFile(file)}>
                            <Download className="size-4 text-(--blue-600)" />
                        </button>

                        {/* Delete button */}
                        <button onClick={() => removeFile(index)}>
                            <Trash2 className="size-4 text-(--red-600)" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export { FileUpload };
"use client";

import { FileUpload } from "@/components/ui/file-upload";
import * as React from "react";

export default function Home() {



  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="space-y-4">



        <FileUpload multiple />

        <FileUpload label="Upload image" />

      </div>
    </div>
  );
}
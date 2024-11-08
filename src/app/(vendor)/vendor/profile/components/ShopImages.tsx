"use client";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type DropzoneOptions } from "react-dropzone";
import { buttonVariants } from "~/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "~/components/ui/file-uploader";
import { Label } from "~/components/ui/label";
import { toast } from "~/hooks/use-toast";
import { useUploadFile } from "~/hooks/useUploadthing";
import { convertMultipleToWebP, webpBase64ToFile } from "~/lib/image";
import { cn } from "~/lib/utils";
import useBusinessFormContext from "../hooks/useBusinessFormContext";

const ShopImages = () => {
  const { form, business } = useBusinessFormContext();

  const [files, setFiles] = useState<File[] | null>([]);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const { uploadFiles, progresses, uploadedFile, isUploading } =
    useUploadFile("imageUploader");

  useEffect(() => {
    if (uploadedFile && uploadedFile.length > 0) {
      form.setValue(
        "images",
        uploadedFile.map((e) => e.url),
      );
    }
  }, [uploadedFile]);

  return (
    <div className="space-y-6">
      <div className="">
        <Label>Shop Images</Label>
        <p className="text-xs italic text-slate-600">
          (Upload your shop images that will be displayed on your store)
        </p>
      </div>

      <div className="flex items-center gap-2">
        {business.images.map((image, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="size-28 rounded-md border border-slate-200 bg-slate-100"
            ></div>
          </div>
        ))}
      </div>

      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={dropzone}
      >
        <FileInput>
          <div className="flex h-60 w-full flex-col items-center justify-center rounded-md border bg-background hover:bg-slate-100">
            <p className="font-medium text-gray-700">Drop files here</p>
            <p className="text-xs italic text-gray-600">
              (Max 5 files, 5MB each)
            </p>
          </div>
        </FileInput>
        <FileUploaderContent className="flex flex-row items-end gap-2">
          {files?.map((file, i) => (
            <FileUploaderItem
              key={i}
              removeFile={!((uploadedFile ?? []).length > 0)}
              index={i}
              disabled={isUploading}
              className="size-20 overflow-hidden rounded-md p-0"
              aria-roledescription={`file ${i + 1} containing ${file.name}`}
            >
              {isUploading && (
                <div className="absolute inset-0 bg-slate-900/20">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <Loader className="animate-spin text-white duration-1500" />
                  </div>
                </div>
              )}
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                height={80}
                width={80}
                className="size-20 object-cover p-0"
              />
            </FileUploaderItem>
          ))}

          {(files ?? []).length > 0 && (
            <span
              onClick={async () => {
                if (!files) {
                  toast({
                    title: "No files to upload",
                    variant: "destructive",
                  });
                  return;
                }
                try {
                  const convertedImages = await convertMultipleToWebP(files, {
                    maxWidth: 1920,
                    maxHeight: 1080,
                    quality: 0.6,
                  });

                  // Convert the compressed images back to Files for upload
                  const optimizedFiles = convertedImages.map((img) =>
                    webpBase64ToFile(img.base64, {
                      fileName: img.name,
                      fileType: img.type,
                    }),
                  );

                  void uploadFiles(optimizedFiles);
                } catch (error) {
                  toast({
                    title: "Error processing images",
                    variant: "destructive",
                  });
                }
              }}
              // size="sm"
              className={cn(
                "gap-2",
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                }),
              )}
              // variant="outline"
            >
              {isUploading && <Loader className="animate-spin" size={15} />}
              <label className="inline-block">
                {isUploading ? `Uploading ${progresses}%` : "Upload"}
              </label>
            </span>
          )}
        </FileUploaderContent>
      </FileUploader>
    </div>
  );
};

export default ShopImages;

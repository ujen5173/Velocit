import * as React from "react";
import type { UploadFilesOptions } from "uploadthing/types";
import { type OurFileRouter } from "~/app/api/uploadthing/core";
import { uploadFiles } from "~/lib/uploadthing";
import { type UploadedFile } from "~/types";

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFile?: UploadedFile;
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  { defaultUploadedFile, ...props }: UseUploadFileProps = {},
) {
  const [uploadedFile, setUploadedFile] = React.useState<
    UploadedFile | undefined
  >(defaultUploadedFile);
  const [progresses, setProgresses] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  const uploadThings = async (file: File) => {
    setIsUploading(true);

    try {
      setUploadedFile(undefined);
      const res = await uploadFiles(endpoint, {
        ...props,
        files: [file],
        onUploadProgress: ({ progress }) => {
          setProgresses(progress);
        },
      });

      setUploadedFile(res[0]);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadedFile,
    progresses,
    uploadFiles: uploadThings,
    isUploading,
  };
}

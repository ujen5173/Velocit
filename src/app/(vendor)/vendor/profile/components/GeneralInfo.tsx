"use client";
import { useEffect, useState } from "react";
import { buttonVariants } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import MultipleSelector from "~/components/ui/multi-select";
import { InputTags as TagsInput } from "~/components/ui/tags-input";
import { useUploadFile } from "~/hooks/useUploadthing";
import { cn } from "~/lib/utils";
import useBusinessFormContext from "../hooks/useBusinessFormContext";

type Option = {
  label: string;
  value: "bike" | "e-bike" | "scooter" | "e-scooter" | "car" | "e-car";
};

const OPTIONS: Option[] = [
  { label: "Bike", value: "bike" },
  { label: "E-Bike", value: "e-bike" },
  { label: "Scooter", value: "scooter" },
  { label: "E-Scooter", value: "e-scooter" },
  { label: "Car", value: "car" },
  { label: "E-Car", value: "e-car" },
];

const GeneralInfo = () => {
  const { form } = useBusinessFormContext();

  const {
    uploadFiles: logoUploadFiles,
    progresses: logoProgresses,
    uploadedFile: logoUploadedFile,
    isUploading: isLogoUploading,
  } = useUploadFile("imageUploader");

  const [logo, setLogo] = useState<string | null>(form.getValues("logo"));

  useEffect(() => {
    if (
      logoUploadedFile &&
      logoUploadedFile.length > 0 &&
      logoUploadedFile[0]?.url
    ) {
      setLogo(logoUploadedFile[0].url);
      form.setValue("logo", logoUploadedFile[0].url);
    }
  }, [logoUploadedFile, isLogoUploading]);

  return (
    <>
      <div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="ABC Rental Store"
                  autoComplete="off"
                  value={field.value ?? undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Logo</Label>
        <div className="flex items-center gap-2">
          <div
            style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="size-16 rounded-full border border-slate-200 bg-slate-100"
          ></div>
          <button
            disabled={isLogoUploading}
            type="button"
            className={cn(
              "p-0",
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
            )}
          >
            <label
              className="inline-block h-8 px-3 leading-[2.5]"
              htmlFor="logo"
            >
              {isLogoUploading ? `Uploading ${logoProgresses}%` : "Upload"}
            </label>
          </button>
        </div>
        <input
          accept={"image/png, image/jpeg, image/jpg"}
          type="file"
          hidden
          id="logo"
          onChange={(e) => {
            const files = e.target.files;
            console.log({ files });
            if (files) void logoUploadFiles(Array.from(files));
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <FormField
          control={form.control}
          name="phoneNumbers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Numbers</FormLabel>
              <FormControl>
                <TagsInput
                  type="number"
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="98xxxx, 98xxxx"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableVehicleTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Types</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value
                    .map((val) =>
                      OPTIONS.find((option) => option.value === val),
                    )
                    .filter((option): option is Option => option !== undefined)}
                  onChange={(selectedOptions) =>
                    field.onChange(
                      selectedOptions.map((option) => option.value),
                    )
                  }
                  defaultOptions={OPTIONS}
                  placeholder="Vechicle Types you offer"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      No results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default GeneralInfo;

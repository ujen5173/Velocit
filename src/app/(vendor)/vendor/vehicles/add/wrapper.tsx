"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileUploaderWrapper from "~/app/_components/_/FileUploaderWrapper";
import VehicleIndicatorIcon from "~/app/_components/_/VehicleIndicatorIcon";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/hooks/use-toast";
import { useUploadFile } from "~/hooks/useUploadthing";
import { cn } from "~/lib/utils";
import { vehicleTypeEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";

export const formSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(vehicleTypeEnum.enumValues).optional(),
  inventory: z.number().min(1),
  basePrice: z.number().min(100),
  features: z.array(z.object({ key: z.string(), value: z.string() })),
  images: z.array(z.string()),
});

type EditData = {
  id: string;
  name: string;
  category: string;
  type: (typeof vehicleTypeEnum.enumValues)[number];
  inventory: number;
  basePrice: number;
  images: string[];
  features: { key: string; value: string }[];
};

const Wrapper = ({
  editData,
  allowedVehicles,
  type,
}: {
  allowedVehicles: (typeof vehicleTypeEnum.enumValues)[number][];
  type: "edit" | "new";
  editData: EditData | undefined;
}) => {
  const router = useRouter();

  const { data: business } = api.business.current.useQuery();
  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof allowedVehicles)[number] | undefined
  >(editData?.type);
  const { mutateAsync, status } = api.vehicle.create.useMutation();
  const [features, setFeatures] = useState<{ key: string; value: string }[]>(
    editData?.features ?? [],
  );
  const [pastImages, setPastImages] = useState<string[]>(
    editData?.images ?? [],
  );

  const [files, setFiles] = useState<File[] | null>([]);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editData?.name ?? "",
      category: editData?.category ?? "",
      type: editData?.type ?? undefined,
      features: editData?.features ?? [],
      inventory: editData?.inventory ?? 1,
      basePrice: editData?.basePrice ?? 0,
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!business) {
      toast({
        title: "No business found",
        variant: "destructive",
      });
      return;
    }

    if (values.type === undefined) {
      toast({
        title: "Please select a vehicle type",
        variant: "destructive",
      });
      return;
    }

    const { inventory, ...rest } = values;

    await mutateAsync({
      data: {
        ...rest,
        features,
        type: selectedVehicle,
        inventory: inventory,
        images: [...pastImages, ...values.images],
        businessId: business.id,
      },
      type,
      editId: editData?.id,
    });

    toast({
      title: `Vehicle ${type === "edit" ? "updated" : "added"} successfully`,
    });

    router.push("/vendor/vehicles");
  }

  return (
    <div className="w-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New Vehicle</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex w-full flex-col gap-10 lg:flex-row">
            <div className="flex-[2]">
              <FormLabel className="text-slate-600">
                Media (Upload vehicle images)
              </FormLabel>

              {type === "edit" && (
                <div className="mb-4 mt-1 flex items-center gap-2">
                  {pastImages.map((image: string, i) => (
                    <div key={i} className="relative flex items-center gap-2">
                      <div
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                        className="size-28 rounded-md border border-slate-200 bg-slate-100"
                      ></div>
                      <span className="sr-only">remove item {i}</span>
                      <div
                        onClick={() => {
                          const updatedImages = [...pastImages];
                          updatedImages.splice(i, 1);
                          setPastImages(updatedImages);
                        }}
                        className="absolute right-2 top-2 z-10 flex size-5 items-center justify-center rounded-sm border border-border bg-white shadow-sm"
                      >
                        <X className="size-3 stroke-destructive duration-200 ease-in-out" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <FileUploaderWrapper
                  files={files}
                  setFiles={setFiles}
                  onFileUpload={uploadFiles}
                  uploadedFile={uploadedFile}
                  isUploading={isUploading}
                  progresses={progresses}
                />
              </div>
            </div>
            <div className="flex-[3] space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600">
                        Vehicle Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Porsche 911 GT3 RS" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600">
                        Vehicle Category
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Sports Car" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-600">Vehicle Type</Label>
                <div className="flex flex-wrap gap-2">
                  {allowedVehicles.map((vehicle, index) => {
                    return (
                      <VehicleIndicatorIcon
                        key={index}
                        vehicle={vehicle}
                        props={{
                          className: cn(
                            "cursor-pointer",
                            selectedVehicle === vehicle
                              ? "ring-2 ring-secondary"
                              : "",
                          ),
                          event: () => {
                            form.setValue("type", vehicle);
                            setSelectedVehicle(vehicle);
                          },
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="inventory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600">
                        Inventory
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            form.setValue(field.name, +e.target.value);
                          }}
                          placeholder="3"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600">
                        Base Price (per day)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            form.setValue(field.name, +e.target.value);
                          }}
                          placeholder="500"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Label>Add Vehicle Features</Label>
                <div className="mb-2 space-y-2">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex flex-1 gap-2">
                        <Input
                          value={feature.key}
                          className="h-10"
                          placeholder="Frame"
                          onChange={(e) => {
                            const updatedFeatures = [...features];
                            if (updatedFeatures[idx]) {
                              updatedFeatures[idx].key = e.target.value;
                              setFeatures(updatedFeatures);
                            }
                          }}
                        />
                        <Input
                          value={feature.value}
                          className="h-10"
                          placeholder="Carbon Fiber"
                          onChange={(e) => {
                            const updatedFeatures = [...features];
                            if (updatedFeatures[idx]) {
                              updatedFeatures[idx].value = e.target.value;
                              setFeatures(updatedFeatures);
                            }
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant={"outline"}
                        onClick={() => {
                          const updatedFeatures = [...features];
                          updatedFeatures.splice(idx, 1);
                          setFeatures(updatedFeatures);
                        }}
                      >
                        <Trash size={15} className="text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => {
                    setFeatures([...features, { key: "", value: "" }]);
                  }}
                  type="button"
                  size="sm"
                  variant={"ghost"}
                >
                  <Plus size={15} className="mr-2 text-slate-600" />
                  Add Feature
                </Button>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => {
                    router.back();
                  }}
                  disabled={status === "pending"}
                  type="button"
                  variant={"outline"}
                >
                  Cancel
                </Button>

                <Button disabled={status === "pending"} variant={"primary"}>
                  {status === "pending" ? (
                    <>
                      <Loader className="mr-2 animate-spin" size={20} />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Wrapper;

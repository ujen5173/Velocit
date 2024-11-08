"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type inferRouterOutputs } from "@trpc/server";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { toast } from "~/hooks/use-toast";
import { type AppRouter } from "~/server/api/root";
import { vehicleTypeEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";
import BusinessHours from "./components/BusinessHours";
import GeneralInfo from "./components/GeneralInfo";
import ShopImages from "./components/ShopImages";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type CurrentBusinessType = NonNullable<
  RouterOutput["business"]["current"]
>;

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formSchema = z.object({
  name: z.string().nullable(),
  location: z.object({
    map: z.string().url(),
    lat: z.number(),
    lng: z.number(),
    address: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
  }),
  phoneNumbers: z.array(z.string().min(10).max(15)),
  businessHours: z.record(
    z.string().min(2).max(50),
    z
      .object({
        open: z.string().min(2).max(50),
        close: z.string().min(2).max(50),
      })
      .nullable(),
  ),
  availableVehicleTypes: z.array(z.enum(vehicleTypeEnum.enumValues)),
  logo: z.string().url().nullable(),
  images: z.array(z.string().url()),
});

export const BusinessFormContext = createContext({});

const BusinessProfile = ({ business }: { business: CurrentBusinessType }) => {
  const { update, data } = useSession();
  const router = useRouter();

  const { mutateAsync, status } = api.business.update.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...business,
      businessHours: business.businessHours
        ? business.businessHours
        : Object.fromEntries(
            WEEK_DAYS.map((day) => [
              day,
              business.businessHours?.[day]
                ? business.businessHours[day]
                : { open: "6:00 AM", close: "7:00 PM" },
            ]),
          ),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = {
      ...values,
      images: form.getValues("images"),
      logo: form.getValues("logo"),
    };

    try {
      await mutateAsync(result);

      await update({
        ...data,
        user: {
          ...data!.user,
          vendor_setup_complete: true,
        },
      });

      router.push("/dashboard");

      toast({
        title: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {data?.user.id ? (
        <BusinessFormContext.Provider
          value={{
            form,
            business,
          }}
        >
          <div>
            <h2 className="mb-2 text-xl font-semibold">General</h2>
            <p className="mb-6 text-base text-slate-600">
              Settings and options for your account.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <GeneralInfo />
                <ShopImages />
                <BusinessHours />

                <div className="mt-10 flex justify-start gap-2">
                  <Button
                    disabled={status === "pending"}
                    onClick={() => onSubmit(form.getValues())}
                    variant={"primary"}
                  >
                    {status === "pending" ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </BusinessFormContext.Provider>
      ) : (
        <div className="flex h-96 items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader size={20} className="animate-spin text-slate-700" />
            <span className="italic text-slate-600">
              Hang in tight, we are loading your profile...
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessProfile;

"use client";
import { differenceInDays, format } from "date-fns";
import { CalendarDays, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";
import { useUploadFile } from "~/hooks/useUploadthing";
import useWindowDimensions from "~/hooks/useWindowDimensions";
import { shopData } from "~/lib/data";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type Vehicle } from "~/types/bookings";

interface BookingsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Bookings: React.FC<BookingsProps> = ({ open, setOpen }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>(
    Object.keys(shopData.vehicleTypes)[0]!,
  );
  const [selectedVehicleSubType, setSelectedVehicleSubType] =
    useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);

  // Helper function to get available quantity for a vehicle on specific dates
  const getAvailableQuantity = (
    vehicleId: string,
    startDate: Date,
    endDate: Date,
  ): number => {
    const vehicle = getCurrentVehicles().find((v) => v.id === vehicleId);
    if (!vehicle) return 0;

    const totalCount = vehicle.count;
    const overlappingBookings = shopData.bookings.filter((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return (
        booking.vehicleId === vehicleId &&
        !(endDate < bookingStart || startDate > bookingEnd)
      );
    });

    const maxBooked = overlappingBookings.reduce((max, booking) => {
      return Math.max(max, booking.quantity);
    }, 0);

    return totalCount - maxBooked;
  };

  // Updated quantity change handler
  const handleQuantityChange = (action: "increment" | "decrement") => {
    const maxQuantity = getMaxAllowedQuantity();

    if (action === "increment" && quantity < maxQuantity) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Get maximum allowed quantity based on selected dates and vehicle
  const getMaxAllowedQuantity = (): number => {
    const selectedVehicleId = getSelectedVehicleId();
    if (!selectedVehicleId || !date?.from || !date?.to) {
      return 0;
    }

    return getAvailableQuantity(selectedVehicleId, date.from, date.to);
  };

  const handleCheckout = () => {
    setShowQR(true);
  };

  const getCurrentVehicles = (): Vehicle[] => {
    if (!selectedVehicleType || !selectedVehicleSubType) return [];
    const type = shopData.vehicleTypes[selectedVehicleType];
    const subType = type?.types.find((t) => t.name === selectedVehicleSubType);
    return subType?.vehicles ?? [];
  };

  const getRentalDays = (): number => {
    if (!date?.from || !date?.to) return 0;
    return differenceInDays(date.to, date.from) + 1;
  };

  const getSelectedVehiclePrice = (): number => {
    const vehicles = getCurrentVehicles();
    const selectedVehicle = vehicles.find((v) => v.model === selectedModel);
    const days = getRentalDays();
    return selectedVehicle ? selectedVehicle.price * quantity * days : 0;
  };

  const getSelectedVehicleId = (): string | undefined => {
    const vehicles = getCurrentVehicles();
    const selectedVehicle = vehicles.find((v) => v.model === selectedModel);
    return selectedVehicle?.id;
  };

  // Updated date disable logic
  const isDateDisabled = (date: Date) => {
    // Get the start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the date to check with time set to start of day
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    // Disallow past dates
    if (checkDate < today) {
      return true;
    }

    const selectedVehicleId = getSelectedVehicleId();
    if (!selectedVehicleId) {
      return false;
    }

    // Check if there are any available vehicles on this date
    const availableQuantity = getAvailableQuantity(
      selectedVehicleId,
      checkDate,
      checkDate,
    );

    return availableQuantity <= 0;
  };

  // Add clear date handler
  const handleClearDate = () => {
    setDate(undefined);
    setQuantity(1); // Reset quantity when date is cleared
  };

  // Update vehicle selection handler
  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setDate(undefined); // Reset date when model changes
    setQuantity(1); // Reset quantity when model changes
  };

  const isDateSelectionDisabled = useMemo(() => {
    return !selectedVehicleType || !selectedVehicleSubType || !selectedModel;
  }, [selectedVehicleType, selectedVehicleSubType, selectedModel]);

  const isCheckoutDisabled = useMemo(() => {
    if (!date?.from || !date?.to || getRentalDays() === 0) return true;

    const maxQuantity = getMaxAllowedQuantity();
    return maxQuantity === 0 || quantity > maxQuantity;
  }, [date, quantity]);

  // Get available count text for vehicle selection
  const getAvailableCountText = (vehicle: Vehicle): string => {
    if (!date?.from || !date?.to) {
      return `(${vehicle.count} total)`;
    }

    const availableCount = getAvailableQuantity(vehicle.id, date.from, date.to);
    return `(${availableCount} available)`;
  };
  const { width } = useWindowDimensions();

  const { isUploading, progresses, uploadFiles, uploadedFile } =
    useUploadFile("imageUploader");

  const { mutateAsync, status } = api.rental.rent.useMutation();

  const handleConfirmbBooking = async () => {
    const selectedVehicleId = getSelectedVehicleId();
    if (!selectedVehicleId || !date?.from || !date?.to) {
      return;
    }

    if (!uploadedFile?.[0]?.url) {
      toast({
        title: "Upload Payment Screenshot",
        description: "Please upload payment screenshot to confirm booking",
      });
      return;
    }

    const startDate = date.from;
    const endDate = date.to;

    const booking = {
      vehicleId: selectedVehicleId,
      startDate,
      totalPrice: getSelectedVehiclePrice(),
      endDate,
      inventory: quantity,
      paymentScreenshot: uploadedFile?.[0]?.url,
      note: message,
    };

    await mutateAsync(booking);

    setOpen(false);
    setShowQR(false);
    setSelectedVehicleType("");
    setSelectedVehicleSubType("");
    setSelectedModel("");
    setDate(undefined);
    setQuantity(1);
    setMessage("");

    toast({
      title: "Booking Confirmed. Wait for confirmation",
      description: "Your booking has been confirmed successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "flex h-[90vh] max-h-[800px] w-[90vw] flex-col gap-4 p-4 md:w-[80vw] lg:max-w-2xl",
        )}
      >
        {!showQR ? (
          <>
            <DialogHeader className="flex-none border-b border-border pb-2">
              <DialogTitle className="text-center text-lg font-medium text-foreground">
                Reserve a Vehicle
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-4 py-2">
                {/* Vehicle Type Selection */}
                <div className="mb-8 space-y-2 px-1">
                  <Label>Vehicle Type</Label>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-5 px-1 sm:grid-cols-3">
                    {Object.entries(shopData.vehicleTypes).map(
                      ([type, data]) => {
                        return (
                          <div
                            key={type}
                            className={`relative cursor-pointer rounded-md bg-[#f1f0f5] p-4 text-slate-800 transition-all hover:bg-slate-200 ${
                              selectedVehicleType === type
                                ? "ring-2 ring-secondary"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedVehicleType(type);
                              setSelectedVehicleSubType("");
                              setSelectedModel("");
                              setDate(undefined);
                              setQuantity(1);
                            }}
                          >
                            <span className="text-sm font-medium">
                              {data.label}
                            </span>
                            <div className="absolute -bottom-[0.80rem] right-2 rounded-full bg-slate-600 px-3 py-1 text-[0.65rem] text-slate-50">
                              From ${data.startingPrice}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                {selectedVehicleType && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 px-1">
                      <Label>Vehicle Category</Label>
                      <Select
                        value={selectedVehicleSubType}
                        onValueChange={(value) => {
                          setSelectedVehicleSubType(value);
                          setSelectedModel("");
                          setDate(undefined);
                          setQuantity(1);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {shopData.vehicleTypes[
                            selectedVehicleType
                          ]?.types.map((type) => (
                            <SelectItem key={type.name} value={type.name}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 px-1">
                      <Label>Select Vehicle</Label>
                      <Select
                        value={selectedModel}
                        onValueChange={handleModelSelect}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCurrentVehicles().map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.model}>
                              {vehicle.model} {getAvailableCountText(vehicle)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2 px-1">
                  <Label>Pick up Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-between px-4 ${!date && "text-muted-foreground"}`}
                        disabled={isDateSelectionDisabled}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarDays size={18} className="text-slate-700" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </div>
                        {date && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClearDate();
                            }}
                          >
                            <X className="size-4" />
                          </Button>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        disabled={isDateDisabled}
                        defaultMonth={date?.from}
                        selected={date}
                        showOutsideDays={false}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          setQuantity(1);
                        }}
                        numberOfMonths={width < 640 ? 1 : 2}
                        classNames={{
                          cell: "relative w-[36px] p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                          head_cell: "font-normal text-sm w-[36px]",
                          day: cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                            "hover:bg-accent hover:text-accent-foreground",
                            "focus:bg-accent focus:text-accent-foreground focus:rounded-sm",
                            "disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed",
                          ),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {date?.from && date?.to && (
                    <Alert variant="default" className="mt-2">
                      <AlertTitle>Booking Period</AlertTitle>
                      <AlertDescription>
                        {getRentalDays()} days rental period
                        {getMaxAllowedQuantity() === 0 && (
                          <p className="mt-1 text-red-500">
                            No vehicles available for selected dates. Please
                            choose different dates.
                          </p>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2 px-1">
                  <Label>Number of Vehicles</Label>
                  <div className="flex w-min items-center gap-2">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="flex size-6 items-center justify-center rounded-full border-slate-400 bg-slate-400 hover:bg-slate-300"
                      onClick={() => handleQuantityChange("decrement")}
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} className="text-white" />
                    </Button>
                    <div className="w-20">
                      <Input
                        type="text"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        min="1"
                        max={getMaxAllowedQuantity()}
                        readOnly
                        disabled={!!date}
                        value={quantity}
                        className="h-10 text-center"
                      />
                    </div>

                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="flex size-6 items-center justify-center rounded-full border-slate-700 bg-slate-700 hover:bg-slate-600"
                      onClick={() => handleQuantityChange("increment")}
                      disabled={quantity >= getMaxAllowedQuantity()}
                    >
                      <Plus size={18} className="text-white" />
                    </Button>
                  </div>
                  {date?.from && date?.to && (
                    <p className="text-sm text-muted-foreground">
                      Maximum available: {getMaxAllowedQuantity()} vehicles
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2 px-1">
                  <Label>Message to vendor</Label>
                  <Textarea
                    className="h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any special requirements or requests?"
                  />
                </div>
              </div>
            </ScrollArea>

            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1 text-lg font-semibold">
                <span className="text-nowrap">
                  Total: ${getSelectedVehiclePrice()}
                </span>

                {date?.from && date?.to && (
                  <span className="text-nowrap text-sm text-gray-500">
                    for {getRentalDays()} days
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCheckout}
                  disabled={isCheckoutDisabled}
                >
                  {isCheckoutDisabled && getMaxAllowedQuantity() === 0
                    ? "No Availability"
                    : "Checkout"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 p-4">
            <div className="flex w-full flex-col items-center gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Booking Summary</h3>
              </div>

              <div className="w-full space-y-2 rounded-md border p-4">
                <div className="flex justify-between">
                  <span>Vehicle:</span>
                  <span className="font-semibold">{selectedModel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates:</span>
                  <span className="font-medium">
                    {date?.from && date?.to
                      ? `${format(date.from, "MMM dd")} - ${format(date.to, "MMM dd, yyyy")}`
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">
                    रु.{getSelectedVehiclePrice()} /-
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-48 w-48">
              <Image
                src="/images/qr.png"
                alt="Payment QR Code"
                fill
                className="rounded-lg object-contain"
                priority
              />
            </div>

            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label>Upload Payment Screenshot</Label>
                <div className="relative">
                  <Input
                    max="1"
                    pattern="image/*"
                    id="picture"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        void uploadFiles(Array.from(files));
                      }
                    }}
                    type="file"
                    className="leading-[2.5!important]"
                  />
                  {isUploading && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white">
                      <span className="text-xs text-secondary">{`Uploading... ${progresses}%`}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  disabled={isUploading}
                  variant="outline"
                  onClick={() => setShowQR(false)}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  disabled={isUploading || status === "pending"}
                  onClick={async () => {
                    await handleConfirmbBooking();
                  }}
                >
                  {isUploading
                    ? "Uploading File..."
                    : status === "pending"
                      ? "Confirming Booking..."
                      : "Confirm Booking"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Bookings;

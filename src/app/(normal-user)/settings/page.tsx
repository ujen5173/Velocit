import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, buttonVariants } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";

const Settings = () => {
  return (
    <>
      <div className={"h-16"}></div>
      <div className="w-full bg-slate-100 px-4 py-12">
        <Tabs defaultValue="general" className="container flex gap-5">
          <div className="h-min w-72 space-y-4">
            <div className="rounded-md border border-slate-200 bg-white px-6 py-3 shadow-sm">
              <h2 className="text-xl text-foreground">Settings</h2>
            </div>
            <TabsList className="flex h-auto flex-1 flex-col rounded-lg border border-slate-200 bg-white px-0 py-2 shadow-sm">
              <TabsTrigger
                className={cn(
                  "data-[state=active]:bg-slate-100 data-[state=active]:text-foreground data-[state=active]:shadow-none",
                  "w-full justify-start rounded-none px-6 py-3 text-left shadow-none hover:bg-slate-100",
                )}
                value="general"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                className={cn(
                  "data-[state=active]:bg-slate-100 data-[state=active]:text-foreground data-[state=active]:shadow-none",
                  "w-full justify-start rounded-none px-6 py-3 text-left shadow-none hover:bg-slate-100",
                )}
                value="email"
              >
                Email Notification
              </TabsTrigger>
              <TabsTrigger
                className={cn(
                  "data-[state=active]:bg-slate-100 data-[state=active]:text-foreground data-[state=active]:shadow-none",
                  "w-full justify-start rounded-none px-6 py-3 text-left shadow-none hover:bg-slate-100",
                )}
                value="account"
              >
                Account
              </TabsTrigger>
            </TabsList>
          </div>

          {/* General */}
          <TabsContent
            className="m-0 flex-1 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm"
            value="general"
          >
            <h2 className="mb-2 text-xl font-semibold">General</h2>
            <p className="mb-6 text-base text-slate-600">
              Settings and options for your account.
            </p>
            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="font-semibold">Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label className="font-semibold">Username</Label>
                <Input placeholder="johndoe" />
              </div>
              <div className="space-y-1">
                <Label className="font-semibold">Profile Picture</Label>
                <Avatar className="h-14 w-14">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <Label className="font-semibold">Email</Label>
                <Input placeholder="johndoe@gmail.com" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant={"outline"}>
                Discard
              </Button>
              <Button size="sm" variant={"primary"}>
                Save
              </Button>
            </div>
          </TabsContent>

          {/* Email Notification */}
          <TabsContent
            className="m-0 flex-1 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm"
            value="email"
          >
            <h2 className="mb-2 text-xl font-semibold">Email Notification</h2>
            <p className="mb-6 text-base text-slate-600">
              Control what email notifications you want to receive.
            </p>
            <div className="mb-10 space-y-4">
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Latest Updates on Our Website
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about the newest features, updates, and
                    improvements on our platform for an enhanced user
                    experience.
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="terms2" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Explore Newly Added Shops Nearby
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Discover the latest shops added in your area, offering fresh
                    options and exciting products to explore.
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="terms3" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Upcoming Local Events Around You
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Find out about exciting events happening near you, from
                    community gatherings to exclusive local experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant={"outline"}>
                Discard
              </Button>
              <Button size="sm" variant={"primary"}>
                Save
              </Button>
            </div>
          </TabsContent>

          {/* Account */}
          <TabsContent
            className="m-0 flex-1 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm"
            value="account"
          >
            <h2 className="mb-2 text-xl font-semibold">Dangar Zone</h2>
            <p className="mb-6 text-base text-slate-600">
              Delete you account or deactivate it.
            </p>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger
                  className={buttonVariants({ variant: "outline" })}
                >
                  Deactivete Account
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action can be undone. This will temporarly deactivate
                      your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger
                  className={buttonVariants({ variant: "destructive" })}
                >
                  Delete Account
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;

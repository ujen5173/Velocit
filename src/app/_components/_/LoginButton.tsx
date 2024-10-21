"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { chakra_petch } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { Icons } from "~/lib/Icons";
import { cn } from "~/lib/utils";

const LoginButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="py-12 sm:max-w-[655px]">
        <Tabs defaultValue="normal-user" className="min-w-[400px]">
          {/* <TabsList className="grid h-12 w-full grid-cols-2">
            <TabsTrigger className="h-full" value="account">
              Normal use
            </TabsTrigger>
            <TabsTrigger className="h-full" value="password">
              Business Owner
            </TabsTrigger>
          </TabsList> */}
          <TabsContent value="normal-user" className="py-16">
            <div className="mx-auto max-w-[455px]">
              <div className="mb-8">
                <h1
                  className={cn(
                    "mb-2 text-center text-4xl font-semibold",
                    chakra_petch.className,
                  )}
                >
                  Join the community
                </h1>
                <p className="text-center text-base text-slate-600">
                  Where early adopters and innovation seekers find lively,
                  imaginative tech before it hits the mainstream.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  void signIn("google", {
                    callbackUrl: "/dashboard",
                    redirect: false,
                  });
                }}
                variant={"outline"}
              >
                <Icons.google className="mr-2 size-6" />
                Continue with Google
              </Button>
              <p className="mt-4 text-center">
                By signing up, you agree to our{" "}
                <Link href="/terms-and-service">
                  <span className="text-secondary underline hover:text-secondary/80">
                    terms of service
                  </span>
                </Link>
                .
              </p>
            </div>
          </TabsContent>
          <TabsContent value="vendor">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default LoginButton;

"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { bricolage } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";

const SignInPage = () => {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4",
        bricolage.className,
      )}
    >
      <Card className="w-full max-w-3xl bg-white/80 shadow-xl backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-5">
            {/* Left decorative section */}
            <div className="hidden rounded-l-xl bg-gradient-to-br from-rose-500 to-pink-700 p-6 md:col-span-2 md:block">
              <div className="flex h-full flex-col justify-between text-white">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">Welcome Back!</h2>
                  <p className="text-sm text-white/80">
                    Access your account and discover amazing vehicles for rent
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Verified Rentals</h3>
                      <p className="text-sm text-white/70">
                        All vehicles are verified
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Secure Platform</h3>
                      <p className="text-sm text-white/70">
                        Safe & secure transactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right content section */}
            <div className="p-6 md:col-span-3 md:p-8">
              <div className="mb-8 text-center">
                <h1 className="bg-gradient-to-r from-rose-500 to-pink-700 bg-clip-text text-3xl font-bold text-transparent">
                  Velocit
                </h1>
                <p className="mt-2 text-slate-600">
                  Choose your account type to continue
                </p>
              </div>

              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Personal Account</TabsTrigger>
                  <TabsTrigger value="business">Business Account</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await axios.post("/api/set-role", {
                        role: "USER",
                      });

                      await signIn("google", {
                        callbackUrl: "/",
                      });
                    }}
                    className="flex w-full items-center justify-start space-x-4 py-6 text-left hover:bg-slate-50"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </Button>
                </TabsContent>

                <TabsContent value="business" className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await axios.post("/api/set-role", {
                        role: "VENDOR",
                      });
                      await signIn("google", {
                        callbackUrl: "/vendor/profile",
                      });
                    }}
                    className="flex w-full items-center justify-start space-x-4 py-6 text-left hover:bg-slate-50"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google for Business</span>
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center text-sm text-slate-500">
                By continuing, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-purple-600 underline hover:text-purple-500"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;

"use client";

import { ArrowRight, Menu, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import Logo from "~/svg/logo";
import LoginButton from "./LoginButton";

const Header = () => {
  const { data } = useSession();

  const pth = usePathname();
  const theme =
    pth === "/"
      ? "text-slate-700 hover:text-slate-600 sm:text-slate-100 sm:hover:text-slate-200"
      : "text-slate-800 hover:text-slate-700";

  return (
    <header
      className={cn(
        "left-0 top-0 z-[40] w-full border-b",
        pth === "/search" ? "fixed" : "absolute",
        pth === "/" ? "border-transparent" : "border-border bg-white shadow-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-stretch justify-between gap-6 px-4 py-2 md:border-none md:py-4",
        )}
      >
        <div className="flex h-auto flex-1 items-center space-x-6">
          <Logo
            tw={cn(
              "h-6",
              pth === "/" ? "fill-secondary sm:fill-white" : "fill-secondary",
            )}
          />

          <div className="hidden md:block">
            <ul className="flex items-center">
              <li className={cn(`px-2 text-sm hover:underline`, theme)}>
                <Link href="/">Explore</Link>
              </li>
              <li className={cn(`px-2 text-sm hover:underline`, theme)}>
                <Link href="/">Locations</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant={"link"}
              size="icon"
              className="focus-visible:ring-0"
            >
              <Search size={24} className={cn(theme)} />
            </Button>
            <Sheet>
              <SheetTrigger
                className={buttonVariants({
                  variant: "link",
                  size: "icon",
                  className: "focus-visible:ring-0",
                })}
              >
                <Menu size={26} className={cn(theme)} />
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle className="mb-8">
                    <Logo tw="h-6 fill-pink-500" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex h-full flex-col">
                  <ul className="pb-5">
                    <li>
                      <Link
                        href="/"
                        className="inline-flex w-full items-center justify-between py-2 text-base font-medium text-slate-800 hover:underline"
                      >
                        <span>Explore</span>
                        <ArrowRight className="text-slate-800" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="inline-flex w-full items-center justify-between py-2 text-base font-medium text-slate-800 hover:underline"
                      >
                        <span>Locations</span>
                        <ArrowRight className="text-slate-800" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="inline-flex w-full items-center justify-between py-2 text-base font-medium text-slate-800 hover:underline"
                      >
                        <span>For Business</span>
                        <ArrowRight className="text-slate-800" />
                      </Link>
                    </li>
                  </ul>

                  <Separator />

                  <ul className={cn("mb-10 flex-1 py-5")}>
                    <li>
                      <Link
                        href="/"
                        className="inline-block py-2 text-base font-medium text-slate-700 hover:underline"
                      >
                        Reserve bicycle
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="inline-block py-2 text-base font-medium text-slate-700 hover:underline"
                      >
                        Reserve Bike
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="inline-block py-2 text-base font-medium text-slate-700 hover:underline"
                      >
                        Reserve Scooter
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="inline-block py-2 text-base font-medium text-slate-700 hover:underline"
                      >
                        <span>Reserve Car</span>
                      </Link>
                    </li>
                  </ul>

                  <div className="space-y-2">
                    <LoginButton>
                      <Button
                        className="w-full text-sm uppercase"
                        variant={"outline"}
                      >
                        Login / Sign up
                      </Button>
                    </LoginButton>{" "}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden items-center md:flex">
            <div className="px-4">
              {data ? (
                data.user.role === "VENDOR" ? (
                  <div className="flex items-center gap-2">
                    <Link href="/dashboard">
                      <Button variant={"outline"} size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Image
                          src={data.user.image!}
                          alt={data.user.name!}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <div>
                          <DropdownMenuLabel className="flex flex-col">
                            <div className="">
                              <span>{data.user.name}</span>
                            </div>
                            <div className="">
                              <span className="text-xs">{data.user.email}</span>
                            </div>
                          </DropdownMenuLabel>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Business Profile</DropdownMenuItem>
                        <DropdownMenuItem>Analytics</DropdownMenuItem>
                        <DropdownMenuItem>Orders</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            void signOut();
                          }}
                        >
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Image
                          src={data.user.image!}
                          alt={data.user.name!}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <div>
                          <DropdownMenuLabel>
                            <div className="flex items-center justify-between">
                              <span>{data.user.name}</span>
                            </div>
                          </DropdownMenuLabel>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Bookmarks</DropdownMenuItem>
                        <DropdownMenuItem>Orders</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            void signOut();
                          }}
                        >
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              ) : (
                <LoginButton>
                  <Button className={cn(theme)} variant={"outline-primary"}>
                    Start Renting
                  </Button>
                </LoginButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

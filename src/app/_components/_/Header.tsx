import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
import { getServerAuthSession } from "~/server/auth";
import Logo from "~/svg/logo";
import LoginButton from "./LoginButton";
import SignOut from "./signout";

const Header = async ({ pth = "/" }: { pth?: string }) => {
  const data = await getServerAuthSession();

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
          <Logo tw={cn("h-6", pth === "/" ? "fill-white" : "fill-secondary")} />

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
            <Sheet>
              <SheetTrigger
                className={buttonVariants({
                  variant: "link",
                  size: "icon",
                  className: "focus-visible:ring-0",
                })}
              >
                <Menu
                  size={26}
                  className={cn(
                    pth === "/" ? "text-slate-100" : "text-slate-600",
                  )}
                />
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
                    </LoginButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden items-center md:flex">
            <div className="px-4">
              {data ? (
                data.user.role === "VENDOR" ? (
                  <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                      <Button variant={"outline"} size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <div className="flex items-center gap-2">
                        <div>
                          <span className={cn(theme, "text-sm font-semibold")}>
                            {data.user.name}
                          </span>
                        </div>
                        <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          {data.user.image && (
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={data.user.image} />
                              <AvatarFallback>{data.user.name}</AvatarFallback>
                            </Avatar>
                          )}
                        </DropdownMenuTrigger>
                      </div>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="flex flex-col">
                          <div className="">
                            <span className={cn("text-sm font-semibold")}>
                              {data.user.name}
                            </span>
                          </div>
                          <div className="">
                            <span className={cn("text-sm font-normal")}>
                              {data.user.email}
                            </span>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/vendor/profile">
                          <DropdownMenuItem>Business Profile</DropdownMenuItem>
                        </Link>
                        <Link href="/vendor/analytics">
                          <DropdownMenuItem>Analytics</DropdownMenuItem>
                        </Link>
                        <Link href="/vendor/orders">
                          <DropdownMenuItem>Orders</DropdownMenuItem>
                        </Link>
                        <Link href="/settings">
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <SignOut />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <div className="flex items-center gap-2">
                        <div>
                          <span className={cn(theme, "text-sm font-semibold")}>
                            {data.user.name}
                          </span>
                        </div>
                        <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          {data.user.image && (
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={data.user.image} />
                              <AvatarFallback className="border border-border text-xs font-semibold">
                                {data.user.name
                                  ?.split(" ")
                                  .map((e) => e[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </DropdownMenuTrigger>
                      </div>
                      <DropdownMenuContent align="end" className="w-56">
                        <div>
                          <DropdownMenuLabel>
                            <div className="">
                              <div>
                                <span>{data.user.name}</span>
                              </div>
                              <div className="">
                                <span className="text-xs text-slate-600">
                                  {data.user.email}
                                </span>
                              </div>
                            </div>
                          </DropdownMenuLabel>
                        </div>
                        <DropdownMenuSeparator />
                        <Link href="/settings">
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                        </Link>
                        <Link href="/bookmarks">
                          <DropdownMenuItem>Bookmarks</DropdownMenuItem>
                        </Link>
                        <Link href="/orders">
                          <DropdownMenuItem>Orders</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <SignOut />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              ) : (
                <LoginButton>
                  <Button
                    className={cn(
                      "font-semibold uppercase",
                      pth === "/" && "text-slate-100 hover:sm:text-foreground",
                    )}
                    variant={pth === "/" ? "outline-primary" : "primary"}
                  >
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

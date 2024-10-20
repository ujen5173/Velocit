import { ArrowRight, Menu, Search } from "lucide-react";
import Link from "next/link";
import { merienda } from "~/app/utils/font";
import { Button, buttonVariants } from "~/components/ui/button";
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
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-[1440px] justify-between gap-6 border-b border-border px-4 py-6 md:border-none md:py-4">
        <div className="flex flex-1 items-center space-x-6">
          <Logo tw="h-6 fill-slate-50" />

          <div className="hidden md:block">
            <ul className="flex items-center">
              <li className="px-2 text-slate-100 hover:text-slate-200 hover:underline">
                <Link href="/">Explore</Link>
              </li>
              <li className="px-2 text-slate-100 hover:text-slate-200 hover:underline">
                <Link href="/">Locations</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden h-auto flex-1 py-[0.25rem] md:block lg:flex-[2]">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-full w-full max-w-44 items-center rounded-md bg-white/30 px-3 backdrop-blur-sm md:max-w-60 lg:max-w-80">
              <Search size={18} className="stroke-white" />
              <input
                type="text"
                className="h-full w-full bg-transparent px-2 text-sm text-slate-200 outline-none placeholder:text-slate-200"
                placeholder="Search rentals..."
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant={"link"}
              size="icon"
              className="focus-visible:ring-0"
            >
              <Search size={24} className="stroke-slate-50" />
            </Button>
            <Sheet>
              <SheetTrigger
                className={buttonVariants({
                  variant: "link",
                  size: "icon",
                  className: "focus-visible:ring-0",
                })}
              >
                <Menu size={26} className="stroke-slate-50" />
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle className="mb-8">
                    <Logo tw="h-6 fill-pink-500" />
                  </SheetTitle>
                </SheetHeader>

                <ul className={cn(merienda.className)}>
                  <li>
                    <Link
                      href="/"
                      className="inline-flex w-full items-center justify-between py-2 text-xl font-semibold text-slate-800 hover:underline"
                    >
                      <span>Explore</span>
                      <ArrowRight className="text-slate-800" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="inline-flex w-full items-center justify-between py-2 text-xl font-semibold text-slate-800 hover:underline"
                    >
                      <span>Locations</span>
                      <ArrowRight className="text-slate-800" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="inline-flex w-full items-center justify-between py-2 text-xl font-semibold text-slate-800 hover:underline"
                    >
                      <span>For Business</span>
                      <ArrowRight className="text-slate-800" />
                    </Link>
                  </li>
                </ul>

                <Separator />

                <ul className={cn("mb-10 flex-1", merienda.className)}>
                  <li>
                    <Link
                      href="/"
                      className="inline-block py-2 text-xl font-semibold text-slate-700 hover:underline"
                    >
                      Reserve bicycle
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="inline-block py-2 text-xl font-semibold text-slate-700 hover:underline"
                    >
                      Reserve Bike
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="inline-block py-2 text-xl font-semibold text-slate-700 hover:underline"
                    >
                      Reserve Scooter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="inline-block py-2 text-xl font-semibold text-slate-700 hover:underline"
                    >
                      <span>Reserve Car</span>
                    </Link>
                  </li>
                </ul>

                <div className="space-y-2">
                  <LoginButton>
                    <Button className="w-full uppercase" variant={"outline"}>
                      Login / Sign up
                    </Button>
                  </LoginButton>
                  <Button className="w-full uppercase" variant={"secondary"}>
                    Start Renting
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden items-center md:flex">
            <div className="px-4">
              <LoginButton>
                <button className="whitespace-nowrap text-sm font-medium text-slate-50 hover:underline">
                  Login / Sign up
                </button>
              </LoginButton>
            </div>

            <Button variant={"outline-primary"} className="text-white">
              Start Renting
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

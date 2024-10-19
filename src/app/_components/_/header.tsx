import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Logo from "~/svg/logo";

const Header = () => {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="container flex justify-between py-4">
        <div className="flex flex-1 items-center space-x-10">
          <Logo tw="h-6 fill-slate-50" />

          <div>
            <ul className="flex items-center gap-2">
              <li className="px-2 text-slate-100 hover:text-slate-200 hover:underline">
                <Link href="/">Explore</Link>
              </li>
              <li className="px-2 text-slate-100 hover:text-slate-200 hover:underline">
                <Link href="/">Locations</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-auto flex-[2] py-[0.05rem]">
          <div className="flex h-full items-center justify-center">
            <div className="flex h-full items-center rounded-md bg-white/30 px-3 backdrop-blur-sm">
              <Search size={18} className="stroke-white" />
              <input
                type="text"
                className="h-full w-60 bg-transparent px-2 text-sm text-slate-200 outline-none placeholder:text-slate-200"
                placeholder="Search rentals..."
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Button variant={"outline"}>Login/Sign up</Button>
          <Button>Start Renting</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function GuestNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50 ", className)}
    >
      <Menu setActive={setActive}>
        
          <div className="px-2 py-2 ml-5">
          <Link href="/">
            <MenuItem
              setActive={setActive}
              active={active}
              item="NextJsProject"
            ></MenuItem>
            </Link>
          </div>
        

        <div className="flex w-full justify-end mr-5">
        <Link href={"/login"} className="rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white px-4 py-2 mx-2">
          <div >
            <MenuItem
              setActive={setActive}
              active={active}
              item="Login"
            ></MenuItem>
          </div>
        </Link>

        <Link href={"/signup"} className="rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white px-4 py-2 mx-2">
          <div>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Register"
            ></MenuItem>
          </div>
        </Link>

        </div>
        
      </Menu>
    </div>
  );
}

export default GuestNavbar;

"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LoggedInNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get(
        `${process.env.DOMAIN}api/users/logout`
      );

      //   console.log(response.data);

      if (response.data.success) {
        console.log(response.data.message);
        toast.success("Logged out successfully");
        router.push("/login");
      } else {
        console.log(response.data.message);
      }
    } catch (error: any) {
      toast.error("failing...", error.message);
    }
  };

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
          <button
            className="rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white px-4 py-2 mx-2"
            onClick={logout}
          >
            <MenuItem setActive={setActive} active={active} item="Logout" />
          </button>
        </div>
      </Menu>
    </div>
  );
}

export default LoggedInNavbar;

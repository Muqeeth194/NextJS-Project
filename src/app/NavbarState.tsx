"use client"

import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import GuestNavbar from "@/components/GuestNavbar";
import LoggedInNavbar from "@/components/LoggedInNavbar";

export default function NavbarState() {
    const navbarStateValue = useSelector((state: RootState) => state.navbar.value);
    // console.log(navbarStateValue);
    

    return navbarStateValue === "public" ? <GuestNavbar /> : <LoggedInNavbar />;
}

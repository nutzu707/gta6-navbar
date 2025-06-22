"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import NavDark from "./navbardark";

export default function NavbarSelector() {
  const pathname = usePathname();
  
  // Use dark navbar for dark-navbar page, regular navbar for everything else
  if (pathname === "/dark-navbar") {
    return <NavDark />;
  }
  
  return <Navbar />;
} 
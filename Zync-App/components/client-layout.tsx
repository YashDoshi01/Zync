"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "@/components/footer"; // extract footer as its own component
import React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeaderFooter = pathname === "/";

  return (
    <div className="relative flex flex-col min-h-screen">
      {showHeaderFooter && <><Navbar /> <br /></>}
      
      <main className="flex-grow">{children}</main>
      
      {showHeaderFooter && <><Footer /> <br /></>}
    </div>
  );
}

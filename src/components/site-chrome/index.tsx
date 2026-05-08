"use client";

import { usePathname } from "next/navigation";
import Footer from "../footer";
import Navbar from "../navbar";

export default function SiteChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideChrome = pathname === "/login" || pathname === "/create-account";

  return (
    <>
      {!hideChrome && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}

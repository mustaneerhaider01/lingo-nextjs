"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useRef(false);

  const pathname = usePathname();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <SheetTitle className="invisible" />
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

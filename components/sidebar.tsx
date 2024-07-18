import Link from "next/link";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { SidebarItem } from "./sidebar-item";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed top-0 left-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <Logo />
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem iconSrc="/learn.svg" label="Learn" href="/learn" />
        <SidebarItem
          iconSrc="/leaderboard.svg"
          label="Leaderboard"
          href="/leaderboard"
        />
        <SidebarItem iconSrc="/quests.svg" label="Quests" href="/quests" />
        <SidebarItem iconSrc="/shop.svg" label="Shop" href="/shop" />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
};

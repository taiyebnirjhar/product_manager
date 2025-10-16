import { ChevronDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { signOut } from "next-auth/react";

export interface UserMenuProps {
  name: string;
  designation?: string;
}

export function UserMenu({ name, designation = "admin" }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-md px-1.5 py-0.5 outline-none hover:bg-accent dark:hover:bg-white/10 !cursor-pointer">
        <div className="flex flex-col items-start -space-y-1">
          <p className="text-sm font-medium text-foreground dark:text-white">
            {name}
          </p>
          <p className="text-xs text-muted-foreground">{designation}</p>
        </div>
        <ChevronDown className=" h-4 w-4 text-muted-foreground dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 dark:bg-background dark:border-white/60"
      >
        <DropdownMenuItem
          onClick={async () => await signOut()}
          className="text-red-600 focus:text-red-600 w-full text-end dark:hover:bg-white/10 cursor-pointer"
        >
          <LogOut className="mr-1 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

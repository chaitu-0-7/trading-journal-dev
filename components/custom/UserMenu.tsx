
import { LogOut, Settings, SunIcon, MoonIcon, User2Icon } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "@/app/auth";
import { ThemeSwitcher } from "../themes/ThemeSwitcher";

interface UserButtonProps {
  user: User;
}

export default function UserButton({ user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full">
          <User2Icon/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center px-4 py-2 w-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ThemeSwitcher />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="flex items-center px-4 py-2 w-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className="flex w-full items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <LogOut className="mr-2" /> Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

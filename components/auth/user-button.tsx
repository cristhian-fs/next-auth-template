"use client";

import { LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {

  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-card">
            <UserIcon className="text-white"/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem>
            Logout
            <LogOutIcon />
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
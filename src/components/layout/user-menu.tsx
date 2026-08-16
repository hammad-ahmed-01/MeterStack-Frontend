"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUserFullName } from "@/lib/supabase/auth"
import { getInitials } from "@/lib/utils"
import { useAuth } from "@/providers/auth-provider"

type UserMenuProps = {
  compact?: boolean
}

export function UserMenu({ compact = false }: UserMenuProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const name = getUserFullName(user)
  const email = user?.email ?? ""

  async function handleSignOut() {
    await signOut()
    queryClient.clear()
    router.push("/login")
    router.refresh()
  }

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar size="sm">
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center justify-between gap-2 px-2 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleSignOut}
        aria-label="Logout"
      >
        <LogOut />
      </Button>
    </div>
  )
}

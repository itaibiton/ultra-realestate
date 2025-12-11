"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/app/[locale]/(auth)/actions";

interface HeaderUserMenuProps {
  user: SupabaseUser;
  className?: string;
}

/**
 * HeaderUserMenu - User dropdown in header
 *
 * Shows user avatar with dropdown containing:
 * - User email
 * - Profile link
 * - Settings link
 * - Sign out action
 */
export function HeaderUserMenu({ user, className }: HeaderUserMenuProps) {
  const t = useTranslations("sidebar.nav");

  // Get user initials from email
  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "??";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Account</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile/account" className="cursor-pointer">
            <User className="me-2 h-4 w-4" />
            {t("account")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <Settings className="me-2 h-4 w-4" />
            {t("settings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut} className="w-full">
            <button type="submit" className="flex items-center w-full cursor-pointer">
              <LogOut className="me-2 h-4 w-4" />
              {t("signOut")}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

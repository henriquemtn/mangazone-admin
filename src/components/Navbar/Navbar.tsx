"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound } from "lucide-react";
import Search from "./Search";
import Cookie from 'js-cookie';

interface User {
  displayName: string;
  photoURL: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há usuário no localStorage ao carregar a página
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    // Limpar o localStorage e redirecionar para a página de login
    Cookie.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Limpar o estado do usuário
    router.push("/");
  };
  return (
    <div className="border-b">
      <header className="container sticky top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/mangas"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Mangás
          </Link>
          <Link
            href="/voiceActors"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
           Dubladores
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Editoras
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Reviews
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/mangas"
                className="text-muted-foreground hover:text-foreground"
              >
                Mangás
              </Link>
              <Link
                href="/voiceActors"
                className="text-muted-foreground hover:text-foreground"
              >
               Dubladores
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Editoras
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Reviews
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
              {user ? (
                  <>
                    <Avatar>
                      <AvatarFallback>
                        {user.displayName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                      <AvatarImage src={user.photoURL ?? undefined} />
                    </Avatar>
                  </>
                ) : (
                  <div className="flex gap-1">
                    <CircleUserRound color="#181818" />
                    <p className="font-medium text-[14px] text-[#181818]">
                      Entre ou cadastre-se
                    </p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href='/settings'>Settings</Link></DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}

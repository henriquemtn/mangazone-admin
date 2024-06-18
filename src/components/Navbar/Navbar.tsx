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
import { auth } from "@/firebase/firebaseConfig";
import { User, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { CircleUserRound } from "lucide-react";
import Search from "./Search";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem("admin");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Fetch user data from Firestore using uid
      const fetchUserData = async () => {
        const db = getFirestore();
        const userRef = doc(db, "users", parsedUser.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const firestoreUserData = docSnap.data() as User;
            setUser(firestoreUserData);
          } else {
            console.error("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    } else {
      setIsLoading(false);
      router.push("/"); // Redirect to home if no user is found
    }
  }, [router]);

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.removeItem("admin");
    router.push("/"); // Redirect to home after logout
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
            href="/"
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
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Artistas
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
              <Link href="/" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/mangas"
                className="text-muted-foreground hover:text-foreground"
              >
                Mangás
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Artistas
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
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

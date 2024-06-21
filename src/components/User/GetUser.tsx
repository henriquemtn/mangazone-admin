"use client";

import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EditUser from "./EditUser";

export default function GetUser() {
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

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="border p-4 md:w-1/3">
      <div className="flex w-full justify-between items-center">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarFallback></AvatarFallback>
          <AvatarImage height={120} width={120} src={user.photoURL ?? ''} />
        </Avatar>
        <EditUser
          displayName={user.displayName ?? ''}
          username={user.username ?? ''}
          biography={user.biography ?? ''}
          gender={user.gender ?? ''}
          photoURL={user.photoURL ?? ''}
          location={user.location ?? ''}
        />
      </div>
      <hr className="my-4" />
      <div className="gap-2 flex flex-col mt-4">
        <h1>Informações do Admin:</h1>
        <p>Nome: {user.displayName}</p>
        <p>Username: @{user.username}</p>
        <p>Email: {user.email}</p>
        <p>Descrição: {user.biography}</p>
        <p>Nacionalidade: {user.location}</p>
        <p>Id: {user.id}</p>
      </div>
    </div>
  );
}

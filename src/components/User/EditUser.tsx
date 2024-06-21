"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { EditUserProps } from "@/types/types";

export default function EditUser({
  displayName,
  username,
  biography,
  gender,
  photoURL,
  location,
}: EditUserProps) {
  const [displayNameUser, setDisplayNameUser] = useState(displayName);
  const [usernameUser, setUsernameUser] = useState(username);
  const [biographyUser, setBiographyUser] = useState(biography);
  const [genderUser, setGenderUser] = useState(gender);
  const [photoURLUser, setPhotoURLUser] = useState(photoURL);
  const [locationUser, setLocationUser] = useState(location);

  const handleEditUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtém o token do localStorage ou outra fonte
      console.log(token)

      if (!token) {
        throw new Error("Token de autenticação ausente, acesso negado");
      }

      const response = await axios.put(
        `https://api-mangazone.onrender.com/api/user/update`,
        {
          displayName: displayNameUser,
          username: usernameUser,
          biography: biographyUser,
          gender: genderUser,
          photoURL: photoURLUser,
          location: locationUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Envie o token no cabeçalho Authorization
          },
        }
      );

      if (!response.data) {
        throw new Error("Falha ao atualizar o usuário");
      }

      toast.success("Informações do usuário atualizadas com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      toast.error(
        "Erro ao atualizar informações do usuário. Tente novamente mais tarde."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Informações</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Informações do Usuário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-right">
              Nome de Exibição
            </Label>
            <Input
              id="displayName"
              defaultValue={displayNameUser}
              onChange={(e) => setDisplayNameUser(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Nome de Usuário
            </Label>
            <Input
              id="username"
              defaultValue={usernameUser}
              onChange={(e) => setUsernameUser(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="biography" className="text-right">
              Biografia
            </Label>
            <textarea
              id="biography"
              defaultValue={biographyUser}
              onChange={(e) => setBiographyUser(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gênero
            </Label>
            <Input
              id="gender"
              defaultValue={genderUser}
              onChange={(e) => setGenderUser(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoURL" className="text-right">
              URL da Foto
            </Label>
            <Input
              id="photoURL"
              defaultValue={photoURLUser}
              onChange={(e) => setPhotoURLUser(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Localização
            </Label>
            <Input
              id="location"
              defaultValue={locationUser}
              onChange={(e) => setLocationUser(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleEditUser}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

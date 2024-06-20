"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { UserPlus } from "lucide-react";

interface CP {
  mangaId: String;
  mangaTitle: String;
}

export default function AddCharacter({ mangaId, mangaTitle }: CP) {
  const [charName, setCharName] = useState("");
  const [charPhotoUrl, setCharPhotoUrl] = useState("");
  const [charAge, setCharAge] = useState("");
  const [charBiography, setCharBiography] = useState("");
  const [charSpoiler, setCharSpoiler] = useState("");

  const handleAddCharacter = async () => {
    const characterData = {
      name: charName,
      photoUrl: charPhotoUrl,
      spoiler: charSpoiler,
      age: parseFloat(charAge),
      biography: charBiography,
    };

    try {
      const response = await axios.post(
        `https://api-mangazone.onrender.com/api/mangas/${mangaId}/characters`,
        characterData
      );

      if (response.status === 201) {
        console.log("Personagem adicionado com sucesso:", response.data);

        toast.success("Personagem adicionado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error("Falha ao adicionar o Personagem ao manga");
      }
    } catch (error) {
      console.error("Erro ao adicionar Personagem:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full w-14 h-14"><UserPlus size={22} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Personagem para {mangaTitle}</DialogTitle>
          <DialogDescription>
            Adicione um novo personagem a determinado titulo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="characterName" className="text-right">
              Nome Personagem
            </Label>
            <Input
              id="characterName"
              type="text"
              value={charName}
              onChange={(e) => setCharName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="charPhotoUrl" className="text-right">
              URL da Imagem
            </Label>
            <Input
              id="charPhotoUrl"
              value={charPhotoUrl}
              onChange={(e) => setCharPhotoUrl(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="charAge" className="text-right">
              Idade
            </Label>
            <Input
              id="charAge"
              type="number"
              value={charAge}
              onChange={(e) => setCharAge(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="charBiography" className="text-right">
              Biography
            </Label>
            <Input
              id="biography"
              value={charBiography}
              onChange={(e) => setCharBiography(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="charSpoiler" className="text-right">
            Spoiler
          </Label>
          <Input
            id="spoiler"
            value={charSpoiler}
            onChange={(e) => setCharSpoiler(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleAddCharacter}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

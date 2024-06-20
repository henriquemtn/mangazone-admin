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
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

interface CP {
  characterId: string;
  mangaId: string;
  characterName: string;
  characterPhotoUrl: string;
  characterAge: number;
  characterBiography: string;
  characterSpoiler: string;
}

export default function EditCharacter({
  mangaId,
  characterId,
  characterName,
  characterPhotoUrl,
  characterAge,
  characterBiography,
  characterSpoiler,
}: CP) {
  const [charName, setCharName] = useState(characterName);
  const [charPhotoUrl, setCharPhotoUrl] = useState(characterPhotoUrl);
  const [charAge, setCharAge] = useState(characterAge);
  const [charBiography, setCharBiography] = useState(characterBiography);
  const [charSpoiler, setCharSpoiler] = useState(characterSpoiler);

  const handleChangeCharacter = async (characterId: string) => {
    // Dados do volume a ser modificado
    const volumeData = {
      name: charName,
      photoUrl: charPhotoUrl,
      spoiler: charSpoiler,
      age: parseFloat(charAge.toString()),
      biography: charBiography,
    };

    try {
      const response = await axios.put(
        `https://api-mangazone.onrender.com/api/mangas/${mangaId}/characters/${characterId}`,
        volumeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Informações do volume modificadas com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao modificar o volume do mangá:", error);
      toast.error(
        "Erro ao modificar informações do volume. Tente novamente mais tarde."
      );
    }
  };

  const handleRemoveCharacter = async (characterId: string) => {
    try {
      const response = await axios.delete(
        `https://api-mangazone.onrender.com/api/mangas/${mangaId}/characters/${characterId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Personagem excluído com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir o Personagem:", error);
      toast.error("Erro ao excluir o Personagem. Tente novamente mais tarde.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full w-12 h-12">
          <Pencil size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Personagem: {characterName}</DialogTitle>
          <DialogDescription>
            Editar um novo personagem a determinado titulo.
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
              onChange={(e) => setCharAge(parseFloat(e.target.value))}
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
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">
                <Trash2 size={14} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Label className="text-center text-xl my-4">
                Você está excluindo o personagem {characterName}
              </Label>
              <Label className="text-center text-base">
                Tem certeza que quer excluir este personagem?
              </Label>
              <Button
                variant="destructive"
                onClick={() => handleRemoveCharacter(characterId)}
              >
                Excluir este personagem.
              </Button>
            </DialogContent>
          </Dialog>
          <Button onClick={() => handleChangeCharacter(characterId)}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

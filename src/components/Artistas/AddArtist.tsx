"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Artist } from "@/types/types";
import { Select } from "../ui/select";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import SelectInput from "../Select";
import axios from "axios";

const AddArtist: React.FC = () => {
  const router = useRouter();

  const [newArtist, setNewArtist] = useState<Artist>({
    _id: "",
    name: "",
    photoUrl: "",
    birthday: "",
    role: "",
    nationality: "",
    favorites: [],
    biography: "",
    dubCharacters: [],
    __v: 0,
  });

  const handleAddArtist = async () => {
    try {
      const response = await axios.post(
        "https://api-mangazone.onrender.com/api/artists",
        newArtist,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Falha ao adicionar o Artista");
      }

      toast.success("Artista adicionado com sucesso!");
      setTimeout(() => {
        router.push("/artistas");
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar o artista:", error);
      toast.error("Erro ao adicionar o artista. Tente novamente mais tarde.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Adicionar um Novo Artista</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Adicione um novo Artista ao banco de dados!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Artista</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicione um Novo Artista</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newArtist.name}
                  onChange={(e) =>
                    setNewArtist({ ...newArtist, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Cargo
                </Label>
                <SelectInput
                  options={[
                    { value: "author", label: "Autor" },
                    { value: "voiceActor", label: "Dublador" },
                  ]}
                  id="role"
                  value={newArtist.role}
                  onChange={(selectedRole) =>
                    setNewArtist({ ...newArtist, role: selectedRole })
                  }
                  placeholder="Escolha um cargo"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="photoUrl" className="text-right">
                  URL da Foto
                </Label>
                <Input
                  id="photoUrl"
                  value={newArtist.photoUrl}
                  onChange={(e) =>
                    setNewArtist({
                      ...newArtist,
                      photoUrl: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthday" className="text-right">
                  Data de Nascimento
                </Label>
                <Input
                  id="birthday"
                  value={newArtist.birthday}
                  onChange={(e) =>
                    setNewArtist({
                      ...newArtist,
                      birthday: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nationality" className="text-right">
                  Nacionalidade
                </Label>
                <SelectInput
                  options={[
                    { value: "brasileira", label: "Brasileira" },
                    { value: "portugues", label: "Português" },
                    { value: "japones", label: "Japonês" },
                    { value: "coreano", label: "Coreano" },
                    { value: "americano", label: "Americano" },
                    { value: "outro", label: "Outro" },
                  ]}
                  id="nationality"
                  placeholder="Escolha a nacionalidade"
                  value={newArtist.nationality}
                  onChange={(selectedNationality) =>
                    setNewArtist({
                      ...newArtist,
                      nationality: selectedNationality,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="favorites" className="text-right">
                  Animes Favoritos
                </Label>
                <Input
                  id="favorites"
                  value={newArtist.favorites.join(", ")}
                  onChange={(e) =>
                    setNewArtist({
                      ...newArtist,
                      favorites: e.target.value.split(", "),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="biography" className="text-right">
                  Biografia
                </Label>
                <Input
                  id="biography"
                  value={newArtist.biography}
                  onChange={(e) =>
                    setNewArtist({
                      ...newArtist,
                      biography: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddArtist}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AddArtist;

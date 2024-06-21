'use client';

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
import { VoiceActor } from "@/types/types";

const AddVoiceActor: React.FC = () => {
  const router = useRouter();

  const [newVoiceActor, setNewVoiceActor] = useState<VoiceActor>({
    _id: "",
    name: "",
    photoUrl: "",
    birthday: "",
    nationality: "",
    favorites: [],
    biography: "",
    dubCharacters: [],
    __v: 0,
  });

  const handleAddVoiceActor = async () => {
    try {
      // Faz a requisição POST para adicionar o dublador
      const response = await fetch(
        "https://api-mangazone.onrender.com/api/voiceActors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVoiceActor),
        }
      );

      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error("Falha ao adicionar o dublador");
      }

      // Exibe um toast de sucesso
      toast.success("Dublador adicionado com sucesso!");
      // Redireciona para a página de dubladores (simulado)
      setTimeout(() => {
        router.push("/voiceActors");
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar o dublador:", error);
      toast.error("Erro ao adicionar o dublador. Tente novamente mais tarde.");
    }
  };

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Adicionar um Novo Dublador</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Adicione um novo Dublador ao banco de dados!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Dublador</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicione um Novo Dublador</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newVoiceActor.name}
                  onChange={(e) =>
                    setNewVoiceActor({ ...newVoiceActor, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="photoUrl" className="text-right">
                  URL da Foto
                </Label>
                <Input
                  id="photoUrl"
                  value={newVoiceActor.photoUrl}
                  onChange={(e) =>
                    setNewVoiceActor({
                      ...newVoiceActor,
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
                  value={newVoiceActor.birthday}
                  onChange={(e) =>
                    setNewVoiceActor({
                      ...newVoiceActor,
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
                <Input
                  id="nationality"
                  value={newVoiceActor.nationality}
                  onChange={(e) =>
                    setNewVoiceActor({
                      ...newVoiceActor,
                      nationality: e.target.value,
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
                  value={newVoiceActor.favorites.join(", ")}
                  onChange={(e) =>
                    setNewVoiceActor({
                      ...newVoiceActor,
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
                  value={newVoiceActor.biography}
                  onChange={(e) =>
                    setNewVoiceActor({
                      ...newVoiceActor,
                      biography: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddVoiceActor}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AddVoiceActor;

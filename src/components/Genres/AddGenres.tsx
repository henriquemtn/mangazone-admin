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
import axios from "axios";

interface CP {
  name: string;
}

const AddGenres: React.FC = () => {
  const router = useRouter();

  const [newGenres, setNewGenres] = useState<CP>({
    name: "",
  });

  const handleAddGenres = async () => {
    try {
      const { ...genresData } = newGenres;

      const response = await axios.post(
        "https://api-mangazone.onrender.com/api/genres",
        genresData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Falha ao adicionar o Gênero");
      }

      toast.success("Gênero adicionada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar a Gênero:", error);
      toast.error("Erro ao adicionar a Gênero. Tente novamente mais tarde.");
    }
  };

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Adicionar um novo Gênero</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Adicione um nova Gênero ao banco de dados!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Gênero</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicione um nova Gênero</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newGenres.name}
                  onChange={(e) =>
                    setNewGenres({ ...newGenres, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddGenres}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AddGenres;

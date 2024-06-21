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
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import axios from "axios";

interface CP {
    name: string,
    sinceYear: number
}

const AddEditoras: React.FC = () => {

  const [newEditora, setNewEditora] = useState<CP>({
    name: "",
    sinceYear: 0,
  });

  const handleAddEditora = async () => {
    try {
      const { ...editoraData } = newEditora;

      const response = await axios.post(
        "https://api-mangazone.onrender.com/api/editoras",
        editoraData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Falha ao adicionar o Artista");
      }

      toast.success("Editora adicionada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar a editora:", error);
      toast.error("Erro ao adicionar a editora. Tente novamente mais tarde.");
    }
  };
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Adicionar um nova Editora</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Adicione um nova Editora ao banco de dados!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Artista</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicione um nova Editora</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newEditora.name}
                  onChange={(e) =>
                    setNewEditora({ ...newEditora, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sinceYear" className="text-right">
                  Ano de Criação
                </Label>
                <Input
                  id="sinceYear"
                  value={newEditora.sinceYear}
                  type="number"
                  onChange={(e) =>
                    setNewEditora({
                      ...newEditora,
                      sinceYear: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddEditora}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AddEditoras;

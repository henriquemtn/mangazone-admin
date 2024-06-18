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

interface Manga {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  imageUrl: string;
}

export default function AddManga() {
  const router = useRouter();

  const [titulo, setTitulo] = useState<string>("");
  const [autor, setAutor] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number>(2000);
  const [imageURL, setImageURL] = useState<string>("");

  const handleAddManga = async () => {
    try {
      // Verifica se os campos obrigatórios estão preenchidos
      if (!titulo || !genero) {
        throw new Error("Título e Gênero são campos obrigatórios");
      }

      // Monta o objeto manga com os dados inseridos
      const newManga: Manga = {
        title: titulo,
        author: autor,
        genre: genero,
        publishedYear: publishedYear,
        imageUrl: imageURL,
      };

      // Faz a requisição POST para adicionar o mangá
      const response = await fetch("https://api-mangazone.onrender.com/api/mangas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newManga),
      });

      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error("Falha ao adicionar o mangá");
      }

      // Exibe um toast de sucesso
      toast.success("Mangá adicionado com sucesso!");

      // Redireciona para a página de mangás (simulado)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar o mangá:", error);
      toast.error("Erro ao adicionar o mangá. Tente novamente mais tarde.");
    }
  };

  const handleRemoveManga = async() => {

  }

  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Adicionar um novo Mangá</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Adicione um novo mangá ao banco de dados!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Mangá</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicione um Novo Mangá</DialogTitle>
              <DialogDescription>
                Faça alterações nas informações do manga aqui. Clique em salvar
                quando terminar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="titulo" className="text-right">
                  Título
                </Label>
                <Input
                  id="titulo"
                  defaultValue={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="autor" className="text-right">
                  Autor
                </Label>
                <Input
                  id="autor"
                  defaultValue={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="genero" className="text-right">
                  Gênero
                </Label>
                <Input
                  id="genero"
                  defaultValue={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publishedYear" className="text-right">
                  Ano de Publicação
                </Label>
                <Input
                  id="publishedYear"
                  defaultValue={publishedYear.toString()}
                  onChange={(e) => setPublishedYear(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageURL" className="text-right">
                  URL da Imagem
                </Label>
                <Input
                  id="imageURL"
                  defaultValue={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddManga}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

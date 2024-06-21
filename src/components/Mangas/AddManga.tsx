"use client";

import React, { useEffect, useState } from "react";
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
import { Editora, Genres, Manga } from "@/types/types";
import axios from "axios";
import SelectInput from "../Select";
import SelectMultiple from "../SelectMultiples";
import DropdownTagsSelect from "../SelectMultiples";

export default function AddManga() {
  const router = useRouter();

  const [newManga, setNewManga] = useState<Manga>({
    _id: "", // Seu backend geralmente gera o _id
    imageUrl: "",
    title: "",
    alternativeTitles: "",
    author: "",
    synopsis: "",
    genres: [],
    publisherBy: "",
    score: 0,
    releaseDate: "",
  });

  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    fetchEditoras();
    fetchGenres();
  }, []);

  const fetchEditoras = async () => {
    try {
      const response = await axios.get(
        "https://api-mangazone.onrender.com/api/editoras"
      );
      setEditoras(response.data);
    } catch (error) {
      console.error("Erro ao buscar editoras:", error);
      // Trate o erro conforme necessário (ex.: exibir uma mensagem de erro)
    }
  };

  const handleAddManga = async () => {
    try {
      // Verifica se os campos obrigatórios estão preenchidos
      if (!newManga.title || !newManga.genres) {
        throw new Error("Título e Gênero são campos obrigatórios");
      }

      // Faz a requisição POST para adicionar o mangá
      const response = await fetch(
        "https://api-mangazone.onrender.com/api/mangas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newManga),
        }
      );

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

  const fetchGenres = async () => {
    try {
      const response = await axios.get("https://api-mangazone.onrender.com/api/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      // Trate o erro conforme necessário (ex.: exibir uma mensagem de erro)
    }
  };

  const handleGenresChange = (selectedGenres: string[]) => {
    setNewManga({ ...newManga, genres: selectedGenres });
  };

  
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
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  value={newManga.title}
                  onChange={(e) =>
                    setNewManga({ ...newManga, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="alternativeTitles" className="text-right">
                  Títulos Alternativos
                </Label>
                <Input
                  id="alternativeTitles"
                  value={newManga.alternativeTitles}
                  onChange={(e) =>
                    setNewManga({
                      ...newManga,
                      alternativeTitles: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Autor
                </Label>
                <Input
                  id="author"
                  value={newManga.author}
                  onChange={(e) =>
                    setNewManga({ ...newManga, author: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="synopsis" className="text-right">
                  Sinopse
                </Label>
                <Input
                  id="synopsis"
                  value={newManga.synopsis}
                  onChange={(e) =>
                    setNewManga({ ...newManga, synopsis: e.target.value })
                  }
                  className="col-span-3 border rounded-md p-3 text-sm"
                  />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="genres" className="text-right">
                  Gêneros
                </Label>
                <DropdownTagsSelect
                  placeholder="Selecione os Gêneros"
                  blogTags={genres.map((genre) => genre.name)}
                  onChange={handleGenresChange}
                  value={newManga.genres}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publisherBy" className="text-right">
                  Editora
                </Label>
                <SelectInput
                  id="publisherBy"
                  value={newManga.publisherBy}
                  onChange={(e) =>
                    setNewManga({ ...newManga, publisherBy: e.target.value })
                  }
                  options={editoras.map((editora) => ({
                    value: editora.name,
                    label: editora.name,
                  }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="score" className="text-right">
                  Pontuação
                </Label>
                <Input
                  id="score"
                  type="number"
                  value={newManga.score}
                  onChange={(e) =>
                    setNewManga({
                      ...newManga,
                      score: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="releaseDate" className="text-right">
                  Data de Lançamento
                </Label>
                <Input
                  id="releaseDate"
                  value={newManga.releaseDate}
                  onChange={(e) =>
                    setNewManga({ ...newManga, releaseDate: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  URL da Imagem
                </Label>
                <Input
                  id="imageUrl"
                  value={newManga.imageUrl}
                  onChange={(e) =>
                    setNewManga({ ...newManga, imageUrl: e.target.value })
                  }
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

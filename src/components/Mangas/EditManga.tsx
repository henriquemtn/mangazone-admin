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
import axios from "axios";
import { Editora, Genres, ModifyManga } from "@/types/types";
import DropdownTagsSelect from "../SelectMultiples";
import SelectInput from "../Select";

export default function EditManga({
  mangaId,
  mangaTitle,
  M_imageUrl,
  M_title,
  M_alternativeTitles,
  M_author,
  M_synopsis,
  M_genres,
  M_publisherBy,
  M_score,
  M_releaseDate,
}: ModifyManga) {
  const [title, setTitle] = useState(M_title);
  const [alternativeTitles, setAlternativeTitles] =
    useState(M_alternativeTitles);
  const [author, setAuthor] = useState(M_author);
  const [synopsis, setSynopsis] = useState(M_synopsis);
  const [genres, setGenres] = useState<string[]>(M_genres);
  const [publisherBy, setPublisherBy] = useState(M_publisherBy);
  const [score, setScore] = useState(M_score);
  const [releaseDate, setReleaseDate] = useState(M_releaseDate);
  const [imageUrlManga, setImageUrlManga] = useState(M_imageUrl);

  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [genresOptions, setGenresOptions] = useState<Genres[]>([]);


  const router = useRouter();

  const handleDeleteManga = async (mangaId: string) => {
    try {
      const response = await fetch(
        `https://api-mangazone.onrender.com/api/mangas/${mangaId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao remover o mangá");
      }

      toast.success("Mangá removido com sucesso!");

      setTimeout(() => {
        router.push("/mangas");
      }, 1500);
    } catch (error) {
      console.error("Erro ao remover o mangá:", error);
      toast.error("Erro ao remover o mangá. Tente novamente mais tarde.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `https://api-mangazone.onrender.com/api/mangas/${mangaId}`,
        {
          title: title,
          alternativeTitles: alternativeTitles,
          author: author,
          synopsis: synopsis,
          genres: genres,
          publisherBy: publisherBy,
          score: parseFloat(score.toString()),
          releaseDate: releaseDate,
          imageUrl: imageUrlManga,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Falha ao atualizar o manga");
      }

      toast.success("Informações do manga atualizadas com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar o manga:", error);
      toast.error(
        "Erro ao atualizar informações do manga. Tente novamente mais tarde."
      );
    }
  };

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

  const fetchGenres = async () => {
    try {
      const response = await axios.get("https://api-mangazone.onrender.com/api/genres");
      setGenresOptions(response.data);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      // Trate o erro conforme necessário (ex.: exibir uma mensagem de erro)
    }
  };

  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Informações</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Informações de {mangaTitle}</DialogTitle>
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
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alternativeTitles" className="text-right">
              Títulos Alternativos
            </Label>
            <Input
              id="alternativeTitles"
              defaultValue={alternativeTitles}
              onChange={(e) => setAlternativeTitles(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="autor" className="text-right">
              Autor
            </Label>
            <Input
              id="autor"
              defaultValue={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="synopsis" className="text-right">
              Sinopse
            </Label>
            <textarea
              id="synopsis"
              defaultValue={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="col-span-3 border rounded-md p-3 text-sm"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genres" className="text-right">
              Gêneros
            </Label>
            <DropdownTagsSelect
              blogTags={genresOptions.map((genre) => genre.name)}
              onChange={setGenres}
              value={genres}
              placeholder={genres.join(", ")}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="publisherBy" className="text-right">
              Editora
            </Label>
            <SelectInput
              id="publisherBy"
              value={publisherBy}
              onChange={(e) => setPublisherBy(e.target.value)}
              options={editoras.map((editora) => ({
                value: editora.name,
                label: editora.name,
              }))}
              placeholder="Selecione a Editora"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="score" className="text-right">
              Pontuação
            </Label>
            <Input
              id="score"
              defaultValue={score}
              onChange={(e) => setScore(parseFloat(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="releaseDate" className="text-right">
              Ano de Publicação
            </Label>
            <Input
              id="releaseDate"
              defaultValue={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageURL" className="text-right">
              URL da Imagem
            </Label>
            <Input
              id="imageURL"
              defaultValue={imageUrlManga}
              onChange={(e) => setImageUrlManga(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => handleDeleteManga(mangaId)}
          >
            Remover Mangá
          </Button>
          <Button onClick={handleSaveChanges}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

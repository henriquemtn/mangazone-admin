"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bold, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import EditVolumes from "./Volumes/EditVolumes";
import Image from "next/image";
import axios from "axios";

interface Characters {
  _id: string;
  name: string;
  photoUrl: string;
  spoiler: string;
  age: number;
  biography: string;
  voiceActors: string[];
}

interface Volume {
  _id: string;
  number: number;
  date: string;
  chapters: string;
  image: string;
  volumeName: string;
  price?: number;
  linkAmazon?: string;
}

interface Manga {
  _id: string;
  imageUrl: string;
  title: string;
  alternativeTitles: string;
  author: string;
  synopsis: string;
  genres: string;
  publisherBy: string;
  score: number;
  releaseDate: string;
  characters: Characters[];
  volumes: Volume[];
}

interface CP {
  mangaUrl: string;
}

export default function MangaSearchById({ mangaUrl }: CP) {
  const [manga, setManga] = useState<Manga | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [alternativeTitles, setAlternativeTitles] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genres, setGenres] = useState("");
  const [publisherBy, setPublisherBy] = useState("");
  const [score, setScore] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imageUrlManga, setImageUrlManga] = useState("");

  const [volumeNumber, setVolumeNumber] = useState("");
  const [Date, setDate] = useState("");
  const [isAlternativeCover, setIsAlternativeCover] = useState(false);
  const [chapters, setChapters] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(mangaUrl);
        if (!response.ok) {
          throw new Error("Erro ao buscar o manga");
        }
        const data = await response.json();
        setManga(data);
        setTitle(data.title);
        setAlternativeTitles(data.alternativeTitles);
        setSynopsis(data.synopsis);
        setScore(data.score);
        setPublisherBy(data.publisherBy);
        setAuthor(data.author);
        setGenres(data.genres);
        setReleaseDate(data.releaseDate);
        setImageUrlManga(data.imageUrl);
        setVolumeNumber(data.volumeNumber);
        setDate(data.Date);
        setIsAlternativeCover(data.isAlternativeCover);
        setChapters(data.chapters);
        setImageUrl(data.imageUrl);
        setPrice(data.price);
        setLink(data.link);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Erro desconhecido", error);
        }
      }
    };

    fetchManga();
  }, [mangaUrl]);

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
        `https://api-mangazone.onrender.com/api/mangas/${manga?._id}`,
        {
          title: title,
          alternativeTitles: alternativeTitles,
          author: author,
          synopsis: synopsis,
          genres: genres,
          publisherBy: publisherBy,
          score: parseFloat(score),
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

  const handleRemoveVolume = async (volumeId: string) => {
    try {
      const response = await fetch(
        `https://api-mangazone.onrender.com/api/mangas/${manga?._id}/volumes/${volumeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao excluir o volume");
      }

      // Exibindo uma mensagem de sucesso utilizando toast
      toast.success("Volume excluído com sucesso!");

      // Atualizando a interface após a exclusão (opcional)
      setTimeout(() => {
        window.location.reload(); // Recarrega a página após 1.5 segundos
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir o volume:", error);
      // Exibindo mensagem de erro utilizando toast
      toast.error("Erro ao excluir o volume. Tente novamente mais tarde.");
    }
  };

  const handleAddVolume = async () => {
    const volumeData = {
      number: parseInt(volumeNumber), // Converte para número, se necessário
      date: releaseDate,
      alternativeCover: isAlternativeCover, // Não tenho certeza do que é chapters, verificar se é isso mesmo
      chapters: chapters,
      image: imageUrl,
      linkAmazon: link,
      price: parseFloat(price), // Converte para número de ponto flutuante, se necessário
    };

    try {
      const response = await axios.post(
        `https://api-mangazone.onrender.com/api/mangas/${manga?._id}/volumes`,
        volumeData
      );

      if (response.status === 201) {
        console.log("Volume adicionado com sucesso:", response.data);

        toast.success("Volume adicionado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error("Falha ao adicionar o volume ao manga");
      }
    } catch (error) {
      console.error("Erro ao adicionar volume:", error);
    }
  };

  if (!manga) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <section className="bg-gray-100 dark:bg-gray-950 py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {manga.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl mb-6">
                By {manga.author}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {manga.synopsis}
              </p>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Adicionar Volume</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        Adicionar informações do volume para {manga.title}
                      </DialogTitle>
                      <DialogDescription>
                        Faça alterações nas informações do manga aqui. Clique em
                        salvar quando terminar.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="volumeNumber" className="text-right">
                          Número do Volume
                        </Label>
                        <Input
                          id="volumeNumber"
                          type="number"
                          value={volumeNumber}
                          onChange={(e) => setVolumeNumber(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="releaseDate" className="text-right">
                          Data de Lançamento
                        </Label>
                        <Input
                          id="releaseDate"
                          type="text"
                          value={releaseDate}
                          onChange={(e) => setReleaseDate(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="chapters" className="text-right">
                          Capítulos
                        </Label>
                        <Input
                          id="chapters"
                          type="text"
                          value={chapters}
                          onChange={(e) => setChapters(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageUrl" className="text-right">
                          URL da Imagem
                        </Label>
                        <Input
                          id="imageUrl"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Preço
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="link" className="text-right">
                          Link
                        </Label>
                        <Input
                          id="link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddVolume}>
                        Salvar Alterações
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Editar Informações</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        Editar Informações de {manga.title}
                      </DialogTitle>
                      <DialogDescription>
                        Faça alterações nas informações do manga aqui. Clique em
                        salvar quando terminar.
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
                        <Label
                          htmlFor="alternativeTitles"
                          className="text-right"
                        >
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
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="genero" className="text-right">
                          Gênero
                        </Label>
                        <Input
                          id="genero"
                          defaultValue={genres}
                          onChange={(e) => setGenres(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="publisherBy" className="text-right">
                          Publicado por
                        </Label>
                        <Input
                          id="publisherBy"
                          defaultValue={publisherBy}
                          onChange={(e) => setPublisherBy(e.target.value)}
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
                          onChange={(e) => setScore(e.target.value)}
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
                        onClick={() => handleDeleteManga(manga._id)}
                      >
                        Remover Mangá
                      </Button>
                      <Button onClick={handleSaveChanges}>
                        Salvar Alterações
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={manga.imageUrl || "/placeholder.svg"}
                alt={manga.title}
                width={200}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {manga.characters.map((character) => (
              <div
                key={character._id}
                className="items-center flex  flex-col border rounded-lg my-4"
              >
                <Image
                  src={character.photoUrl || "/placeholder.svg"}
                  alt={character.name}
                  className="w-[150px] h-[150px] rounded-lg mb-4 object-cover"
                  width={150}
                  height={150}
                />
                <h3 className="text-lg font-medium mb-2">{character.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="container max-w-6xl px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium mb-8">
            Volumes adicionados: {manga.volumes.length}
          </h2>
          <div className="w-full">
            <Table>
              <TableCaption>A list of volumes for {manga.title}.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Volume</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Opções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {manga.volumes
                  .sort((a, b) => a.number - b.number)
                  .map((volume) => (
                    <TableRow key={volume._id}>
                      <TableCell className="font-medium">
                        {volume.number}
                      </TableCell>
                      <TableCell>
                        <img
                          src={volume.image || "/placeholder.svg"}
                          alt={`Volume ${volume.number} Cover`}
                          width={100}
                          height={150}
                        />
                      </TableCell>
                      <TableCell>
                        {manga.title} Vol. {volume.number}
                      </TableCell>
                      <TableCell>R$ {volume.price}</TableCell>
                      <TableCell>
                        <EditVolumes
                          mangaId={manga._id}
                          volumeId={volume._id}
                          volumeNumberExisting={volume.number}
                          releaseDateExisting={volume.date}
                          chaptersExisting={volume.chapters}
                          imageUrlExisting={volume.image}
                          priceExisting={volume.price}
                          linkExisting={volume.linkAmazon}
                          handleRemoveVolume={() =>
                            handleRemoveVolume(volume._id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}

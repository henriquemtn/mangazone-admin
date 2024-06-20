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
import AddVolume from "./Volumes/AddVolume";
import EditManga from "./Mangas/EditManga";
import AddCharacter from "./Characters/AddCharacter";
import EditCharacter from "./Characters/EditCharacter";

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
  const [date, setDate] = useState("");
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
                <AddVolume mangaId={manga._id} mangaTitle={manga.title} />
                <EditManga
                  mangaId={manga._id}
                  mangaTitle={manga.title}
                  M_imageUrl={manga.imageUrl}
                  M_title={manga.title}
                  M_alternativeTitles={manga.alternativeTitles}
                  M_author={manga.author}
                  M_synopsis={manga.synopsis}
                  M_genres={manga.genres}
                  M_publisherBy={manga.publisherBy}
                  M_score={manga.score}
                  M_releaseDate={manga.releaseDate}
                />
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
        <div className="container flex max-w-6xl px-4 mx-auto">
          <div className="w-2/3 container max-w-6xl px-4 mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium mb-8">
              Volumes adicionados: {manga.volumes.length}
            </h2>
            <div className="w-full">
              <Table>
                <TableCaption>
                  A list of volumes for {manga.title}.
                </TableCaption>
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
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center justify-between">
              <h1>Total de Personagens: {manga.characters.length}</h1>
              <AddCharacter mangaId={manga._id} mangaTitle={manga.title} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {manga.characters.map((character) => (
                <div
                  key={character._id}
                  className="items-center flex  flex-col border rounded-lg my-4"
                >
                  <Image
                    src={
                      character.photoUrl?.startsWith("http")
                        ? character.photoUrl
                        : "https://i.pinimg.com/564x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
                    }
                    alt={character.name}
                    className="w-[150px] h-[150px] rounded-t-lg mb-4 object-cover"
                    width={150}
                    height={150}
                  />
                  <h3 className="text-base text-center font-medium mb-2">{character.name}</h3>

                  <EditCharacter
                    mangaId={manga._id}
                    characterId={character._id}
                    characterName={character.name}
                    characterPhotoUrl={character.photoUrl}
                    characterAge={character.age}
                    characterBiography={character.biography}
                    characterSpoiler={character.spoiler}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

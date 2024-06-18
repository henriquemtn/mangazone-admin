"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { auth } from "@/firebase/firebaseConfig";
import { User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

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

interface Volume {
  _id: string;
  volumeNumber: number;
  releaseDate: string;
  chapters: string[];
  imageUrl: string;
  volumeName: string;
  price?: number;
  link?: string;
}

interface Manga {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  volumes: Volume[];
}

interface CP {
  mangaUrl: string;
}

export default function MangaSearchById({ mangaUrl }: CP) {
  const [manga, setManga] = useState<Manga | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [titulo, setTitulo] = useState<string>("");
  const [autor, setAutor] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string>("");

  const [volumeNumber, setVolumeNumber] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [chapters, setChapters] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Buscar dados do Firestore usando o uid
      const fetchUserData = async () => {
        const db = getFirestore();
        const userRef = doc(db, "users", parsedUser.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const firestoreUserData = docSnap.data() as User;
            setUser(firestoreUserData);
          } else {
            console.error("Documento do usuário não encontrado");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(mangaUrl);
        if (!response.ok) {
          throw new Error("Erro ao buscar o manga");
        }
        const data = await response.json();
        setManga(data);
        setTitulo(data.title);
        setAutor(data.author);
        setGenero(data.genre);
        setPublishedYear(data.publishedYear);
        setImageURL(data.imageUrl);
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
      const response = await fetch(
        `https://api-mangazone.onrender.com/api/mangas/${manga?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titulo,
            author: autor,
            genre: genero,
            publishedYear: publishedYear,
            imageUrl: imageURL,
          }),
        }
      );

      if (!response.ok) {
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
      volumeNumber: volumeNumber,
      releaseDate: releaseDate,
      chapters: chapters,
      imageUrl: imageUrl,
      price: price,
      link: link,
    };

    try {
      const response = await fetch(
        `https://api-mangazone.onrender.com/api/mangas/${manga?._id}/volumes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(volumeData),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao adicionar o volume ao manga");
      }

      toast.success("Volume adicionado com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar volume:", error);
      toast.error("Erro ao adicionar volume. Tente novamente mais tarde.");
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
                Explore the captivating world of {manga.title}. Dive into the
                adventures crafted by {manga.author}.
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
                          onChange={(e) =>
                            setPublishedYear(Number(e.target.value))
                          }
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
                  .sort((a, b) => a.volumeNumber - b.volumeNumber)
                  .map((volume) => (
                    <TableRow key={volume._id}>
                      <TableCell className="font-medium">
                        {volume.volumeNumber}
                      </TableCell>
                      <TableCell>
                        <img
                          src={volume.imageUrl || "/placeholder.svg"}
                          alt={`Volume ${volume.volumeNumber} Cover`}
                          width={100}
                          height={150}
                        />
                      </TableCell>
                      <TableCell>{volume.volumeName}</TableCell>
                      <TableCell>R$ {volume.price}</TableCell>
                      <TableCell>
                        <EditVolumes
                          mangaId={manga._id}
                          volumeId={volume._id}
                          volumeNumberExisting={volume.volumeNumber}
                          releaseDateExisting={volume.releaseDate}
                          chaptersExisting={volume.chapters}
                          imageUrlExisting={volume.imageUrl}
                          priceExisting={volume.price}
                          linkExisting={volume.link}
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

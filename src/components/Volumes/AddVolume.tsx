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
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import axios from "axios";

interface CP {
    mangaId: String,
    mangaTitle: String,
}

export default function AddVolume({ mangaId, mangaTitle }: CP) {
  const [volumeNumber, setVolumeNumber] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isAlternativeCover, setIsAlternativeCover] = useState(false);
  const [chapters, setChapters] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

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
        `https://api-mangazone.onrender.com/api/mangas/${mangaId}/volumes`,
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Volume</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Adicionar informações do volume para {mangaTitle}
          </DialogTitle>
          <DialogDescription>
            Faça alterações nas informações do manga aqui. Clique em salvar
            quando terminar.
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
          <Button onClick={handleAddVolume}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

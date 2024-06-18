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

const EditVolumes = ({
  volumeId,
  mangaId,
  volumeNumberExisting,
  releaseDateExisting,
  chaptersExisting,
  imageUrlExisting,
  priceExisting,
  linkExisting,
  handleRemoveVolume,
}: any) => {
    const [volumeNumber, setVolumeNumber] = useState(volumeNumberExisting || "");
    const [releaseDate, setReleaseDate] = useState(releaseDateExisting || "");
    const [chapters, setChapters] = useState(chaptersExisting || "");
    const [imageUrl, setImageUrl] = useState(imageUrlExisting || "");
    const [price, setPrice] = useState(priceExisting || "");
    const [link, setLink] = useState(linkExisting || "");
  
    const handleChangeVolume = async (volumeId: string) => {
        // Dados do volume a ser modificado
        const volumeData = {
          volumeNumber: volumeNumber,
          releaseDate: releaseDate,
          chapters: chapters,
          imageUrl: imageUrl,
          price: price,
          link: link,
        };
      
        try {
          const response = await fetch(`https://api-mangazone.onrender.com/api/mangas/${mangaId}/volumes/${volumeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(volumeData),
          });
      
          if (!response.ok) {
            throw new Error('Falha ao modificar o volume do mangá');
          }
      
          toast.success('Informações do volume modificadas com sucesso!');
      
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error('Erro ao modificar o volume do mangá:', error);
          toast.error('Erro ao modificar informações do volume. Tente novamente mais tarde.');
        }
      };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Alterar Volume</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Alterar informações do Volume {volumeNumber}
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
          <Button
            variant="destructive"
            onClick={() => handleRemoveVolume(volumeId)}
          >
            Excluir Volume
          </Button>
          <Button onClick={() => handleChangeVolume(volumeId)}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditVolumes;

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

const DeleteArtist: React.FC = () => {
  const [artistId, setArtistId] = useState("");
  const router = useRouter();

  const handleDeleteArtist = async () => {
    if (!artistId) {
      toast.error("Por favor, insira o ID do artista.");
      return;
    }

    try {
      const response = await axios.delete(`https://api-mangazone.onrender.com/api/artists/${artistId}`);

      if (response.status === 200) {
        toast.success("Artista excluído com sucesso!");
        router.refresh(); // Atualiza a lista de artistas após a exclusão
      } else {
        toast.error(`Erro ao excluir artista: ${response.data.message}`);
      }
    } catch (error) {
      toast.error("Erro ao excluir artista. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Excluir Artista</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Excluir um Artista do banco de dados!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Excluir Artista</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Excluir Artista</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="artistId" className="text-right">
                  ID do artista
                </Label>
                <Input
                  id="artistId"
                  value={artistId}
                  onChange={(e) => setArtistId(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleDeleteArtist}>Excluir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DeleteArtist;

"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilePenIcon, TrashIcon } from "lucide-react";
import { Editora } from "@/types/types";
import toast from "react-hot-toast";

export default function GetEditoras() {
  const [search, setSearch] = useState("");
  const [editoras, setEditoras] = useState<Editora[]>([]);

  useEffect(() => {
    const fetchEditoras = async () => {
      try {
        const response = await axios.get(
          "https://api-mangazone.onrender.com/api/editoras"
        );
        setEditoras(response.data);
      } catch (error) {
        console.error("Failed to fetch editoras", error);
      }
    };

    fetchEditoras();
  }, []);

  const filteredData = useMemo(() => {
    return editoras.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, editoras]);

  const handleDelete = async (editoraId: string) => {
    try {
      const response = await axios.delete(
        `https://api-mangazone.onrender.com/api/editoras/${editoraId}`
      );

      if (response.status === 200) {
        toast.success("Editora excluída com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(`Erro ao excluir editora: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(
        "Erro ao excluir editora. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="border rounded-lg w-full mt-4">
      <div className="text-xl p-4 ">
        Editoras adicionadas:{" "}
        <span className="text-xl font-medium"> {editoras.length}</span>
      </div>
      <div className="px-4 pb-4 border-b">
        <Input
          type="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Ano de Lançamento</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sinceYear}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="icon" className="mr-2">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => handleDelete(item._id)}
                    variant="destructive"
                    size="icon"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

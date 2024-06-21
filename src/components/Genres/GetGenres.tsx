"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FilePenIcon, TrashIcon } from "lucide-react"
import { Genres } from "@/types/types"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function GetGenres() {
  const [search, setSearch] = useState("")
  const [genres, setGenres] = useState<Genres[]>([])
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://api-mangazone.onrender.com/api/genres") 
        setGenres(response.data)
      } catch (error) {
        console.error("Failed to fetch Genres", error)
      }
    }

    fetchGenres()
  }, [])

  const filteredData = useMemo(() => {
    return genres.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, genres])

  const handleDelete = async (genresId: string) => {
    try {
      const response = await axios.delete(`https://api-mangazone.onrender.com/api/genres/${genresId}`);

      if (response.status === 200) {
        toast.success("Gênero excluído com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
      } else {
        toast.error(`Erro ao excluir genres: ${response.data.message}`);
      }
    } catch (error) {
      toast.error("Erro ao excluir genres. Por favor, tente novamente mais tarde.");
    }
  }

  return (
    <div className="border rounded-lg w-full">
      <div className="p-4 border-b">
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
              <TableHead>Name</TableHead>   
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="icon" className="mr-2">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button onClick={() => handleDelete(item._id)} variant="destructive" size="icon">
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
  )
}
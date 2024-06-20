'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 
import { Manga } from "@/types/types";

const GetMangas: React.FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();
  const mangasPerPage = 4;

  useEffect(() => {
    const fetchMangasData = async () => {
      try {
        const response = await fetch("https://api-mangazone.onrender.com/api/mangas");
        if (!response.ok) {
          throw new Error("Erro ao buscar os mangás");
        }
        const data = await response.json();
        setMangas(data);
      } catch (error) {
        console.error("Erro ao buscar os mangás:", error);
      }
    };

    fetchMangasData();
  }, []);

  // Função para mudar para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Função para mudar para a página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Filtrar mangás com base no título
  const filteredMangas = mangas.filter((manga) =>
    manga.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Calcular índices de início e fim dos mangás na página atual
  const indexOfLastManga = currentPage * mangasPerPage;
  const indexOfFirstManga = indexOfLastManga - mangasPerPage;
  const currentMangas = filteredMangas.slice(indexOfFirstManga, indexOfLastManga);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Lista de Mangás</h1>

      {/* Campo de filtro */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar por título..."
        className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentMangas.map((manga) => (
          <div
            key={manga._id}
            className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={manga.imageUrl}
              alt={manga.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{manga.title}</h3>
              <p className="text-gray-500 mb-2">{manga.author}</p>
              <p className="text-gray-500 mb-2">{manga.genres}</p>
              <p className="text-gray-500 mb-2">
                Ano de publicação: {manga.releaseDate}
              </p>
              <Button
                onClick={() => router.push(`/mangas/${manga._id}`)}
                variant="outline"
              >
                Ver Detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-200 text-gray-600 rounded-lg disabled:bg-gray-300 disabled:text-gray-400"
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={currentMangas.length < mangasPerPage || currentMangas.length === 0}
          className="px-4 py-2 ml-2 bg-gray-200 text-gray-600 rounded-lg disabled:bg-gray-300 disabled:text-gray-400"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default GetMangas;

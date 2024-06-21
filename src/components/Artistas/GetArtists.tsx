'use client';

import * as React from "react";
import { useEffect, useState } from "react";
import { fetchArtists } from "@/api/fetchArtists"; 
import { Artist } from "@/types/types";
import TableActors from "./TableActors";

const GetArtists: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actors, setActors] = useState<Artist[]>([]); // Corrigido para 'actors' ao invés de 'artists'

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const fetchedActors = await fetchArtists();
        setActors(fetchedActors);
        setLoading(false);
      } catch (error) {
        setError("Erro ao buscar artistas. Por favor, tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return <TableActors actors={actors} />;
};

export default GetArtists;

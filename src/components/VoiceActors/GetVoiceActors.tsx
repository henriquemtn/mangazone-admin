'use client';

import * as React from "react";
import { useEffect, useState } from "react";
import TableActors from "./TableActors";
import { fetchVoiceActors } from "@/api/voiceActors"; 
import { VoiceActor } from "@/types/types";

const GetVoiceActors: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actors, setActors] = useState<VoiceActor[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const fetchedActors = await fetchVoiceActors();
        setActors(fetchedActors);
        console.log(actors)
        setLoading(false);
      } catch (error) {
        setError("Erro ao buscar dubladores. Por favor, tente novamente mais tarde.");
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

export default GetVoiceActors;
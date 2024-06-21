"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Characters } from "@/types/types";
import Image from "next/image";
import EditCharacter from "./EditCharacter";

interface CP {
  mangaId: string,
}

const CharacterDetails = ({mangaId}: CP) => {
  const [character, setCharacter] = useState<Characters | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          "https://api-mangazone.onrender.com/api/mangas/667280ca580cccf31669f0e6/characters/6672825c580cccf31669f0f6"
        );
        setCharacter(response.data.character);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
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
      <h3 className="text-base text-center font-medium mb-2">
        {character.name}
      </h3>

      <EditCharacter
        mangaId={mangaId}
        characterId={character._id}
        characterName={character.name}
        characterPhotoUrl={character.photoUrl}
        characterAge={character.age}
        characterBiography={character.biography}
        characterSpoiler={character.spoiler}
      />
    </div>
  );
};

export default CharacterDetails;

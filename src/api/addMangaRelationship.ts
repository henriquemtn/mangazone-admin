import axios from 'axios';
import { getAuthorIdByName } from './getAuthorIdByName';

interface MangaRelationship {
  mangaId: string;
}

export const addMangaRelationship = async (authorName: string, mangaId: string) => {
  try {
    // Obtém o authorId com base no authorName
    const authorId = await getAuthorIdByName(authorName);

    // Adiciona a relação de manga ao artista usando o authorId obtido
    const response = await axios.put(
      `https://api-mangazone.onrender.com/api/artists/${authorId}/addMangaRelationship`,
      { mangaId }
    );
    
    if (!response.data.artist) {
      throw new Error("Falha ao adicionar relação de mangá ao artista");
    }
    
    return response.data.artist;
  } catch (error) {
    console.error("Erro ao adicionar relação de mangá ao artista:", error);
    throw new Error("Erro ao adicionar relação de mangá ao artista. Tente novamente mais tarde.");
  }
};

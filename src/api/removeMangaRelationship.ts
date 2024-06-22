import axios from 'axios';
import { getAuthorIdByName } from './getAuthorIdByName';

export const handleRemoveMangaRelationship = async (authorName: string, mangaId: string) => {
  try {
    // Obter o ID do autor pelo nome
    const authorId = await getAuthorIdByName(authorName);

    // Remover o relacionamento de mangá do artista
    const response = await axios.put(`https://api-mangazone.onrender.com/api/artists/${authorId}/removeMangaRelationship`, {
      mangaId
    });

    if (!response.data.artist) {
      throw new Error('Falha ao remover relação de mangá do artista');
    }

    console.log('Relação de mangá removida com sucesso:', response.data.artist);
    return response.data.artist;
  } catch (error) {
    console.error('Erro ao remover relação de mangá do artista:', error);
    throw new Error('Erro ao remover relação de mangá do artista. Tente novamente mais tarde.');
  }
};
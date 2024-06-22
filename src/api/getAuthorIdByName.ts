import axios from 'axios';

export const getAuthorIdByName = async (authorName: string): Promise<string | null> => {
  try {
    const response = await axios.get(
      `https://api-mangazone.onrender.com/api/artists/name/${encodeURIComponent(authorName)}`
    );
    if (response.data._id) {
      return response.data._id;
    } else {
      throw new Error("Autor não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar autor:", error);
    throw new Error("Erro ao buscar autor. Tente novamente mais tarde.");
  }
};

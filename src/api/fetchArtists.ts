import { Artist } from "@/types/types";
import axios from "axios";

export const fetchArtists = async () => {
  try {
    const response = await axios.get<Artist[]>("https://api-mangazone.onrender.com/api/artists");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dubladores:", error);
    throw error;
  }
};
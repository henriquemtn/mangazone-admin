import { VoiceActor } from "@/types/types";
import axios from "axios";

export const fetchVoiceActors = async () => {
  try {
    const response = await axios.get<VoiceActor[]>("https://api-mangazone.onrender.com/api/voiceActors");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dubladores:", error);
    throw error;
  }
};
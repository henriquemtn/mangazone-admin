export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  biography?: string;
  gender?: string;
  photoURL?: string;
  location?: string;
  favorites?: string[];
  characters?: string[];
  people?: string[];
  comments?: string[];
  friends?: string[];
  wishlist?: string[];
  mangaCollection?: string[];
  role?: string;
}

export interface EditUserProps {
  displayName: string;
  username: string;
  biography: string;
  gender: string;
  photoURL: string;
  location: string;
};

export interface Manga {
  _id: string;
  imageUrl: string;
  title: string;
  alternativeTitles: string;
  author: string;
  synopsis: string;
  genres: string;
  publisherBy: string;
  score: number;
  releaseDate: string;
}

export interface ModifyManga {
  mangaId: string;
  mangaTitle: string;
  M_imageUrl: string;
  M_title: string;
  M_alternativeTitles: string;
  M_author: string;
  M_synopsis: string;
  M_genres: string;
  M_publisherBy: string;
  M_score: number;
  M_releaseDate: string;
}

export interface DubCharacter {
  _id: string;
  mangaId: string;
  charactersId: string[];
}

export interface VoiceActor {
  _id: string;
  name: string;
  photoUrl: string;
  birthday: string;
  nationality: string;
  favorites: string[];
  biography: string;
  dubCharacters: DubCharacter[];
  __v: number;
}

export interface Characters {
  _id: string;
  name: string;
  photoUrl: string;
  spoiler: string;
  age: number;
  biography: string;
  voiceActors: string[];
}


export interface EditCharacter {
  characterId: string;
  mangaId: string;
  characterName: string;
  characterPhotoUrl: string;
  characterAge: number;
  characterBiography: string;
  characterSpoiler: string;
}
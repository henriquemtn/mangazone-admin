export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  biography?: string;
  photoURL?: string;
  location?: string;
  favorites?: string[];
  characters?: string[];
  people?: string[];
  comments?: string[];
  friends?: string[];
  wishlist?: string[];
  role?: string;
}

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

export interface VoiceActor {
  _id: string;
  name: string;
  photoUrl: string;
  birthday: string;
  nationality: string;
  favorites: string[];
  biography: string;
  dubCharacters: string[];
  __v: number;
}
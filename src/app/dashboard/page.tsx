import AddArtist from "@/components/Artistas/AddArtist";
import AddManga from "@/components/Mangas/AddManga";
import GetMangas from "@/components/Mangas/GetMangas";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <AddManga />
          <AddArtist />
        </div>
      </div>
      <GetMangas />
    </div>
  );
}

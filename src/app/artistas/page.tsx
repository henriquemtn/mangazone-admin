import AddArtist from "@/components/Artistas/AddArtist";
import DeleteArtist from "@/components/Artistas/DeleteArtist";
import GetArtists from "@/components/Artistas/GetArtists";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function ArtistasPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <AddArtist />
          <DeleteArtist />
        </div>
        <GetArtists />
      </div>
    </div>
  );
}

import AddArtista from '@/components/Artistas/AddArtista'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export default function ArtistasPage() {
    return (
        <div>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <AddArtista />
          </div>
        </div>
      )
    }
    
import Navbar from '@/components/Navbar/Navbar'
import GetVoiceActors from '@/components/VoiceActors/GetVoiceActors'
import React from 'react'

export default function ArtistasPage() {
    return (
        <div>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <GetVoiceActors />
          </div>
        </div>
      )
    }
    
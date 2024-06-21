import Navbar from '@/components/Navbar/Navbar'
import AddVoiceActor from '@/components/VoiceActors/AddVoiceActor'
import GetVoiceActors from '@/components/VoiceActors/GetVoiceActors'
import React from 'react'

export default function ArtistasPage() {
    return (
        <div>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <AddVoiceActor />
            <GetVoiceActors />
          </div>
        </div>
      )
    }
    
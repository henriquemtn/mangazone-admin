import GetGenres from '@/components/Genres/GetGenres'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export default function GenresPage() {
  return (
    <div className="w-full">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
        <GetGenres />
    </div>
  </div>
  )
}

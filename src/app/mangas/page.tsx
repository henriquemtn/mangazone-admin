import AddManga from '@/components/Mangas/AddManga'
import GetMangas from '@/components/Mangas/GetMangas'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export default function MangaMainPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <AddManga />
      </div>
      <GetMangas />
    </div>
  )
}

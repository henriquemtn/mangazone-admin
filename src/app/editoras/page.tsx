import GetEditoras from '@/components/Editoras/GetEditoras'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export default function EditorasPage() {
  return (
    <div className="w-full">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
        <GetEditoras />
    </div>
  </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { getMovieById } from "@/lib/movie-data"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function LikedMoviesPage() {
  const [likedMovies, setLikedMovies] = useState<any[]>([])

  useEffect(() => {
    // Pega os IDs dos filmes curtidos do localStorage
    const likedMoviesIds = JSON.parse(localStorage.getItem("likedMovies") || "[]")

    // Busca os detalhes de cada filme
    const movies = likedMoviesIds.map((id: string) => getMovieById(id)).filter(Boolean)

    setLikedMovies(movies)
  }, [])

  return (
    <div className="min-h-screen bg-white p-4">
        <div className="mb-6">
          <Link href="/homepage" className="inline-flex items-center text-[#e31010] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      <h1 className="text-3xl font-bold text-[#e31010] mb-6">Filmes Curtidos</h1>

      {likedMovies.length === 0 ? (
        <p>Nenhum filme curtido ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {likedMovies.map((movie) => (
            <div key={movie.id} className="bg-[#d9d9d9] p-2">
                <Link href={`/filme/${movie.id}`} className="text-[#e31010] hover:underline">
                    <div className="aspect-[2/3] relative">
                        <Image src={movie.posterUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                    </div>
                    <h2 className="text-lg font-bold mt-2">{movie.title}</h2>    
                </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

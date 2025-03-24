"use client"

import { getMovieById } from "@/lib/movie-data"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Heart, ArrowLeft, Play } from "lucide-react"

export default function MoviePage({ params }: { params: { id: string } }) {
  const movieId = params.id
  const movie = getMovieById(movieId)

  // Estado para controlar se o filme foi curtido
  const [liked, setLiked] = useState(false)

  // Ao carregar a página, verificar no localStorage se o filme foi curtido antes
  useEffect(() => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]")
    setLiked(likedMovies.includes(movieId))
  }, [movieId])

  // Função para curtir/descurtir um filme e salvar no localStorage
  const toggleLike = () => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]")

    if (liked) {
      // Se já estava curtido, remover do array
      const updatedLikes = likedMovies.filter((id: string) => id !== movieId)
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes))
    } else {
      // Se não estava curtido, adicionar ao array
      likedMovies.push(movieId)
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies))
    }

    setLiked(!liked)
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Filme não encontrado</h1>
        <Link href="/" className="text-[#e31010] hover:underline">Voltar para a página inicial</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-[#e31010] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="bg-[#d9d9d9] p-2">
            <div className="aspect-[2/3] relative">
              <Image
                src={movie.posterUrl || "/placeholder.svg"}
                alt={`${movie.title} movie poster`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#e31010] mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <div className="flex items-center">
                <span className="mr-1">★</span>
                <span>{movie.rating}/5</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold mb-1">Sinopse:</h2>
              <p>{movie.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-[#e31010] text-white px-6 py-3 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Assistir
              </button>

              <button
                className={`border px-6 py-3 flex items-center gap-2 ${
                  liked ? "bg-[#e36161] text-white border-[#e36161]" : "border-[#e31010] text-[#e31010]"
                }`}
                onClick={toggleLike}
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-white" : ""}`} />
                {liked ? "Curtido" : "Curtir"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

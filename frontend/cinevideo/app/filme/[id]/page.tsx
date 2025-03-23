"use client"

import { getMovieById } from "@/lib/movie-data"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Heart, ArrowLeft, Play } from "lucide-react"

export default function MoviePage({ params }: { params: { id: string } }) {
  // Obtém o ID do filme da URL
  const movieId = params.id
  // Busca os detalhes do filme pelo ID
  const movie = getMovieById(movieId)
  // Estado para controlar se o filme foi curtido
  const [liked, setLiked] = useState(false)

  // Se o filme não for encontrado, exibe uma mensagem de erro
  if (!movie) {
    return (
      <div className="min-h-screen bg-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Filme não encontrado</h1>
        <Link href="/" className="text-[#e31010] hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    )
  }

  // Mapeamento de IDs de gênero para nomes em português
  const genreNames: Record<string, string> = {
    acao: "Ação",
    aventura: "Aventura",
    terror: "Terror",
    suspense: "Suspense",
    romance: "Romance",
    comedia: "Comédia",
    drama: "Drama",
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
          {/* Poster do filme */}
          <div className="bg-[#d9d9d9] p-2">
            <div className="aspect-[2/3] relative">
              {/* AQUI É ONDE VOCÊ COLOCA A IMAGEM DO FILME */}
              <Image
                src={movie.posterUrl || "/placeholder.svg"}
                alt={`${movie.title} movie poster`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Detalhes do filme */}
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

            {/* Gêneros do filme */}
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Gêneros:</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Link key={genre} href={`/genero/${genre}`} className="bg-[#fff2f2] text-[#e31010] px-3 py-1 text-sm">
                    {genreNames[genre] || genre}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sinopse do filme */}
            <div className="mb-6">
              <h2 className="font-semibold mb-1">Sinopse:</h2>
              <p>{movie.description}</p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-[#e31010] text-white px-6 py-3 flex items-center gap-2"
                onClick={() => alert("Iniciando reprodução...")}
              >
                <Play className="h-5 w-5" />
                Assistir
              </button>

              <button
                className={`border px-6 py-3 flex items-center gap-2 ${
                  liked ? "bg-[#e36161] text-white border-[#e36161]" : "border-[#e31010] text-[#e31010]"
                }`}
                onClick={() => setLiked(!liked)}
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


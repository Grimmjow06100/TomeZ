"use client"
import { useState, useEffect } from 'react'
import {MangaGrid} from '@/components/Manga'
import NavBar from '@/components/navBar'
import { MangaProps } from '@/types/interface'

const fetcher = (url: string,init?: RequestInit) => fetch(url,init).then((res) => res.json())

const Recherche = () => {
  const [mangas, setMangas] = useState<MangaProps[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({searchTerm})
        }
        const { mangasResearched } = await fetcher("/api/research",init)
        setMangas(mangasResearched) // Met à jour `manga` avec les mangas récupérés
    }
    fetchData()
  }, [searchTerm])

  return (
    <>
      <NavBar/>
      <div className="w-full h-full flex flex-col mt-40 items-center justify-center text-white">
        <div className="w-[180vh] ">
          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Rechercher un manga..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full m-10 p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Affichage de la liste filtrée de mangas */}
        {mangas && mangas.length > 0 ? (
          <MangaGrid list={mangas} />
        ) : (
          <p>Aucun manga trouvé.</p> // Message affiché si aucun manga n'est trouvé
        )}
      </div>
    </>
  )
}

export default Recherche
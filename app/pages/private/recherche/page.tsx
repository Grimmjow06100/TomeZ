"use client"
import { useState, useEffect } from 'react'
import MangaList from '@/components/personal/MangaList'
import NavBar from '@/components/personal/navBar'

interface MangaProps {
  cover: string;
  inMyList: boolean;
  name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Recherche = () => {
  const [username, setUsername] = useState('')
  const [filteredManga, setFilteredManga] = useState<MangaProps[]>([]) 
  const [manga, setManga] = useState<MangaProps[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { list, username } = await fetcher("/api/manga/listes")
      setUsername(username)
      setManga(list) // Met à jour `manga` avec les mangas récupérés
    }
    fetchData()
  }, []) // Cette useEffect ne dépend que du premier chargement des données

  useEffect(() => {
    if (searchTerm === '') {
      // Si aucun terme de recherche n'est saisi, réinitialiser la liste filtrée avec tous les mangas
      setFilteredManga([])
    } else {
      const filtered = manga.filter((manga) =>
        manga.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      
      setFilteredManga(filtered)
    }
  }, [searchTerm, manga]) // Dépend uniquement de `searchTerm` et `manga`, pas de `filteredManga`

  return (
    <>
      <NavBar username={username} />
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
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
        {filteredManga && filteredManga.length > 0 ? (
          <MangaList list={filteredManga} />
        ) : (
          <p>Aucun manga trouvé.</p> // Message affiché si aucun manga n'est trouvé
        )}
      </div>
    </>
  )
}

export default Recherche

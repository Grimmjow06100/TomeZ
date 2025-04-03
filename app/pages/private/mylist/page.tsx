"use client"
import { useState, useEffect } from 'react'
import MangaList from '@/components/personal/MangaList'
import NavBar from '@/components/personal/navBar';
import NavBarSkeleton from '@/components/skeleton/navBarSkeleton';

interface MangaProps{ 
  cover: string;
  inMyList: boolean;
}

const MyList = () => {
  const [myList, setMyList] = useState<MangaProps[]>([]);
  const [user, setUser] = useState<string>(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/manga/listes/MyList");
        const data = await res.json();

        // Vérification que username est bien une chaîne de caractères
        const username = typeof data.username === "string" ? data.username : JSON.stringify(data.username);

        setMyList(data.myList);
        setUser(username); 
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Barre de navigation */}
      {user ? <NavBar username={user} /> : <NavBarSkeleton />}
       
      {/* Affichage de la liste des mangas, ou message si vide */}
      {myList.length === 0 ? (
        <h1 className="text-gray-700 italic text-5xl m-10">Aucun Manga dans MyList</h1>
      ) : (
        <MangaList list={myList} /> 
      )}
    </div>
  );
};

export default MyList;

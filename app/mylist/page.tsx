"use client"
import { useState, useEffect } from 'react'
import {MangaGrid} from '@/components/personal/Manga'
import NavBar from '@/components/personal/navBar';
import { MangaProps } from '@/lib/interface';
import {safeParse} from '@/lib/utils'


const MyList = () => {
  const [myList, setMyList] = useState<MangaProps[]>([]);
  
  useEffect(( ) => {
      const raw = localStorage.getItem('mylist');
      const list= safeParse<string[]>(raw,[]);
      if(list.length === 0){
        setMyList([])
      }

      else {

        const fetchData={
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body:JSON.stringify({list:list})
          }
  
        
        fetch("/api/MyList",fetchData)
        .then((res) =>
          res.json()
          .then((data) => {
            setMyList(
              data.mangas
            )
            console.log(data.mangas)
          })
        )
      }
  },[])

  return (
    <>
      <NavBar></NavBar>
      <div className='w-auto h-auto mt-40 ml-10 mr-10 '>
        
          {/* Affichage de la liste des mangas, ou message si vide */}
          {myList.length === 0 ? (
            <h1 className="text-gray-700 italic text-3xl ">Aucun Manga dans MyList</h1>
          ) : (
            <MangaGrid list={myList} /> 
          )}
      </div>
    </>
  );
};

export default MyList;
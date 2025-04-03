"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  src: string;
  width: number;
  height: number;
  name:string;
  numero:number; 
  deleteOption?:{
    handler:(index: number) => void
    index:number
  }

}


async function updateHistorique(body: { mangaName: string; numero: number }) {
  try {
      const options = {
          method:"PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      };
      const response = await fetch("/api/manga/historique/update", options);

      if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Erreur lors de la requête API:", error);
      return null;
  }
}





function Tome({ src, width, height, numero, name, deleteOption }: Props) {

  const [isHovered, setHovered] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      >
        < div className="flex flex-col items-center relative" style={{ width: `${width}px`, height: `${height}px` }}
          
        >
            <Link onClick={() => updateHistorique({ mangaName: name, numero: numero })} href={`/pages/private/lecture/${name}/${numero}`}>
              <Image
                src={src}
                alt={`tome-${numero}`}
                fill
                priority
                className={`object-cover rounded-lg ${isHovered ? "outline-white scale-110 outline-4 transform transition-transform duration-600" : ""}`} />
              
            </Link>
        </div>
        {deleteOption && isHovered && (
          <button onClick={()=> deleteOption.handler(deleteOption.index)} className='flex justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 mt-5'>
            <Image
              src="/trash.png"
              alt="delete-icon"
              width={25}
              height={25}
              className="invert "
            />
          </button>
        )}
      </div>
    </>


  );
}

export default Tome;

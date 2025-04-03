"use client"
import { useState, useEffect } from 'react';
import { motion,AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import MangaWindow from './MangaWindow';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { createPortal } from "react-dom";

interface Props {
  src: string;
  width: number;
  height: number;
  index: number;
  inMyList: boolean;
}
interface MangaData{
  name: string;
  covers: string[];
  description: string;
  tags: string[];
  historique:{
        tomeNumero: number;
        lastPage: number | null;
    } | null;

}

async function createHistorique(body: {mangaName: string; numero: number }) {
  try {
      const options = {
          method:"PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      };
      const response = await fetch("/api/manga/historique/create", options);

      if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Erreur lors de la requête API:", error);
      return null;
  }
}
const Manga = ({ src, width, height, index,inMyList }: Props) => {
  const [mangaOpen, setMangaOpen] = useState(false);
  const [mangaData, setMangaData] = useState<MangaData | undefined>(undefined);
  const [isHovered, setHovered] = useState(false);
  const decodedSrc = decodeURIComponent(src);

  const modal = () => {
    if (typeof document === "undefined") return null; // ⚠️ Vérification côté serveur
  
    return createPortal(
      <AnimatePresence>
        {mangaOpen && (
          <div
            style={{ background: 'rgba(0,0,0,0.75)' }}
            className="fixed inset-0 flex justify-center items-start overflow-y-auto z-50"
            onClick={closeModal}
          >
            <motion.div
              className="bg-[#141414] p-10 flex flex-col rounded-lg w-250 mt-20 overflow-auto z-10"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.4 }}
              layout
            >
              {mangaData && <MangaWindow
                src={src}
                index={index}
                covers={mangaData.covers}
                tags={mangaData.tags}
                name={mangaData.name}
                description={mangaData.description}
                inMyList={inMyList}
              />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body // 🔥 Assure que `document.body` existe avant de l'utiliser
    );
  };

  const openModal = () => {
    setMangaOpen(true);
    // Désactiver le scroll du body uniquement lorsque la modale est ouverte
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setMangaOpen(false);
    // Réactiver le scroll du body lorsque la modale est fermée
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {

    fetch('/api/manga/mangaWindow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cover:src
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMangaData(data);
    })

    // Réinitialiser le scroll du body au cas où le composant serait démonté
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [src]);


 

  return (
    <>
      <div className='flex flex-col items-center justify-center '
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        {mangaData ?  (
          <div 
            className="flex flex-col items-center relative"  style={{ width: `${width}px`, height: `${height}px` }}>
            <Link 
                onClick={()=>{if(!mangaData.historique) createHistorique({mangaName:mangaData.name,numero:1})}}
                href={`/pages/private/lecture/${mangaData.name}/${mangaData.historique?.tomeNumero || 1}`}>
              <Image
                src={src}
                alt={`manga-${index}`}
                fill
                priority
                className={`object-cover rounded-lg ${isHovered ? "outline-white scale-110 outline-4 transform transition-transform duration-600" : ""}`}
              />
            </Link>
          </div>
        ):<Skeleton key={index} className='w-[220px] h-[320px] bg-zinc-700 rounded-lg'/>}
        {isHovered &&(
            <button onClick={openModal} className='flex justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 mt-4'>
              <Image src="/down-arrow.png" alt="logo" width={50} height={50} className="invert" />
            </button>

        )}
      </div>
      {mangaOpen && mangaData && modal()}
    </>
  );
};

export default Manga;

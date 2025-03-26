import { useState, useEffect } from 'react';
import { motion,AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import MangaWindow from './MangaWindow';
import Link from 'next/link';

interface Props {
  src: string;
  width: number;
  height: number;
  index: number;
}
interface MangaData{
  name: string;
  covers: string[];
  description: string;
  tags: string[];

}

const Manga = ({ src, width, height, index }: Props) => {
  const [mangaOpen, setMangaOpen] = useState(false);
  const [mangaData, setMangaData] = useState<MangaData | undefined>(undefined);
  const [isHovered, setHovered] = useState(false);

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
        cover: src,
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
      {mangaData && (
         <div 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex flex-col items-center `} style={{ width: `${width}px`, height: `${height}px` }}>
          <Link href={`/private/lecture/${mangaData.name}/${1}`}>
            <Image
              src={src}
              alt={`manga-${index}`}
              width={width}
              height={height}
              className={`duration-200 h-full w-full object-cover rounded-lg ${isHovered ? " outline-white scale-110 outline-4 transform transition-transform duration-300" : ""}`}
            />
          </Link>
          {isHovered &&(
            <button onClick={openModal} className='flex justify-center items-center w-full opacity-50 hover:opacity-100 transition-opacity duration-300 mt-4'>
              <Image src="/down-arrow.png" alt="logo" width={70} height={70} className="invert" />
            </button>

          )}
    </div>
      )}
      <AnimatePresence>
          {mangaOpen && mangaData && (
            // Fenêtre modale
            <div
                style={{ background: 'rgba(0,0,0,0.75)' }}
                className="fixed inset-0 flex justify-center items-start overflow-y-auto z-50 "
                onClick={closeModal}
              >
                <motion.div
                  className="bg-[#141414] p-10 flex flex-col rounded-lg w-250 mt-20 overflow-auto z-10"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0}}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                <MangaWindow src={src} index={index} covers={mangaData.covers} tags={mangaData.tags} name={mangaData.name} description={mangaData.description} />

              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </>
  );
};

export default Manga;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MangaWindow from './MangaWindow';

interface Props {
  src: string;
  width: string;
  height: string;
  index: number;
}

const Manga = ({ src, width, height, index }: Props) => {
  const [mangaOpen, setMangaOpen] = useState(false);

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
    // Réinitialiser le scroll du body au cas où le composant serait démonté
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const widthNumber = parseInt(width);
  const heightNumber = parseInt(height);

  return (
    <div className="flex-shrink-0" style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        onClick={openModal}
        src={src}
        alt={`manga-${index}`}
        width={widthNumber}
        height={heightNumber}
        className="w-full h-full object-cover duration-200 rounded-lg hover:outline-4 hover:outline-white transform transition-transform duration-300 hover:scale-110"
      />

      {mangaOpen && (
        // Fenêtre modale
        <div
            style={{ background: 'rgba(0,0,0,0.75)' }}
            className="fixed inset-0 flex justify-center items-start overflow-y-auto z-50 scrollbar scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-900"
            onClick={closeModal}
          >
            <motion.div
              className="bg-[#141414] p-10 flex flex-col rounded-lg w-250  min-h-[2000px] mt-20 overflow-auto z-10"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0}}
              animate={{ scale: 1 }}
              transition={{ duration: 1.0 }}
            >
            <MangaWindow src={src} index={index} />

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Manga;

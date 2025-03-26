import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Manga from '@/components/personal/Manga';



interface MangaBanderoleProp {
  list: string[];  
}


const MangaBanderole = ({list}:MangaBanderoleProp) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = list.length;
    const [displayedImages, setDisplayedImages] = useState(
      list.slice(0, 6)
    );
  
    // Met à jour les images affichées lorsque currentIndex change
    useEffect(() => {
      const newDisplayedImages =
        currentIndex + 7 > totalImages
          ? list
              .slice(currentIndex)
              .concat(list.slice(0, (currentIndex + 7) % totalImages))
          : list.slice(currentIndex, currentIndex + 7);
  
      setDisplayedImages(newDisplayedImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);
  
    const handleNext = () => {
      setCurrentIndex(currentIndex + 1>=totalImages?0:currentIndex + 1);
    };
    
    const handlePrev = () => {
      setCurrentIndex(currentIndex-1<0?totalImages-1:currentIndex-1);
  
    };
    
  
    return (
      <div className="h-120 w-full flex flex-col relative">
      <div className="h-120 w-full flex items-center relative">
        {/* Flèche gauche */}
        <button
          onClick={handlePrev}
          className="flex w-15 h-full items-center opacity-50 hover:opacity-100 z-1 transition-opacity duration-300 absolute left-0"
        >
          <Image src="/left-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
  
        {/* Conteneur des images */}
        <div className="flex w-full h-full items-center justify-center gap-x-5 "
        >
          
          {displayedImages.map((src, index) => (
              <Manga key={index} src={src} width={220} height={320} index={index}  />
          ))}
        </div>
  
        {/* Flèche droite */}
        <button
          onClick={handleNext}
          className="flex w-15 h-full items-center opacity-50 hover:opacity-100 z-1 transition-opacity duration-300 absolute right-0"
        >
          <Image src="/right-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
      </div>
      </div>
    );
}

export default MangaBanderole
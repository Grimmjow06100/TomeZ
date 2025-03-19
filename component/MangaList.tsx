import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Manga from './Manga';


export enum Type{
  Manga,
  Tome
}

export interface MangaListProps {
    title: string|undefined,
    list: string[],
    type?: Type,
    parameters: {width:string,height:string,imagesPerPage:number}, 
}

const MangaList = ({title,list,parameters,type} : MangaListProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = list.length;
    const [displayedImages, setDisplayedImages] = useState(
      list.slice(0, parameters.imagesPerPage)
    );
  
    // Met à jour les images affichées lorsque currentIndex change
    useEffect(() => {
      const newDisplayedImages =
        currentIndex + parameters.imagesPerPage > totalImages
          ? list
              .slice(currentIndex)
              .concat(list.slice(0, (currentIndex + parameters.imagesPerPage) % totalImages))
          : list.slice(currentIndex, currentIndex + parameters.imagesPerPage);
  
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
      <div className="h-90 w-full flex flex-col relative">
      { title && <h1 className="text-white text-3xl  ml-15">{title}</h1>}
      <div className="h-80 w-full flex items-center relative">
        {/* Flèche gauche */}
        <button
          onClick={handlePrev}
          className="flex w-15 h-full items-center opacity-50 hover:opacity-100 transition-opacity duration-300 absolute left-0"
        >
          <Image src="/left-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
  
        {/* Conteneur des images */}
        <div className="flex w-full h-full items-center justify-center gap-x-5 overflow-hidden">
          {displayedImages.map((src, index) => (
              <Manga key={index} src={src} width={"180"} height={"280"} index={index} info={{ name: "aucun", numero: undefined }} />
          ))}
        </div>
  
        {/* Flèche droite */}
        <button
          onClick={handleNext}
          className="flex w-15 h-full items-center opacity-50 hover:opacity-100 transition-opacity duration-300 absolute right-0"
        >
          <Image src="/right-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
      </div>
      </div>
    );
}

export default MangaList
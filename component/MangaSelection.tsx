import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Manga from './Manga';


export enum Type{
  Manga,
  Tome
}
interface MangaClassiquesProps {
  title: string;  
  list: string[]; 
}


const MangaSelection = ({title,list}:MangaClassiquesProps) => {

  return (
    <div className="flex flex-col h-125  w-full ">
      <div className='mx-auto'>
      {/* Alignement du titre à gauche */}
      <h1 className="text-white text-4xl pl-0">{title}</h1>
      
      {/* Conteneur des images avec flex aligné à gauche */}
      <div className="flex w-full h-full items-start justify-start gap-x-15 mt-8">
        {list.map((src, index) => (
          <Manga
            key={index}
            src={src}
            width="290"
            height="390"
            index={index}
          />
        ))}
      </div>
      </div>
    </div>
  );
}  

export default MangaSelection;
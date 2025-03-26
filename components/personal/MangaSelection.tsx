import React from 'react'
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
    <div className="flex flex-col h-140 w-full  ">
      <div className='flex flex-col w-full h-full items-start justify-center pl-25'> 
      {/* Alignement du titre à gauche */}
      <h1 className="text-white text-4xl ">{title}</h1>
      
      
      <div className="flex w-full h-full items-start justify-start gap-x-15 mt-8">
        {list.map((src, index) => (
          <Manga
            key={index}
            src={src}
            width={290}
            height={390}
            index={index}
          />
        ))}
          
      </div>
     
      </div>
    
    </div>
  );
}  

export default MangaSelection;
import React from 'react'
import { Skeleton } from '../ui/skeleton';




const MangaSelectionSkeleton = ({title}:{title:string}) => {

    const list = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="flex flex-col h-140 w-full  ">
      <div className='flex flex-col w-full h-full items-start justify-center pl-25'> 
      {/* Alignement du titre à gauche */}
      <h1 className="text-white text-4xl ">{title}</h1>
      <div className="flex w-full h-full items-start justify-start gap-x-15 mt-8">
        {list.map((_, index) => (
          <Skeleton
            key={index}
            className='w-[290px] h-[390px] bg-zinc-700 rounded-lg'
          />
        ))}
          
      </div>
     
      </div>
    
    </div>
  );
}  

export default MangaSelectionSkeleton;
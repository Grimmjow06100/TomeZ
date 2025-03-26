import React from 'react'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton';





const MangaBanderole = () => {

    const list = Array.from({ length: 7 }, (_, i) => i);

   
  
    return (
      <div className="h-120 w-full flex flex-col relative">
      <div className="h-120 w-full flex items-center relative">
        {/* Flèche gauche */}
        <button
          className="flex w-15 h-full items-center opacity-50 hover:opacity-100 z-1 transition-opacity duration-300 absolute left-0"
        >
          <Image src="/left-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
  
        {/* Conteneur des images */}
        <div className="flex w-full h-full items-center justify-center gap-x-5 "
        >
          
          {list.map((_, index) => (
              <Skeleton key={index} className='w-[220px] h-[320px] bg-zinc-700 rounded-lg '  />
          ))}
        </div>
  
        {/* Flèche droite */}
        <button
          className="flex w-15 h-full items-center opacity-50 hover:opacity-100 z-1 transition-opacity duration-300 absolute right-0"
        >
          <Image src="/right-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
      </div>
      </div>
    );
}

export default MangaBanderole
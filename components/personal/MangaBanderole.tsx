import React from 'react'
import Image from 'next/image'
import { useState,useRef } from 'react';
import Manga from '@/components/personal/Manga';





interface MangaBanderoleProp {
  list: {cover:string,inMyList:boolean}[]; 
  username:string; 
  title:string;
}



const MangaBanderole = ({list,username,title}:MangaBanderoleProp) => {

  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const scrollAmount = 229; // Largeur d'un item + marge
  const lastClickRef = useRef<number>(0);

  const scroll = (direction: "left" | "right") => {
    const now = Date.now();
    if (now - lastClickRef.current < 500) return; // Bloquer si moins de 500ms

    lastClickRef.current = now; // Mettre à jour le dernier clic
    if (trackRef.current) {
      const track = trackRef.current;
      const maxScroll = track.scrollWidth - track.clientWidth+9;

      let newPos = direction === "right" ? position - scrollAmount*5 : position + scrollAmount*5;
      newPos = Math.max(Math.min(newPos, 0), -maxScroll); // Empêcher de dépasser les limites

      setPosition(newPos);
      track.style.transform = `translateX(${newPos}px)`;
    }
      
  };
    
    return (
      <div className="relative w-full h-[430px] flex flex-col">
        {/* Flèche gauche */}
        {title && <h1 className="ml-10 text-white text-2xl">{title}</h1>}
        <button
           onClick={() => scroll("left")}
          className="flex w-15 h-full items-center opacity-0 hover:opacity-100 z-1 transition-opacity duration-300 absolute left-0"
        >
          <Image src="/left-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
  
        {/* Conteneur des images */}
        <div className="w-full h-full overflow-hidden ">
        
          <div  
          ref={trackRef}
          className="flex gap-9 transition-transform bg-black-500 duration-500 ease-in-out "
          style={{ transform: `translateX(${position}px)` , willChange: "transform" }}
          >
          {list.map((element, index) => (
            <div key={index} className=" w-[220px] h-[320px] mt-5 ml-10 " >
                <Manga key={index} src={element.cover} inMyList={element.inMyList} width={220} height={320} index={index}  />
            </div>
          ))}
          </div>
        </div>

  
        {/* Flèche droite */}
        <button
          onClick={() => scroll("right")}
          className="flex w-15 h-full items-center opacity-0 hover:opacity-100 z-1 transition-opacity duration-300 absolute right-0"
        >
          <Image src="/right-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
        </button>
      </div>
    );
}

export default MangaBanderole
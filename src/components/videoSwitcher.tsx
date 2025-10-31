import { VideosProps } from "@/types/interface";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'


export default function VideoSwitcher({list,interval}:VideosProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // commence le fade-out
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % list.length);
        setFade(true); // fade-in de la nouvelle vidéo
      }, 1200); // durée du fondu
    }, interval);

    return () => clearInterval(timer);
  }, [list,interval]);

  return (
    <>
       {list.map((video, index) => (
        <video
          key={video.mangaName}
          autoPlay
          loop
          muted
          src={video.videoName}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1200 ease-in-out ${
            index === current && fade ? "opacity-100 z-1" : "opacity-0 z-0"
          }`}
        />
      ))}
       <button 
          onClick={()=>{redirect(`/reading/${list[current].mangaName}/Tome1`)}}
          className="absolute bottom-20 left-20 h-20 w-50 text-2xl  z-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg outline-2
          transform transition-transform duration-200 hover:scale-110 active:scale-90 cursor-pointer
          ">Lire {list[current].mangaName}
      </button>
      {/* Overlay avec effet de fondu en bas */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent z-1 "></div>
    </>
  );
}

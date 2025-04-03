"use client"
import React from 'react'
import { useState,useEffect,useRef } from 'react';
import Tome from './Tome';
import Image from 'next/image';

interface Item{
    name:string;
    numero:number;
    cover:string;
}
 const Reading = ({list}:{
                    list:{name:string,numero:number,cover:string}[],
                    username:string }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setItems(list);
    }, [list]);
    const trackRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const scrollAmount = 159; // Largeur d'un item + marge
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
    }
    

    const handleDelete = (index:number) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
        const deleteItem = items[index];
        fetch("/api/manga/historique/delete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mangaName: deleteItem.name,
            }),
        })
    }

    return (
        <div className="relative w-full h-[360px] flex flex-col">
            <h1 className="ml-10 text-white text-2xl">En cours de lecture⏳ </h1>
            <button
                    onClick={() => scroll("left")}
                    className="flex w-15 h-full items-center opacity-0 hover:opacity-100 z-1 transition-opacity duration-300 absolute left-0"
            >
                <Image src="/left-arrow.png" alt="logo" width={35} height={35} className="invert mx-auto" />
            </button>
            <div className="w-full  h-full overflow-hidden justify-center items-center ">
                <div  
                    ref={trackRef}
                    className="flex gap-9 transition-transform  duration-500 ease-in-out h-full "
                    style={{ transform: `translateX(${position}px)` , willChange: "transform" }}
                >
                {items.map((element, index) => (
                    <div key={index} className=" w-[170px] h-[220px] mt-10 ml-10  " >
                        <Tome src={element.cover} name={element.name} width={170} height={220} numero={element.numero} deleteOption={{handler:handleDelete,index}} />
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
    )
}


export default Reading;


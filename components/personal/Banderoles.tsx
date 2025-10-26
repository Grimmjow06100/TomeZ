"use client"
import React from 'react'
import { useState,useEffect,useRef } from 'react';
import {Tome} from './Tome';
import Image from 'next/image';
import { StyledDiv } from './style';
import {Manga} from './Manga'
import { BanderoleMangaProps } from '@/lib/interface';

interface Item {
    name:string;
    numero:number;
    tome:string;
}



export const BanderoleTomes = ({list}:{
                    list:Item[],
                    width:number,
                    itemHeight:number
                }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setItems(list);
    }, [list]);
    const trackRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const lastClickRef = useRef<number>(0);
    
    const scroll = (direction: "left" | "right") => {
        const now = Date.now();
        const screenWidth = window.innerWidth;
        if (now - lastClickRef.current < 500) return; // Bloquer si moins de 500ms

        lastClickRef.current = now; // Mettre à jour le dernier clic
        if (trackRef.current) {
            const track = trackRef.current;
            const maxScroll = track.scrollWidth - track.clientWidth+9;

            let newPos = direction === "right" ? position - (screenWidth-(170*1.1+2*20))  : position + (screenWidth+(170*1.1+20));
            newPos = Math.max(Math.min(newPos, 0), -maxScroll); // Empêcher de dépasser les limites

            setPosition(newPos);
            track.style.transform = `translateX(${newPos}px)`;
        }
    }
    

    const handleDelete = (index:number) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));

    }

    return (
        <div className="relative w-screen h-auto flex flex-col">
            <h1 className="ml-10 text-white text-2xl">En cours de lecture⏳ </h1>
            <div
                    onClick={() => scroll("left")}
                    className="flex w-15 h-full items-center opacity-0 hover:opacity-100 z-1 transition-opacity duration-300 absolute left-0"
            >
                <Image src="/left-arrow.png" alt="logo" width={35} height={35} role="button" className="invert mx-auto cursor-pointer" />
            </div>
            <div className="w-full h-full  overflow-hidden justify-center items-center ">
                <StyledDiv  
                    ref={trackRef}
                    className="flex  transition-transform  duration-800 ease-in-out h-auto w-auto "
                    transform={`translateX(${position}px)`}
                >
                {items.map((element, index) => (
                    <div key={index} className=" w-auto h-auto  m-[20px]  " >
                        <Tome name={element.name} width={170} height={270} numero={element.numero} deleteOption={{handler:handleDelete,index}} />
                    </div>
                ))}
                </StyledDiv>
            </div>
            {/* Flèche droite */}
            <div
                onClick={() => scroll("right")}
                className="flex w-15 h-full items-center opacity-0 hover:opacity-100 z-1 transition-opacity duration-300 absolute right-0"
            >
                <Image src="/right-arrow.png" alt="logo" role="button"  width={35} height={35} className="invert mx-auto cursor-pointer" />
            </div>
        </div>
    )
}


export const BanderoleMangas = ({list,title}:BanderoleMangaProps) => {

    const trackRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const lastClickRef = useRef<number>(0);
    
    const scroll = (direction: "left" | "right") => {
        const now = Date.now();
        const screenWidth = window.innerWidth;
        if (now - lastClickRef.current < 500) return; // Bloquer si moins de 500ms

        lastClickRef.current = now; // Mettre à jour le dernier clic
        if (trackRef.current) {
            const track = trackRef.current;
            const maxScroll = track.scrollWidth - track.clientWidth+9;

            let newPos = direction === "right" ? position - (screenWidth-(220*1.1+2*20))  : position + (screenWidth+(220*1.1+20));
            newPos = Math.max(Math.min(newPos, 0), -maxScroll); // Empêcher de dépasser les limites

            setPosition(newPos);
            track.style.transform = `translateX(${newPos}px)`;
        }
    }
    
    return (
        <div className="relative w-screen h-auto flex flex-col">
            <h1 className="ml-10 text-white text-3xl">{title}</h1>
            <div
                    onClick={() => scroll("left")}
                    className="flex w-15 h-full items-center opacity-0 hover:opacity-100 z-1 transition-opacity duration-300 absolute left-0"
            >
                <Image src="/left-arrow.png" alt="logo" width={35} height={35} role="button" className="invert mx-auto cursor-pointer" />
            </div>
            <div className="w-full h-full  overflow-hidden justify-center items-center ">
                <StyledDiv  
                    ref={trackRef}
                    className="flex transition-transform  duration-800 ease-in-out h-auto w-auto "
                    transform={`translateX(${position}px)`}
                >
                {list.map((element, index) => (
                    <div key={index} className=" w-auto h-auto  m-[20px]  " >
                        <Manga key={index} {...element} />
                    </div>
                ))}
                </StyledDiv>
            </div>
            {/* Flèche droite */}
            <div
                onClick={() => scroll("right")}
                className="flex w-15 h-full items-center opacity-0 hover:opacity-100 z-1 transition-opacity duration-300 absolute right-0"
            >
                <Image src="/right-arrow.png" alt="logo" role="button"  width={35} height={35} className="invert mx-auto cursor-pointer" />
            </div>
        </div>
    )
}





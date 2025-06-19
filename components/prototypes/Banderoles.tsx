"use client"
import React from 'react'
import { useState,useEffect,useRef } from 'react';
import {Tome} from './Tome';
import Image from 'next/image';
import { StyledDiv } from '../personal/style';
import {Manga} from './Manga'

interface Item {
    mangaName:string;
    numero:number;
    tome:string;
}



export const BanderoleTomes = ({list,itemWidth,itemHeight}:{
                    list:Item[],
                    itemWidth:number,
                    itemHeight:number
                }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setItems(list);
    }, [list]);
    const trackRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const scrollAmount = itemWidth*1.1; // Largeur d'un item + marge
    const lastClickRef = useRef<number>(0);
    
    const scroll = (direction: "left" | "right") => {
        const now = Date.now();
        const screenWidth = window.innerWidth;
        if (now - lastClickRef.current < 500) return; // Bloquer si moins de 500ms

        lastClickRef.current = now; // Mettre à jour le dernier clic
        if (trackRef.current) {
            const track = trackRef.current;
            const maxScroll = track.scrollWidth - track.clientWidth+9;

            let newPos = direction === "right" ? position - (screenWidth-(itemWidth*1.1+2*20))  : position + (screenWidth+(itemWidth*1.1+20));
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
                        <Tome src={element.tome} mangaName={element.mangaName} width={itemWidth} height={itemHeight} numero={element.numero} deleteOption={{handler:handleDelete,index}} />
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


export const BanderoleMangas = ({list,title,itemWidth,itemHeight}:{
                    list:{manga:string}[],
                    title:string
                    itemWidth:number,
                    itemHeight:number
                }) => {
    const [items, setItems] = useState<{manga:string}[]>([]);

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

            let newPos = direction === "right" ? position - (screenWidth-(itemWidth*1.1+2*20))  : position + (screenWidth+(itemWidth*1.1+20));
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
                {items.map((element, index) => (
                    <div key={index} className=" w-auto h-auto  m-[20px]  " >
                        <Manga key={index} width={itemWidth} height={itemHeight} src={element.manga} ></Manga>
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





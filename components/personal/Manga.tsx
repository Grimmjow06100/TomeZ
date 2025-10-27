"use client"
import { useState, useEffect } from 'react';
import { motion,AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import {StyledDiv} from './style'
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { createPortal } from "react-dom";
import {TomeGrid} from './Tome';
import styled from "styled-components"
import AddToListButton from './addButton';
import { MangaProps } from '@/lib/interface';
import {MangaName} from './style'
import {IMAGE_BASE_URL} from '@/lib/constant'

const MangaWindow = ({description,tags,name,nbrtomes}:MangaProps) => {
  return (
    <>
        <div className='flex p-3 w-auto h-auto space-x-7 items-center'>
            <div className='flex flex-col w-130 items-center gap-y-5'>
                <Image
                    src={`${IMAGE_BASE_URL}/${name}/Tome1/1.png`}
                    alt={`manga`}
                    width={320}
                    height={420}
                    className="rounded-lg outline-white outline-4"
                />  
                <AddToListButton name={name} ></AddToListButton>
            </div> 
            <div className="flex flex-col w-full h-105 space-y-5">
                <div className="w-auto h-60">
                <MangaName>{name}</MangaName>
                </div>
                <div className='flex flex-col  w-auto min-h-55 '>
                    <h1 className="text-white font-bold text-2xl">Synopsis</h1>
                    <p className='text-gray-500 italic'>{description}</p>
                </div>
                <div className='flex flex-col h-full w-auto '>
                    <h1 className="text-white font-bold text-2xl">Genres</h1>
                    <div className="flex space-x-1"  >
            
                        <h1 className='text-gray-500 italic' >
                            {tags}
                        </h1>
                
                    </div>
                </div>
            </div>
        </div>
        <div className='flex mt-10  h-auto w-auto space-x-10'>
            <h1 className="
                    font-bold
                    text-2xl
                    relative 
                    text-white 
                    ">Tomes</h1>
        </div>
        <TomeGrid name={name} nbrtomes={nbrtomes} ></TomeGrid>
    </>
  )
}


export const Manga = ({ name,nbrtomes ,description,tags} : MangaProps ) => {
  const [mangaOpen, setMangaOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isClosing,setClosing] = useState(false);
    const handleClose = () => {
      setClosing(true);
      setTimeout(() => {
        setClosing(false); // utile si tu rouvres
        setMangaOpen(false);
      }, 250); // même durée que l'animation

    };
    function Modal() {
        return createPortal(
          <StyledDiv background='rgba(0,0,0,0.75)'
              className="fixed inset-0 flex justify-center items-start z-3"
              onClick={handleClose}
            >
              <div
                className={`bg-background opacity-90 p-10 flex flex-col  w-3/5  max-h-screen overflow-y-auto origin-top-left mt-20  z-4 ${
                isClosing ? 'animate-shrink' : 'animate-grow'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <MangaWindow
                  name={name}
                  tags='Indisponible'
                  description={description}
                  nbrtomes={nbrtomes}

              />
              </div>
            </StyledDiv>,
          document.body
        );
      }



  return (
    <>
       <StyledDiv width={220*1.1} height={320*1.1+75} className="flex flex-col items-center justify-start  relative pt-5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
           <StyledDiv width={220} height={320}  className="flex flex-col items-center relative "  >
            <Link 
                //onClick={()=>{if(!mangaData.historique) createHistorique({name:mangaData.name,numero:1})}}
                href={`/reading/${name}/Tome1`}>
              <Image
                src={`http://localhost:8080/mangas/${name}/Tome1/1.png`}
                alt={`manga`}
                role="button"
                fill
                priority
                className={`object-cover rounded-lg cursor-pointer transform transition-transform duration-300 ${
                  isHovered ? 'scale-110  outline-4 outline-white delay-150 ease-in' : 'ease-out'
                }`}

                    
                />
      
            </Link>
          </StyledDiv>      
        {isHovered &&(
           <div onClick={() => setMangaOpen(true)} className='w-30 flex justify-center opacity-50 cursor-pointer hover:opacity-100 transition-opacity duration-300 absolute bottom-3'>
              <Image src="/down-arrow.png" alt="logo" width={50} height={50} className="invert" />
            </div>

        )}
      </StyledDiv>
      {mangaOpen  && Modal()
         
       }
    </>
  );
};


export const MangaGrid= ( {list} :{ list : MangaProps[] }) => {
    return (
        <div className="grid grid-cols-6 gap-x-10">
          {list.map((element, index) => (
            <StyledDiv width={220*1.1} height={320*1.1+75}   key={index} className="flex items-center justify-center ">
              <Manga    {...element}  />
            </StyledDiv>
          ))}
        </div>
        
    );
  };
  

"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { TomeProps } from '@/lib/interface';
import { StyledDiv } from './style';
import {IMAGE_BASE_URL}  from '@/lib/constant';


export const Tome = ({ width, height, numero, name, deleteOption }: TomeProps) => {

  const [isHovered, setHovered] = useState(false);
  

  return (
    <>
      <StyledDiv width={width*1.1} height={height*1.1+ (deleteOption ? 50 :0)} className="flex flex-col items-center justify-start  relative pt-5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <StyledDiv width={width} height={height}  className="flex flex-col items-center relative "  >
            <Link  href={`/reading/${name}/Tome${numero}`}>
              <Image
                src={`${IMAGE_BASE_URL}/${name}/Tome${numero}/1.png`}
                alt={`tome-${numero}`}
                role="button"
                fill
                priority
                className={`object-cover rounded-lg cursor-pointer active:scale-95 transform transition-transform duration-300 ${
                  isHovered ? 'scale-110 outline-4 outline-white delay-150 ease-in' : 'ease-out'
                }`}
                />
            </Link>
        </StyledDiv >
          {deleteOption && isHovered && (
            <div className=' w-30 h-auto flex justify-center opacity-50  cursor-pointer hover:opacity-100 transition-opacity duration-300 absolute bottom-2'>
              <Image
                src="/trash.png"
                alt="delete-icon"
                role="button"
                width={25}
                height={25}
                className="invert"
              />
            </div>
        )}
        
      </StyledDiv>
    </>


  );
                
                 
}


export const TomeGrid = ({ name ,nbrtomes}: {name:string,nbrtomes:number}) => {
    return (
        <div className="grid grid-cols-3 gap-10 mt-8 p-5">
          {Array.from({length:nbrtomes},(_, index) => (
            <StyledDiv width={275} height={325} key={index} className='flex  items-center'>
              <div className =" h-full w-1/5 flex items-center justify-center">
                <h1 className="text-gray-500 italic text-2xl">{index+1}</h1>
              </div>
              <div className="h-full w-4/5 flex items-center justify-center">
                <Tome  name={name}  width={175} height={250} numero={index+1} />
              </div>
            </StyledDiv>
          ))}
        </div>
    );
  };
  




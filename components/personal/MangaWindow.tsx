
import React, { use } from 'react'
import Image from 'next/image'
import TomeList from '@/components/personal/TomeList';
import {Jacques_Francois} from "next/font/google";
import AddToListButton from './addButton';
const jacques = Jacques_Francois({
  weight:"400",
  variable : "--font-jacques",
  subsets:["latin"],

})


interface MangaWindowProps {
    src: string;
    index:number;
    name: string;
    covers: string[];
    description: string;
    tags: string[];
    inMyList:boolean;

}
const MangaWindow = ({src,index,covers,description,tags,name,inMyList}:MangaWindowProps) => {
    

    

  return (
    <>
        <div className='flex p-3 w-auto h-auto space-x-7 items-center items-start'>
            <div className='flex flex-col w-130 items-center gap-y-5'>
                <Image
                    src={src}
                    alt={`manga-${index}`}
                    width={320}
                    height={420}
                    className="rounded-lg outline-white outline-4"
                />  
                <AddToListButton mangaName={name} inMyList={inMyList} ></AddToListButton>
            </div> 
            <div className="flex flex-col w-full h-105 space-y-5">
                <div className="w-auto h-60">
                <h1 style={{ fontFamily: "var(--font-jacques)" }} className={`${jacques.variable} text-white font-bold text-5xl`}>{name}</h1>
                </div>
                <div className='flex flex-col  w-auto min-h-55 '>
                    <h1 className="text-white font-bold text-2xl">Synopsis</h1>
                    <p className='text-gray-500 italic'>{description}</p>
                </div>
                <div className='flex flex-col h-full w-auto '>
                    <h1 className="text-white font-bold text-2xl">Genres</h1>
                    <div className="flex space-x-1"  >
                        {tags.map((label, index) => (
                            <h1 className='text-gray-500 italic' key={index}>
                                {label}{index < tags.length - 1 ? ',' : ''}
                            </h1>
                        ))}
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
    <TomeList list={covers} name={name}  ></TomeList>
    </>
  )
}

export default MangaWindow

import React, { use } from 'react'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import TomeList from './TomeList';
import { set } from 'react-hook-form';


interface MangaWindowProps {
    src: string;
    index:number;
}
const MangaWindow = ({src,index}:MangaWindowProps) => {
    const[tomes,setTomes]=useState<string[]>([]);
    const[synopsis,setSynopsis]=useState<string>("");
    const[tags,setTags]=useState<string[]>([]);
    const[name,setName]=useState<string>("");

    useEffect(() => {
        async function fetchTomes(){
            const res= await fetch(`/api/manga/tomes`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        cover:src
                    })
                }
            )
            const data = await res.json();
            setTomes(data.images);
        }
        async function fetchInfo(){
            const res= await fetch(`/api/manga/mangaInfo`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        cover:src
                    })
                }
            )
            const data = await res.json();
            setSynopsis(data.description);
            setTags(data.tags);
            setName(data.name);
        }
        fetchTomes();
        fetchInfo();

    }, [src])

  return (
    <>
        <div className='flex p-3 w-auto h-auto space-x-7 items-center items-start'>
            <div className='flex w-470 items-center'>
                <Image
                    src={src}
                    alt={`manga-${index}`}
                    width={320}
                    height={420}
                    className="rounded-lg outline-white outline-4"
                />   
            </div> 
            <div className="flex flex-col w-auto h-auto space-y-5">
                <h1 className="text-white font-bold text-5xl">{name}</h1>
                <div className='flex flex-col w-auto h-auto '>
                    <h1 className="text-white font-bold text-2xl">Synopsis</h1>
                    <p className='text-gray-500'>{synopsis}</p>
                </div>
                <div className='flex flex-col h-auto w-auto '>
                    <h1 className="text-white font-bold text-2xl">Genres</h1>
                    <div className="flex space-x-1"  >
                        {tags.map((label, index) => (
                            <h1 className='text-gray-500' key={index}>
                                {label}{index < tags.length - 1 ? ',' : ''}
                            </h1>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className='flex mt-10  h-auto w-auto space-x-10'>
            <h1 className="
                    font-semibold
                    text-2xl
                    relative 
                    text-white 
                    ">Tomes</h1>
        
        </div>
    <TomeList list={tomes} ></TomeList>
    </>
  )
}

export default MangaWindow
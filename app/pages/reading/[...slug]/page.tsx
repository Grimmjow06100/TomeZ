"use client"
import React from 'react'
import { BanderoleMangas } from '@/components/personal/Banderoles'
import { useEffect,useState,useContext } from 'react'
import { Suspense,use } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';



async function updateHistorique(body: {mangaName: string; numero: number }) {
  try {
      const options = {
          method:"PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      };
      const response = await fetch("/api/manga/historique/update", options);

      if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Erreur lors de la requête API:", error);
      return null;
  }
}


const ReadingPage = (    { 
        params 

    } : {
        params: Promise<{ slug: string[] }>
    } ) =>{


    //ReactHooks variables
    const [mangaName,tomeString] = use(params).slug;
    const [totalTomes, setTotalTomes] = useState<number>(1);
    const [selectedTome, setSelectedTome] = useState<number>(1);
    const [totalPages,setTotalPages]=useState<number>(0);

    //useEffects
    useEffect(() => {
        const query = new URLSearchParams({ mangaName:decodeURIComponent(mangaName), numero:tomeString[4] });
        const fetchInit={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        fetch(`/api/Reading?${query.toString()}`,fetchInit).then((res)=>res.json()).then((data)=>{
            setTotalPages(data.totalPages);
            setTotalTomes(data.totalTomes);
        })
    },[mangaName,tomeString])

    useEffect(() => {
        setSelectedTome(parseInt(tomeString[4]))
    },[tomeString])

    //Handlers
    const handleTomeChangePrevious = () => {
        if (selectedTome > 1) {
            setSelectedTome(selectedTome - 1);
        }
        else{
          return;
        } 
        redirect(`/pages/Reading/${mangaName}/${selectedTome}`);
    }
    const handleTomeChangeNext = () => {
        if (selectedTome < totalTomes) {
            setSelectedTome(selectedTome + 1);
        }
        else{
           return;
        }
        redirect(`/pages/Reading/${mangaName}/${selectedTome}`);
    ;}

    const handleTomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const tomeNumber = parseInt(event.target.value);
            setSelectedTome(tomeNumber);
            redirect(`/pages/Reading/${mangaName}/${selectedTome}`)
    ;}

    return (
    <div className="text-white flex items-center w-screen h-screen overflow-hidden">
      
      <div className="flex w-1/5 h-full ">
        <Link href="/">
            <button type="button" title='none' className="transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-90"> 
                <Image
                src="/back-button.png"
                alt="back-arrow"
                width={50}
                height={50}
                className="w-[50px] h-[50px] m-10 invert"
                />
            </button >
            </Link>
      </div>
       
       
        <div className="flex w-5/7 h-auto items-center justify-center"></div>
      
      
        <div className="flex flex-col w-1/5 h-full">
            <div className="flex flex-col items-center justify-center w-full h-25 mt-20">
                <select
                    aria-label='Select Tome'
                    className="w-40 p-3 text-center text-xl bg-black outline-none"                    value={selectedTome}
                    onChange={handleTomeChange}>
                    {totalTomes &&
                    Array.from({ length: totalTomes }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                        Tome {index + 1}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
    );

}

export default ReadingPage;







 
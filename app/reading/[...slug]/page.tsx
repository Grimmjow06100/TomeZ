"use client"
import { useEffect,useState} from 'react'
import { use } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import {TomeOption} from 'lib/interface.js';
import { SingleValue, ActionMeta } from 'react-select';
import TomeSelect from '@/components/personal/tomeSelect'



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
    } )     =>{


    //ReactHooks variables
    const [mangaName,tomeString] = use(params).slug;
    const [totalTomes, setTotalTomes] = useState<number>(1);
    const [selectedTome, setSelectedTome] = useState<number|undefined>(undefined);
    const [totalPages,setTotalPages]=useState<number>(0);
    

    //useEffects
    useEffect(() => {
        const query = new URLSearchParams({ mangaName:decodeURIComponent(mangaName), numero:tomeString.replace(/\D/g, "") });
        const fetchData={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        fetch(`/api/Reading?${query.toString()}`,fetchData).then((res)=>res.json()).then((data)=>{
            setTotalPages(data.totalPages);
            setTotalTomes(data.totalTomes);
        })
    },[mangaName,tomeString])

    useEffect(() => {
        setSelectedTome(parseInt(tomeString.replace(/\D/g, "")))
    },[tomeString])

    /*
    
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

    
    
    */


    const handleTomeChange = (
        newValue: SingleValue<TomeOption>,
        actionMeta: ActionMeta<TomeOption>) => 
    {

        if (newValue) {
            const tomeNumber = newValue.value;
            setSelectedTome(tomeNumber);
            // Redirection vers la bonne page
            redirect(`/reading/${mangaName}/Tome${tomeNumber}`);

        }


    ;}

    return (
    <div className="text-white flex items-center w-screen h-screen ">
      
      <div className="flex w-1/5 h-full">

        <div className="w-auto h-auto fixed">
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
        
      </div>
       
       
       <div className="flex  items-center justify-center w-4/7 mt-20 h-screen ">
            <div className="flex flex-col w-[80%] h-full ">

                {Array.from({length:totalPages},(_, index)=>{
                    return (
                            <Image
                            key={index}
                            src={`http://localhost:8080/mangas/${mangaName}/${tomeString}/${index + 1}.png`}
                            alt={`image${index + 1}`}
                            width={0} // ou w-full via className
                            height={0}  // facultatif si tu veux que la hauteur s’adapte
                            className="w-full h-auto object-contain"
                            />
                        );

                    })}
            </div>
   
        </div>

        <div className="flex flex-col w-1/5 h-full p-10 ">
            <div className=" w-80 fixed ">
                {selectedTome && <TomeSelect {...{ totalTomes:totalTomes, selectedTome:selectedTome, handleTomeChange:handleTomeChange }}></TomeSelect>}
            </div>
        </div>
    </div>
    );

}

export default ReadingPage;







 
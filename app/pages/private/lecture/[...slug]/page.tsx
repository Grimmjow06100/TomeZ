"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation"; // Import for Next.js navigation params
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {motion} from 'framer-motion';


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




const ReadTome = () => {
   const params = useParams() as { slug: string[] };
   const [totalTomes, setTotalTome] = useState<number>(1);
   const [selectedTome, setSelectedTome] = useState<number>(1);
   const [images, setImages] = useState<string[]|undefined>(undefined);
   const [pageIndex, setpageIndex] = useState<number>(0);

   const imageRef = useRef<HTMLImageElement>(null);

   const handleFullscreen = () => {
     if (imageRef.current) {
       if (!document.fullscreenElement) {
         imageRef.current.requestFullscreen();
       } else {
         document.exitFullscreen();
       }
     }
   };
   const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "ArrowRight" && images) {
          pageIndex < images.length - 1 ? setpageIndex(pageIndex + 1):setpageIndex(pageIndex);
        } else if (event.key === "ArrowLeft") {
          pageIndex > 0 ? setpageIndex(pageIndex - 1):setpageIndex(pageIndex);
        }
      },
      [images, pageIndex]
   );

  useEffect(() => {
    async function fetchInfo() {
      if (params?.slug && params.slug.length >= 2) {
        const [name, numero] = params.slug;
        const mangaName = decodeURIComponent(name);
        const res = await fetch(`/api/lecture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mangaName,
            numero: parseInt(numero),
          }),
        });
        const data = await res.json();
        setTotalTome(data.nombre);
        setSelectedTome(parseInt(numero));
        setImages(data.images);
      }
    }
    fetchInfo();
  }, [params]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);


  


  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pageNumber = parseInt(event.target.value);
    setpageIndex(pageNumber - 1);
    };

    const handleTomeChangePrevious = () => {
        if (selectedTome > 1) {
            setSelectedTome(selectedTome - 1);
        }
        else{
          return;
       }
        const name = params.slug[0];
        const mangaName = decodeURIComponent(name);
        fetch(`/api/lecture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mangaName,
                numero: selectedTome ,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setImages(data.images);
                setpageIndex(0);
            });
            updateHistorique({mangaName:mangaName,numero:selectedTome}).then((res)=>{
              console.log(res);
            }).catch((e)=>{
              console.log(e);
            })
        ;}
    const handleTomeChangeNext = () => {
        if (selectedTome < totalTomes) {
            setSelectedTome(selectedTome + 1);
        }
        else{
           return;
        }
        const name = params.slug[0];
        const mangaName = decodeURIComponent(name);
        fetch(`/api/lecture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mangaName,
                numero: selectedTome ,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setImages(data.images);
                setpageIndex(0);
            });
            updateHistorique({mangaName:mangaName,numero:selectedTome}).then((res)=>{
              console.log(res);
            }).catch((e)=>{
              console.log(e);
            })
    ;}

    const handleTomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tomeNumber = parseInt(event.target.value);
        setSelectedTome(tomeNumber);
        const name = params.slug[0];
        const mangaName = decodeURIComponent(name);

        fetch(`/api/lecture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mangaName,
                numero: tomeNumber,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setImages(data.images);
                setpageIndex(0);
            });

      updateHistorique({mangaName:mangaName,numero:tomeNumber}).then((res)=>{
          console.log(res);
        }).catch((e)=>{
          console.log(e);
        })
        
        console.log("Tome sélectionné :", tomeNumber);
    };

  return (
    <div className="text-white flex items-center w-screen h-screen overflow-hidden">
      <div className="flex w-1/5 h-full ">
      <Link href="/pages/private/home">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
            src="/back-button.png"
            alt="back-arrow"
            width={50}
            height={50}
            className="w-[50px] h-[50px] m-10 invert"
            />
          </motion.button>
        </Link>
      </div>
      <div className="flex w-3/5 h-full items-center justify-center bg-[#1E1E1E]">
        <div className="flex w-1/7 h-full items-center justify-center">
            <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-full opacity-50 hover:opacity-100 transition-opacity duration-300" onClick={() => {if(images && pageIndex > 0)setpageIndex(pageIndex - 1)}}>
                <Image
                src="/left-arrow.png"
                alt="left-arrow"
                width={50}
                height={50}
                className="invert mx-auto w-[50px] h-[50px]"
                
                />
            </motion.button>

        </div>
        <div className="flex w-5/7 h-auto items-center justify-center">
         {images && <Image
          src={images[pageIndex]}
            ref={imageRef}
            alt="manga"
            width={700}
            height={700}
            className="max-h-screen max-w-screen"
            onClick={handleFullscreen}
          />
         }
        </div>
        <div className="flex w-1/7 h-full  items-center justify-center">
            <motion.button  
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-full opacity-50 hover:opacity-100 transition-opacity duration-300" onClick={() => {if(images && pageIndex < images.length)setpageIndex(pageIndex + 1)}}>
                <Image
                src="/right-arrow.png"
                alt="left-arrow"
                width={50}
                height={50}
                className="invert mx-auto w-[50px] h-[50px]"
               
            />
            </motion.button>
        </div>
      </div>
      <div className="flex flex-col w-1/5 h-full">
        <div className="flex flex-col items-center justify-center w-full h-25 mt-20">
        <select
            className="border border-gray-300 w-40 rounded-md p-2 text-center text-sm bg-[#1E1E1E] focus:outline-none"
            value={selectedTome}
            onChange={handleTomeChange}
        >
            {totalTomes &&
              Array.from({ length: totalTomes }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  Tome {index + 1}
                </option>
              ))}
          </select>
          <div className="relative flex w-full h-full space-x-20 items-center justify-center">
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <div className=" w-10 h-10">
              <Image
                src="/left-arrow-lecture.png"
                alt="left-arrow"
                width={35}
                height={35}
                className="invert  "
                onClick={handleTomeChangePrevious}
              />
            </div>
            </motion.button>
            <div className="w-10 h-10">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              
              <Image
                src="/right-arrow-lecture.png"
                alt="right-arrow"
                width={35}
                height={35}
                className="invert "
                  onClick={handleTomeChangeNext}
              />
              </motion.button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-25 ">
          <select
            value={pageIndex + 1}
            onChange={handlePageChange}
            className="border border-gray-300 w-40 rounded-md p-2 text-center text-sm bg-[#1E1E1E] focus:outline-none"
          >
            {images && images.map((_, index) => (

                <option key={index + 1} value={index + 1}>
                    Page {index + 1}
                </option>
            ))}

          </select>
          <div className="relative flex w-full  h-full items-center space-x-20 justify-center ">
            <div className=" w-10 h-10">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <Image
                src="/left-double-arrow.png"
                alt="left-arrow"
                width={25}
                height={25}
                className="invert pt-1"
                onClick={() => setpageIndex(0)}
              />
              </motion.button>
            </div>
            <div className="w-10 h-10">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <Image
                src="/right-double-arrow.png"
                alt="right-arrow"
                width={35}
                height={35}
                className="invert"
                  onClick={() => {if(images)setpageIndex(images.length - 1)}}

              />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadTome;

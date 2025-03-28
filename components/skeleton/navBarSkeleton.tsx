"use client"

import {Logo} from "@/components/personal/logo";
import { Skeleton } from "../ui/skeleton";
import Image from 'next/image';

const NavBar = () => {
    return (
        <nav className="max-w-full mx-7 flex space-x-8 items-left py-4 relative mb-10">
            <div>
                <Logo/>
            </div>
            <div className="flex items-center">
                <Image src="/home.png" alt="logo" width={25} height={25} className="invert "/>
                <button className="
                font-semibold
                relative 
                px-4 
                py-2 
                text-white 
                transition-colors 
                duration-300 
                hover:text-white 
                after:absolute 
                after:left-1/2 
                after:bottom-0 
                after:w-0 
                after:h-1 
                after:bg-white 
                after:transition-all 
                after:duration-300 
                hover:after:w-full 
                hover:after:left-0
                " 
                >Accueil</button>
            </div>
            <div className="flex items-center ">
                <Image src="/search.png" alt="logo" width={25} height={25} className="invert"/>
                <button className="
                font-semibold
                relative 
                px-4 
                py-2 
                text-white 
                transition-colors 
                duration-300 
                hover:text-white 
                after:absolute 
                after:left-1/2 
                after:bottom-0 
                after:w-0 
                after:h-1 
                after:bg-white 
                after:transition-all 
                after:duration-300 
                hover:after:w-full 
                hover:after:left-0
                " >Recherche</button>
            </div>
            <div className="flex items-center ">
                <Image src="/add.png" alt="logo" width={25} height={25} className="invert"/>
                <button className="
                font-semibold
                relative 
                px-4 
                py-2 
                text-white 
                transition-colors 
                duration-300 
                hover:text-white 
                after:absolute 
                after:left-1/2 
                after:bottom-0 
                after:w-0 
                after:h-1 
                after:bg-white 
                after:transition-all 
                after:duration-300 
                hover:after:w-full 
                hover:after:left-0
                " >My List</button>
            </div>
            <div className="flex flex-col w-50 p-5 absolute hover:bg-[#111111] z-10 right-0 rounded-lg ">
                <div className="flex items-center space-x-4 justify-end">
                    <Image src="/user.png" alt="logo" width={25} height={25} className="invert"/>
                    <Skeleton className='h-[20px] w-[80px] bg-zinc-700'></Skeleton>
                </div>
                
            </div>
            
        </nav>
    )
};

export default NavBar;
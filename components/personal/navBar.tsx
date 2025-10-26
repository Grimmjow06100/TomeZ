"use client"
import { redirect } from 'next/navigation';
import {Logo} from './logo';
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full top-0 left-0 fixed z-3 flex space-x-8 items-left py-4  mb-10 text-xl bg-gradient-to-t from-transparent to-black/80 ">
            <button  className ="ml-5 flex items-center gap-x-1 cursor-pointer">
                <Logo size={70} title={false}/>
                <h1 className="font-jacques text-3xl font-bold hover:text-gray-300">TomeZ</h1>
            </button>
            <div className="flex items-center gap-x-3  ">
                
                <Image src="/home.png" alt="logo" width={35} height={35} className="invert "/>
                <Link href="/ ">
                    <button className="
                    font-semibold
                    relative
                    transition-colors 
                    duration-300 
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
                    py-1
                    cursor-pointer
                    " 
                    >Accueil</button>
                </Link>
            </div>
    
            <div className="flex items-center gap-x-3  ">
                <Image src="/search.png" alt="logo" width={35} height={35} className="invert"/>
                <Link href={`/ `} >
                <button className="
                font-semibold
                relative
                transition-colors 
                duration-300 
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
                py-1
                cursor-pointer

                " >Recherche</button>
                </Link>
            </div>
            <div className="flex items-center gap-x-3  ">
                <Image src="/add.png" alt="logo" width={35} height={35} className="invert"/>
                <Link href={`/ `} >
                <button className="
                font-semibold
                relative 
                transition-colors 
                duration-300  
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
                py-1
                cursor-pointer

                " >My List</button>
            </Link>
            </div>
           {/*
            <div className="flex flex-col w-50 p-5 absolute hover:bg-[#111111] z-10 right-0 rounded-lg "  onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}>
                <button className="flex items-center space-x-4 justify-end">
                    <Image src="/reglage.png" alt="logo" width={35} height={35} className="invert"/>
                    <a className='font-semibold cursor-pointer'>Paramètres</a>
        
                </button>
    
                {menuOpen && (
                <div className='text-sm'>
                    <button className="pt-10 m-1 px-2 text-left text-[#D3D3D3]  transition-all hover:text-white duration-300 ">
                        Compte
                    </button>
                    <button  className="m-1 text-left px-2 text-[#D3D3D3] transition-all duration-300 hover:text-white ">
                        Se déconnecter

                    </button>

                </div>
            )}}
            </div>
           
           */}
            
        </nav>
    )
};

export default NavBar;
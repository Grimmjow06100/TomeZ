"use client"
import { redirect } from 'next/navigation';
import {Logo} from './logo';
import Image from 'next/image';
import { useState } from 'react';

const NavBar = ({ username }: { username: string }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        });
        if (response.status == 200) {
            redirect('/');
        }
    };
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
                " >Accueil</button>
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
            <div className="flex flex-col w-50 p-5 absolute hover:bg-[#111111] z-10 right-0 rounded-lg "  onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}>
                <div className="flex items-center space-x-4 justify-end">
                    <Image src="/user.png" alt="logo" width={25} height={25} className="invert"/>
                    <button className='font-semibold text-white '>{username}</button>
                    {/* Menu déroulant */}
                </div>
                {menuOpen && (
                <>
                <button className="pt-10 m-1 px-2 text-left text-[#D3D3D3] transition-all hover:text-white duration-300 ">Compte</button>
                <button onClick={handleLogout} className="m-1 text-left px-2 text-[#D3D3D3] transition-all duration-300 hover:text-white ">Se déconnecter</button>

                </>
            )}
            </div>
            
        </nav>
    )
};

export default NavBar;
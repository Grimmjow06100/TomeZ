"use client";

import NavBar from "@/components/personal/navBar";
import { useEffect, useState} from "react";
import { redirect } from "next/navigation";
import NavBarSkeleton from "@/components/skeleton/navBarSkeleton";
import Reading from "@/components/personal/Reading";
import { motion } from "framer-motion";
import MangaBanderole from "@/components/personal/MangaBanderole";




interface List {
    cover: string;
    inMyList: boolean;
}

export default function UserPage() {
    const [state, setState] = useState({
        user: "",
        mangaData: {
            classiques: [] as List[],
            pepites: [] as List[],
            enCours: [] as { name: string; numero: number; cover: string }[],
        }
    });
    
    const navBar = state.user ? <NavBar username={state.user} /> : <NavBarSkeleton />;

      
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
    
        async function fetchData() {
            try {
                const res = await fetch("/api/auth/session", { signal });
                if (!res.ok) throw new Error("Erreur de récupération de session");
                const data = await res.json();
    
                // Charge les mangas après l'utilisateur
                const listesRes = await fetch("/api/manga/listes/banderoles", { signal });
                if (!listesRes.ok) throw new Error("Erreur de récupération des mangas");
                const { pepites, classiques, historique } = await listesRes.json();
                setState({
                    user: data.username,
                    mangaData: { classiques, pepites, enCours: historique }
                });
    
            } catch (error) {
                if (error.name !== "AbortError") console.error(error);
            }
        }
    
        fetchData();
        return () => controller.abort();
    }, []);
    
  // ✅ S'exécute une seule fois au montage
    

    
    return (
        <div className="overflow-x-hidden">
            <div
    className="relative w-full h-180 mb-15">

                {/* Vidéo en arrière-plan */}
                <video 
                    autoPlay 
                    loop 
                    muted 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/luffy.mp4"
                />
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => redirect(`/pages/private/lecture/One Piece/${state.mangaData.enCours.some(manga => manga.name === "One Piece") ? state.mangaData.enCours.find(manga => manga.name === "One Piece")?.numero : 1}`)}
                    className="absolute bottom-20 left-20 h-20 w-50 text-2xl  z-1 bg-white/10 backdrop-blur-sm p-4 rounded-lg outline-2">Lire One Piece</motion.button>
                {/* Overlay avec effet de fondu en bas */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Navbar en superposition */}
                <div className="fixed z-2 w-full">
                    {navBar}
                </div>
            </div>
            {/* Sections de mangas */}
            <Reading list={state.mangaData.enCours} username={state.user}/>
            <MangaBanderole list={state.mangaData.classiques} title="Les Classiques 🏆" username={state.user}/> 
            <MangaBanderole list={state.mangaData.pepites} title="Les Pépites 💎" username={state.user}/>
        </div>
    );
}

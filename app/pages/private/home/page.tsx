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
           
        </div>
    );
}

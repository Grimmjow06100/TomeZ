"use client";

import NavBar from "component/navBar";
import { useEffect, useState } from "react";
import MangaBanderole, { Type } from "component/MangaBanderole";
import { redirect } from "next/navigation";
import MangaSelection from "component/MangaSelection";
import { title } from "process";
import { Container } from "@mui/material";








export default function UserPage() {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [mangaBanderole, setMangaBanderole] = useState<string[]>([]);
    const[mangaClassiques,setMangaClassiques]=useState<string[]>([]);
    const[mangaPepites,setMangaPepites]=useState<string[]>([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/auth/session");
                if (res.status === 200) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.log("Utilisateur non connecté, statut:", res.status);
                    redirect("/");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
            }
        }

        async function fetchMangaBanderole() {
            try {
                const res = await fetch("/api/manga/banderole");
                if (res.status === 200) {
                    const data = await res.json();
                    setMangaBanderole(data.covers);
                } else {
                    console.log("Erreur lors du chargement des mangas, statut:", res.status);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des mangas:", error);
            }
        }
        async function fetchMangaClassiques() {
            try {
                const res = await fetch("/api/manga/classiques");
                if (res.status === 200) {
                    const data = await res.json();
                    
                    setMangaClassiques(data.covers);
                } else {
                    console.log("Erreur lors du chargement des mangas, statut:", res.status);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des mangas:", error);
            }
        }

        async function fetchMangaPepites() {
            try {
                const res = await fetch("/api/manga/pepites");
                if (res.status === 200) {
                    const data = await res.json();
                    setMangaPepites(data.covers);
                } else {
                    console.log("Erreur lors du chargement des mangas, statut:", res.status);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des mangas:", error);
            }
        }

        fetchUser();
        fetchMangaBanderole();
        fetchMangaClassiques();
        fetchMangaPepites();
    }, []); // [] pour ne pas relancer la requête à chaque render

    // Affichage d'un message de chargement pendant la récupération des données
    if (!user || mangaBanderole.length === 0) {
        return <div></div>;
    }
    
    

    return (
        <>
            <NavBar username={user.username} />
            <MangaBanderole list={mangaBanderole} />
            <MangaSelection list={mangaClassiques} title="Les Classiques 🏆"/>
            <MangaSelection list={mangaPepites} title="Les Pépites 💎"/>

        </>
    );
}

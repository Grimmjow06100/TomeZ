"use client";

import NavBar from "component/navBar";
import { useEffect, useState } from "react";
import MangaList, { Type } from "component/MangaList";
import { redirect } from "next/navigation";

const props = {
    title: undefined,
    list: [
        "/demonSlayer.png",
        "/deathNote.png",
        "/onePiece.png",
        "/demonSlayer.png",
        "/demonSlayer.png",
        "/onePiece.png",
        "/deathNote.png",
        "/deathNote.png",
        "/deathNote.png",
        "/deathNote.png",
        "/onePiece.png",
        "/onePiece.png",
    ],
    type: Type.Manga,
    parameters: { width: "180", height: "280", imagesPerPage: 9 },
};

export default function UserPage() {
    const [user, setUser] = useState<{ username: string , email:string,id:string} | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/auth/session");
            const data = await res.json();
            if (!data) {
                redirect("/login");
            } else {
                setUser(data);
            }
        }
        fetchUser();
    },[]);

    if (!user) return <p>Chargement...</p>;

    return (
        <>
            <NavBar username={user.username} />
            <MangaList title={props.title} list={props.list} parameters={props.parameters}  type={props.type}/>
        </>
    );
}

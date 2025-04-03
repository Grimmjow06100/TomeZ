import { useState,useEffect } from "react";

import { motion } from "framer-motion";
import {mutate} from "swr";
import Image from "next/image";

const AddToListButton = ({ mangaName,inMyList}: { mangaName: string ;inMyList:boolean}) => {
  const [added, setAdded] = useState<boolean>(false); // Par défaut, on charge après

// Charger l'état depuis localStorage dès le montage
useEffect(() => {
  const storedValue = localStorage.getItem(`manga-${mangaName}`);
  if (storedValue !== null) {
    setAdded(JSON.parse(storedValue)); // Charger la valeur sauvegardée
  } else {
    setAdded(inMyList); // Si pas de valeur, utiliser la valeur de l'API
  }
}, [mangaName,inMyList]); // inMyList ajouté pour réagir aux changements externes

  const handleClick = async () => {
    const newState = !added;
    setAdded(newState);
    const body = {
      mangaName: mangaName,
    };
     // Sauvegarde immédiate dans localStorage
    localStorage.setItem(`manga-${mangaName}`, JSON.stringify(newState));
    const options ={
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }
    if(!added){
        fetch("/api/manga/listes/MyList/add", options).then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }
            mutate("/api/manga/listes/MyList"); // Mettre à jour le cache SWR
        })
        
    }
    else{
        fetch("/api/manga/listes/MyList/remove", options).then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }
            mutate("/api/manga/listes/MyList"); // Mettre à jour le cache SWR
            console.log("Retiré de la liste !"); // Log pour le débogage
        })
    }
  };

  return (
    <button onClick={handleClick} className="relative w-10 h-10 flex items-center justify-center p-2 rounded-full  transition duration-300">
      <motion.div
        key={added ? "check" : "plus"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute w-full h-full "
      >
        {added ? (
          <Image src="/check-icon.png" alt="check" fill className="object-cover invert"/>
        ) : (
          <Image src="/add-icon.png" alt="plus" fill className="object-cover invert"/>
        )}
      </motion.div>
    </button>
  );
};

export default AddToListButton;

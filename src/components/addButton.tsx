import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {getBooleanFromStorage,safeGetList,removeElement} from "@/utils/utils"



/*
Tu veux que je t’aide à créer un hook useReadingList() qui encapsule tout ça avec add, remove, et isAdded ? Ce serait super clean pour ton projet manga.
 */




const AddToListButton = ({ name }: { name: string }) => {


  const [added, setAdded] = useState<boolean>(getBooleanFromStorage(`manga-${name}`));

  const handleClick = async () => {
    setAdded(!added);
     // Sauvegarde immédiate dans localStorage
    localStorage.setItem(`manga-${name}`, JSON.stringify(!added));

    let newList: string[] = safeGetList('mylist')

    if(!added){
      console.log("ici")
      newList.push(name)
      localStorage.setItem('mylist',JSON.stringify(newList))
    }
    else {
      newList=removeElement<string>(newList,name)
      console.log(newList)
      localStorage.setItem('mylist',JSON.stringify(newList))
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
          <Image src="/check-icon.png" alt="check" fill className="object-cover cursor-pointer invert"/>
        ) : (
          <Image src="/add-icon.png" alt="plus" fill className="object-cover cursor-pointer invert"/>
        )}
      </motion.div>
    </button>
  );
};

export default AddToListButton;

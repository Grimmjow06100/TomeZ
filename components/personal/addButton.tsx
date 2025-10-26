import { useState } from "react";

import { motion } from "framer-motion";
import Image from "next/image";

const AddToListButton = ({ name}: { name: string }) => {
  const [added, setAdded] = useState<boolean>(false); // Par défaut, on charge après

  const handleClick = async () => {
    setAdded(!added);
     // Sauvegarde immédiate dans localStorage
    localStorage.setItem(`manga-${name}`, JSON.stringify(!added));
  
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

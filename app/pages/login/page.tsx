
"use client"

import {LoginLogo} from "@/components/personal/logo";
import {motion} from 'framer-motion';




export default function Login() {
  
  const options ={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
      
    }
  const handleClick = async () => {
    try {
      const response = await fetch("/api/test", options);

      if (response.ok) {
        console.log("Connexion réussie");
      } else {
        console.error("Échec de la requête : ", response.status);
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };


  return (
    <main className="w-screen h-screen flex items-center justify-center text-white text-3xl">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/gojo.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col absolute top-0 left-0 w-full h-full bg-black opacity-75 -z-8 "></div>
      <div className="absolute top-10 left-10 flex"> 
        <LoginLogo/>
      </div>
      <div >
          <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="
              w-50 
              text-md 
              py-auto 
              px-auto 
              bg-indigo-600 
              rounded-full 
              focus:ring-2 
              focus:ring-indigo-500 
              active:bg-indigo-800 "
           >
              Connexion
          </motion.button>
        </div>
    </main>
  );
}

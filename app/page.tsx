
"use client"

import {LoginLogo} from "component/logo";
import {InscriptionForm, LoginForm } from "component/form";

import { useState } from "react";


export default function Login() {

  const [isRegistering, setIsRegistering] = useState(false); // false = affichage du LoginForm


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
      <div>
        {isRegistering ? <InscriptionForm setIsRegistering={setIsRegistering}/> : <LoginForm setIsRegistering={setIsRegistering}/>}
        </div>
    </main>
  );
}

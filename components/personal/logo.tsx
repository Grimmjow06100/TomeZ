import React from "react";
import Image from "next/image";
import {Jacques_Francois} from "next/font/google" 
import { redirect } from "next/navigation";


const jacques = Jacques_Francois({
  weight:"400",
  variable : "--font-jacques",
  subsets:["latin"],

})


export const LoginLogo = () => {
  return (
    <div className="flex flex-col items-left space-x-4">
        <div className="flex items-center space-x-4">
            <Image 
            src="/TomezLogo.png"
            alt="Logo de connexion"
            width={140}
            height={140}
            className="mt-2"
            />
            <h1 style={{ fontFamily: "var(--font-jacques)" }} className={`${jacques.variable} text-9xl`}>
                TomeZ
            </h1>
        </div>
        <p className="text-3xl text-gray-600 dark:text-gray-200">
          Plongez dans l&apos;univers du manga.
        </p>
    </div>
  );
};

export const Logo = () => {
  return (
    <div className="flex flex-col items-left space-x-4">
        <div className="flex items-center space-x-2">
            <Image 
            src="/TomezLogo.png"
            alt="Logo de connexion"
            width={60}
            height={60}
            className="mt-2"
            onClick={() => redirect("/pages/private/home")}
            />
        </div>
    </div>
  )
}




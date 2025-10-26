import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import {LogoTitle} from './style'


export const Logo = ({size,title} :{size:number,title:boolean} ) => {
  return (
    <div onClick={()=>redirect("/")}  className="flex flex-col items-left space-x-4">
        <div className="flex items-center space-x-4">
            <Image 
            src="/TomezLogo.png"
            alt="Logo de connexion"
            width={size}
            height={size}
            className="mt-5"
            />
            {title && <LogoTitle size={size/1.4}>Tomez</LogoTitle>}
        </div>
       
    </div>
  );
};



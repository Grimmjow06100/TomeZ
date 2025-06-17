import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import styled from 'styled-components'




const LogoTitle = styled.h1 `
  font-family: var(--font-jacques);
  font-size:110px;
`


export const LoginLogo = () => {
  return (
    <div className="flex flex-col items-left space-x-4">
        <div className="flex items-center space-x-4">
            <Image 
            src="/TomezLogo.png"
            alt="Logo de connexion"
            width={140}
            height={140}
            className="mt-8"
            />
            <LogoTitle>Tomez</LogoTitle>
        </div>
        <p className="text-3xl">
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




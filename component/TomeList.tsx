import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Tome from './Tome';


export enum Type{
  Manga,
  Tome
}
interface TomeListProps {
  list: string[]; 
}


const TomeList = ({ list }: TomeListProps) => {
    return (
      <div className="flex flex-col h-auto w-auto">
        <div className="mx-auto">
          {/* Conteneur des images en grille */}
          <div className="grid grid-cols-5 gap-15 mt-8">
            {list.map((src, index) => (
              <Tome key={index} src={src} width="150" height="200" index={index}/>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default TomeList;
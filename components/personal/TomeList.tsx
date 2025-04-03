import React from 'react'
import Tome from './Tome';


export enum Type{
  Manga,
  Tome
}
interface TomeListProps {
  list: string[]; 
  name:string;
}


const TomeList = ({ list,name }: TomeListProps) => {
    return (
        <div className="flex flex-col mx-auto w-auto h-auto">
          {/* Conteneur des images en grille */}
          <div className="grid grid-cols-3 gap-15 mt-8">
            {list.map((src, index) => (
              <div key={index} className='flex space-x-7 items-center'>
                <h1 className="text-gray-500 italic text-3xl">{index+1}</h1>
                <Tome src={src} name={name}  width={175} height={225} numero={index+1} />
              </div>
            ))}
          </div>
        </div>
    );
  };
  

export default TomeList;
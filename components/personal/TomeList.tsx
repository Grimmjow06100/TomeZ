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
      <div className="flex flex-col h-auto w-auto">
        <div className="mx-auto">
          {/* Conteneur des images en grille */}
          <div className="grid grid-cols-4 gap-15 mt-8">
            {list.map((src, index) => (
              <div key={index} className='flex space-x-7 items-center'>
                <h1 className="text-gray-500 italic text-3xl">{index+1}</h1>
                <Tome src={src} name={name} width="150" height="200" numero={index+1}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default TomeList;
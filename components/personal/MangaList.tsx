import React from 'react'
import Manga from './Manga';


export enum Type{
  Manga,
  Tome
}
interface MangaListProps {
  list: {cover:string,inMyList:boolean}[]; 
}


const MangaList = ({list}: MangaListProps) => {
    return (
        <div className="flex flex-col w-auto h-auto m-10">
          {/* Conteneur des images en grille */}
          <div className="grid grid-cols-6 gap-15">
            {list.map((element, index) => (
              <div key={index} className='w-[220px] h-[320px]'>
                <Manga index={index} src={element.cover} width={220} height={320} inMyList={element.inMyList}/>
              </div>
            ))}
          </div>
        </div>
    );
  };
  

export default MangaList;
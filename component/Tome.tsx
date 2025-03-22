import { useState, useEffect } from 'react';
import Image from 'next/image';


interface Props {
  src: string;
  width: string;
  height: string;
  index: number;
}

const Tome = ({ src, width, height, index }: Props) => {
  
  

  const widthNumber = parseInt(width);
  const heightNumber = parseInt(height);

  return (
    <div className="flex-shrink-0" style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src={src}
        alt={`manga-${index}`}
        width={widthNumber}
        height={heightNumber}
        className="w-full h-full object-cover duration-200 rounded-lg hover:outline-4 hover:outline-white transform transition-transform duration-300 hover:scale-110"
      />
    </div>
      

  );
};

export default Tome;

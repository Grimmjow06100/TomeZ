
import Image from 'next/image';
import Link from 'next/link';


interface Props {
  src: string;
  width: string;
  height: string;
  name:string;
  numero:number;  
}



const Tome = ({ src, width, height, numero,name}: Props) => {


  const widthNumber = parseInt(width);
  const heightNumber = parseInt(height);

  return (
    <div className="flex-shrink-0" style={{ width: `${width}px`, height: `${height}px` }}>
      <Link href={`/private/lecture/${name}/${numero}`}>
        <Image
          
          src={src}
          alt={`tome-${numero}`}
          width={widthNumber}
          height={heightNumber}
          className="w-full h-full object-cover duration-200 rounded-lg hover:outline-4 hover:outline-white transform transition-transform duration-300 hover:scale-110"
        />
      </Link>
    </div>
      

  );
};

export default Tome;

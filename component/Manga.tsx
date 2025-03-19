import Image from "next/image";

interface Props {
  index: number;
  src: string;
  width: string;
  height: string;
  info:{
    name:string,
    numero:number|undefined
  }
}

const Manga = ({ src, width, height, index }: Props) => {
  const widthNumber = parseInt(width);
  const heightNumber = parseInt(height);

  return (
    <div
      key={index}
      className="flex-shrink-0"
      style={{ width: `${width}px`, height: `${height}px` }} // 🔥 Ajout du style inline
    >
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

export default Manga;


export interface MangaProps {
    name:string,
    description:string,
    nbrtomes:number,
    tags?: string;
} 

export interface BanderoleMangaProps{
    list:MangaProps[],
    title:string
}

export interface TomeProps {
    width: number;
    height: number;
    name:string;
    numero:number; 
    deleteOption?:{
        handler:(index: number) => void
        index:number
    }
}

export interface VideosProps{
    list :{
        videoName:string,
        mangaName:string
    }[];
    interval:number
}
"use client"
import { BanderoleMangas } from '@/components/personal/Banderoles'
import { useEffect,useState,useContext } from 'react'
import { MangaProps } from '@/lib/interface'
import NavBar from '@/components/personal/navBar'
import VideoSwitcher from '@/components/personal/videoSwitcher'

const HomePage = () => {
  const [mangaData,setMangaData] =  useState<MangaProps[]|undefined>(undefined)
  useEffect(( ) => {
      fetch("/api/Manga")
      .then((res) =>
        res.json()
        .then((data) => {
          setMangaData(
            data.mangas
          )
        })
        
      )


  },[])
  const videos = [{videoName:"/videos/luffy.mp4",mangaName:"One Piece"}, {videoName:"/videos/byakuya.mp4",mangaName:"Bleach"},{videoName:"/videos/naruto.mp4",mangaName:"Naruto"},{videoName:"/videos/griffith.mp4",mangaName:"Berserk"},{videoName:"/videos/gogeta.mp4",mangaName:"DB Super"}];
  const interval = 8000;


  return (
    <>
      <NavBar></NavBar>
      <div className="relative w-full h-180 mb-15">
        <VideoSwitcher list={videos} interval={interval}></VideoSwitcher>
      </div>
      {mangaData && <BanderoleMangas {...{title:"✨ Selection",list:mangaData }}/>}
    </>
  )
}
export default HomePage;
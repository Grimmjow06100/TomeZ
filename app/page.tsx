"use client"
import React from 'react'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import {Tome,TomeGrid} from '@/components/prototypes/Tome'
import {Manga,MangaGrid} from'@/components/prototypes/Manga'
import {BanderoleTomes,BanderoleMangas} from '@/components/prototypes/Banderoles'
import NavBar from '@/components/prototypes/navBar'
import { LoginForm,InscriptionForm } from '@/components/prototypes/form'



const ScrollableBox = () => {
  let TomeProps = {
    src : "/1.png",
    width:250,
    height:350,
    name:"s'en fou",
    numero : 3,
    deleteOption :{
     handler :  ()=>{return},
     index:1

    }

  };
  let TomeGridProps = {
    list : ["/1.png","/1.png","/1.png","/1.png","/1.png","/1.png","/1.png","/1.png","/1.png","/1.png","/1.png"],
    mangaName :"demonSlayer"

  }
  let MangaProps = {
    src : "/1.png",
    width:250,
    height:350,
  }

  let MangaGridProps = {

    list : [{manga : MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src},{manga :MangaProps.src}]

  }
  let item = {
    mangaName:"demonSlayer",
    numero:7,
    tome:"/1.png"
  }
  let ReadingProps = {
    list:[item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item,item],
    itemWidth:170,
    itemHeight:220
  }

  let item2={
     ...MangaGridProps, 
     title: "Les Pépites",
      itemWidth: 220, 
      itemHeight: 320 
  }
  



  return (
    <>
    {/*<NavBar></NavBar>*/}
    <div className="min-h-screen flex items-center justify-center">
      {/*<Tome {...TomeProps} />*/}
      {/* <TomeGrid  {...TomeGridProps} ></TomeGrid>*/}
      {/*<Manga  {...MangaProps} ></Manga>*/}
      {/* <MangaGrid {...MangaGridProps}></MangaGrid>*/}
      {/*<BanderoleTomes {...ReadingProps}  > </BanderoleTomes>*/}
      {/* <BanderoleMangas { ...item2 } > </BanderoleMangas>*/}
      {/*<LoginForm ></LoginForm>*/}
      <InscriptionForm></InscriptionForm>
     
    </div>
</>
  );
}
export default ScrollableBox;
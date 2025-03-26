import React from 'react'
import NavBarSkeleton from "@/components/skeleton/navBarSkeleton";
import MangaBanderoleSkeleton from "@/components/skeleton/MangaBanderoleSkeleton";
import MangaSelectionSkeleton from "@/components/skeleton/MangaSelectionSkeleton";

export function LoadingPage (){
  return (
    <div>
        <NavBarSkeleton />
        <MangaBanderoleSkeleton />
        <MangaSelectionSkeleton  title="Les Classiques 🏆"/>
        <MangaSelectionSkeleton  title="Les Pépites 💎"/>
            
    </div>
  )
}

export default LoadingPage
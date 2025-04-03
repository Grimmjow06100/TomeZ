import React from 'react'
import Tome from '@/components/personal/Tome';
import { Skeleton } from '../ui/skeleton';

 const Reading= () => {


  return (
    <div className="mx-auto w-auto h-auto items-start justify-center p-10">
        <h1 className="text-white text-4xl">En cours de lecture⏳ </h1>
        <div className="grid grid-cols-7 gap-15 mt-8">
        {Array.from({ length: 7 }, (_, i) => i).map((_, index) => (
            <div key={index} className='flex space-x-7 items-center'>
                <Skeleton  className="w-[10] h-[30] bg-zinc-700"></Skeleton>
                <Skeleton className='w-[150px] h-[200px] bg-zinc-700 rounded-lg'/>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Reading;
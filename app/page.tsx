"use client"
import React from 'react'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

const Page = () => {
    useEffect(() => {
        redirect("/pages/private/home")
    }, [])
  return (
    <></>
  )
}

export default Page
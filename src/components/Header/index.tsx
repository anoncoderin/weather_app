import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

interface NavWeather {
    getWeather: (location:string)=> void;
    location: string;
}



const Header = ({getWeather} : NavWeather) => {

    
  return (
    <div>
        <Image
        src="/logo.svg"
        width={150}
        height={150}
        alt="logo"
        className=""
        />



        
    </div>
  )
}

export default Header

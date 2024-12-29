"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import animationData from '@/lotties/cart-animation.json'
const Lottie = dynamic(() => import('react-lottie'), { ssr: false })

 
export default function page() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
        <Lottie 
	    options={defaultOptions}
        height={20}
        width={40}
      />

    </div>
  )
}

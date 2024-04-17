"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"




const RoomList = ({rooms}: {rooms:any}) => {

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {rooms.data.map((room:any) => {

        const imgURL = `http://127.0.0.1:1337${room.attributes.image.data?.attributes.url}`


        return (
          <div key={room.id}>
            <Link href={`/room/${room.id}`}>
              <div className="relative w-full h-[300px] overflow-hidden mb-6">
                <Image 
                  src={imgURL}
                  fill
                  priority
                  alt=''
                />
              </div>
            </Link>

            <div className="h-[134px] bg-pink-200">
              <div className="flex">

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RoomList
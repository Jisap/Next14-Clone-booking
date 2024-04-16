"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"




const RoomList = ({rooms}: {rooms:any}) => {
  return (
    <div>
      {rooms.data.map((room:any) => {
        return (
          <div key={room.id}>
            <Link href={`/room/${room.id}`}>
              room
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default RoomList
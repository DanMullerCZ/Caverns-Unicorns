
import React from 'react'
import Image from 'next/image'

const MapTile = ({tileType}:{tileType:string}) => {
  return (
    <Image src={`/maps/${tileType}.jpg`} alt={tileType} width={100} height={100}
      className="w-full h-full"
    ></Image>
  )
}

export default MapTile
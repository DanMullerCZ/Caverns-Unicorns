
import React from 'react'
import Image from 'next/image'

const MapTile = ({tileType}:{tileType:string}) => {
  return (
    // <div style={{ backgroundImage: `url(/maps/${tileType}.jpg)` }}></div>
    <Image src={`/maps/${tileType}.jpg`} alt={tileType} width={100} height={100}></Image>
  )
}

export default MapTile
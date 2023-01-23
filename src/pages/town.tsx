import { Characters } from "@prisma/client"
import Town from "components/Town"
import { useState } from "react"

const town = () => {
    const [test_hero,setTest_hero]= useState<Characters>({
        id:1,
        name:'test hero',
        owner_id:'1',
        maxHP:20,
        currentHP:10,
        str:10,
        dex:10,
        con:10,
        int:10,
        wis:10,
        char:10,
        class:'bard',
        race:'elf',
      })
      const setHero = (heroFromTown:Characters)=>{
        setTest_hero(heroFromTown)
      }
  return (
    <div>
        <Town hero={test_hero} setHero={setHero}/>
    </div>
  )
}

export default town
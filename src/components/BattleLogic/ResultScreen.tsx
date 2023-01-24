
import Image from "next/image"

const ResultScreen = ({handleClick, whosIsDead}:{handleClick: () => void, whosIsDead: string}) => {

return (
    <>
    {(whosIsDead === 'hero') &&
        <div onClick={handleClick} className="absolute w-1/2 h-1/2 bg-no-repeat bg-contain inset-1/4" style={{backgroundImage: 'url(/defeat.png)'}}>
            You lose
            </div> 
        }
     {(whosIsDead === 'enemy') &&
        <div onClick={handleClick} className="absolute w-1/2 h-1/2 bg-no-repeat bg-contain inset-1/4" style={{backgroundImage: 'url(/victory.jpg)'}}>
            You win
            </div> 
        }
    </>
)
}

export default ResultScreen
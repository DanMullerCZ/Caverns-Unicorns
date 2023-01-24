import { setDefaultResultOrder } from "dns"

const ResultScreen = ({handleClick}:{handleClick: () => void}) => {
return (
    <video className=" absolute" autoPlay muted id="myVideo" >
        <source src="/boromir_1.gif" />
    </video>
)
}

export default ResultScreen
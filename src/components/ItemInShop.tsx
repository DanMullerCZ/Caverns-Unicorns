import Link from 'next/link';



const RaceDetail = (props: {name: string, price: number, link: string}) => {
    const handleClick = () => {
      alert('You want to buy premium membership. I like you. :]')
    }

    return (
      <div test-id='item-to-sell'>
        <div>
            <img src="" alt="" />
            <h2>{props.name}</h2>
            <h1>{props.price}</h1>
            <button onClick={handleClick}>
                Buy now!
            </button>
            <Link href={props.link} className="w-6 border border-solid border-black">
                Link to STRIPE
            </Link>
        </div>
      </div>
    )
  }
  
  export default RaceDetail
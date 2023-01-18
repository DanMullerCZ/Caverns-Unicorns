import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { trpc } from "utils/trpc"


const UserImage: NextPage = () => {
    const session = useSession()
    const onHovertext: string = 'Change icon'
    const userImage = trpc.userSettings.userImage.useMutation()
    const defaultImages: string[] = [
        '/defaultUserImages/first.jpg', 
        '/defaultUserImages/second.jpg', 
        '/defaultUserImages/third.png',
        '/defaultUserImages/forth.jpg'
    ]
    const [showPics, setShowPics] = useState(false)
    
    const handleClick =() => {
        setShowPics(!showPics)
    }

    useEffect(() => {
        (userImage.mutate({userId: session.data?.user?.id as string}))
        console.log(userImage.data, 'trpc return');       
    },[session.data?.user?.id])
    return (
        <>  
            <h3>{session.data?.user?.name}</h3>
            
            <Image src={userImage.data as string} 
                 width='100' 
                 height='100' 
                 alt="/defaultUserImages/first.jpg" 
                 onClick={handleClick}
                 />
                 <span>
                    {}
                 </span>
            
            { showPics ? defaultImages.map((image, index) => <Image src={image} width='100' height='100' alt={image} key={index} onClick={handleClick}/>) : null}
        </>
    )
}

export default UserImage
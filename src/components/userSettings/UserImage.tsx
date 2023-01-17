import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { trpc } from "utils/trpc"


const UserImage: NextPage = () => {
    let defaultImages: string [] = []
    const session = useSession()
    const onHovertext: string = 'Change icon'
    const userImage = trpc.userSettings.userImage.useMutation()
    
    const [image, setImage] = useState('')

    useEffect(() => {
        (userImage.mutate({userId: session.data?.user?.id as string}))
        console.log(userImage.data);
        setImage(userImage.data as string)
        
        
    },[session.data?.user?.id])
    return (
        <>  
            <h3>{session.data?.user?.name}</h3>
            <Link href='/changeUserPicture'>
            <Image src={userImage.data}
                 width='100' 
                 height='100' 
                 alt="/defaultUserImages/first.jpg" 
                 />
                 <span>
                    {}
                 </span>
            </Link>
        </>
    )
}

export default UserImage
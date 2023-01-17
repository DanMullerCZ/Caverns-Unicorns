import Image from "next/image"


const UserImage = () => {
    let defaultImages: string [] = []
    return (
        <>
            <Image src='/defaultUserImages/first.jpg' />
        </>
    )
}

export default UserImage
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const withoutUserID = () => {
    const session = useSession()
    const router = useRouter()

    if (session.status === 'authenticated'){
        router.push(`/user/${session.data.user?.id}`)
    }

    return <>
        <p>{session.data?.user?.name}</p>
        <h1>You need to be logged in</h1>
        <Link href="/login" className="w-6 border border-solid border-black">
            LOG IN
        </Link>
    </>
}

export default withoutUserID
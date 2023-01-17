import Header from "components/general/Header"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from 'swr'
import { trpc } from "utils/trpc"


export default function Result() {
    const router = useRouter()
    const session = useSession()
    const premium = trpc.dbRouter.createPremium.useMutation()

    // using swr because I cannot have default function asynchronous
    const { data, error } = useSWR(
        router.query.session_id
            ? `api/stripe/checkout/${router.query.session_id}`
            : null,
        (url) => fetch(url).then(res => res.json())
    )

    useEffect(() => {
        if (data?.session.status === 'complete' && session.data?.user?.id) {
            premium.mutate(session.data?.user?.id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (<>
        <Header title="Payment Result" />
        <h1>Payment Result</h1>
        <pre>{data ? data.session.status : 'Loading...'}</pre>
        <Link href='/user'>
            Go to your user page
        </Link>
    </>)
}
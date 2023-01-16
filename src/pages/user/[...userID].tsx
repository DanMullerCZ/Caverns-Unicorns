import UserSettings from "components/userSettings/UserSettings";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "utils/trpc";

export default function userPage() {
    const session = useSession()
    const router = useRouter()
    const urlQuery = (router.query.userID as string[]) || []

    const deletion = trpc.dbRouter.deleteUser.useMutation()
    const verification = trpc.backend.verifyEmailAgain.useMutation()

    const handleDelete = () => {
        deletion.mutate(session.data?.user?.id as string)
        signOut()
    }

    useEffect(() => {
        if (session.status === "unauthenticated"){
            router.push('/')
        }
    });

    const handleSendingMail = async () => {
        verification.mutate(session)
    }

    return <>
        <h1 test-id='succes login'>Here is your user page</h1>
        <UserSettings/>
        <hr />
        <p>{session.data?.user?.name}</p>
        <p>{session.data?.user?.id}</p>
        <p>{session.data?.user?.email}</p>

        <hr />

        <p>{session.data?.user?.emailVerified ? 'Email was succesfully verified' : 'You have to verify your email'}</p>

        <hr />

        <h2>URL Query as a string: {urlQuery.join('/')}</h2>

        <hr />

        <button onClick={handleDelete}>
            DELETE USER
        </button>
        <p>Response from deletion: {deletion.data?.toString()}</p>

        <hr />

        <button onClick={() => {
                signOut()
                router.push('/')
            }}>
            LOG OUT
        </button>

        <hr />

        <button onClick={handleSendingMail}>
            Send verification email once more
        </button>
    </>
}
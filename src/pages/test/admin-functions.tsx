// import { useEffect } from "react"
import { trpc } from "utils/trpc"

const AdminFunctions = () => {
    const deleteUser = trpc.dbRouter.deleteTestingUnit.useMutation()

    // useEffect(() => {
    //     alert('Only admins can use this page. If you are not admin, please leave this page alone.')
    // }, [])

    const deleteTestUser = () => {
        deleteUser.mutate()
    }

    return (
        <>
            <button onClick={deleteTestUser}>
                delete testing unit
            </button>
        </>
    )
}

export default AdminFunctions
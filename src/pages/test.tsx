import { useSession } from "next-auth/react"

const Test = () => {     const session = useSession()
          return (<>         {session.data?.user?.email}     </>) } 
           export default Test
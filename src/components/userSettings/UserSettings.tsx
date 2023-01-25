import { NextPage } from "next";
import { useEffect, useState } from "react";

import ChangePassword from "./ChangePasswordOption";
import UserImage from "./UserImage";

const UserSettings: NextPage = () => {
    const [changePasswordForm, setChangePasswordForm] = useState(false)
    const [changePasswordSucces, setChangePasswordSucces] = useState<string>()
    const resultOf = (message: string) => {
        setChangePasswordSucces(message)
        // console.log(message)
    }
    useEffect(() => {
        setChangePasswordForm(false)
    },[changePasswordSucces])
    return (

        <>  
            {!changePasswordForm && 
            <button onClick={() => setChangePasswordForm(true)} >Change password</button>
            }
            {changePasswordForm &&             
            <>
            <ChangePassword setChangePasswordSucces={resultOf} />
            <button onClick={() => setChangePasswordForm(false)}>close</button>
            </>
            }
            <p>{changePasswordSucces}</p>
            <UserImage/>
        </>
    )
}

export default UserSettings
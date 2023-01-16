import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { trpc } from "utils/trpc";
import { string } from "zod";

type passwordState = true | false | 'notprovided'


const ChangePasswordOption: NextPage = () => {
    const router = useRouter()
    const passwordInput = useRef<HTMLInputElement>(null);
    const userPassword = trpc.userSettings.changePassword.useMutation()
    const handleClick = () => {    
        userPassword.mutate(passwordInput.current!.value!)
    }

    return  (
        <>
            <input ref={passwordInput} type="text" />
            <div>{userPassword.data ? 'correct pasword': 'wrong password'}</div>
            <button onClick={handleClick}>change password</button>
        </>
    )
}

export default ChangePasswordOption
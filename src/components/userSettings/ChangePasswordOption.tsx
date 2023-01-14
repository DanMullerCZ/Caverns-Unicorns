import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { trpc } from "utils/trpc";


const ChangePasswordOption: NextPage = () => {
    const passwordInput = useRef<HTMLFormElement>(null);
    const userPassword = trpc.userSettings.passwordCheck.useMutation()
    let [passwordStatus, setPasswordStatus] = useState('')

    const handleClick = (ev: React.FormEvent<EventTarget>) => {
        if(passwordInput.current?.elements[1].value === passwordInput.current?.elements[2].value && passwordInput.current?.elements[0].value.length && passwordInput.current?.elements[2].value.length){
            const currentPassword: any = { currentPassword:  passwordInput.current?.elements[0].value, newPassword: passwordInput.current?.elements[1].value }
                ev.preventDefault()
                userPassword.mutate(currentPassword)
                setPasswordStatus(`Succesfully changed password!`)
        } else {
            ev.preventDefault()
            setPasswordStatus( `incorrect inputs backeng msg: ${userPassword.data?.toString()}`)
        }
    }
    return  (
        <>  <form ref={passwordInput} onSubmit={handleClick} className='border '>
                <input  type="text" placeholder="current password"/>
                <input type='text' placeholder="new password" />
                <input type='text' placeholder=" confirm new password"/>
                <p>{passwordStatus}</p>
                <button type="submit">change password</button>
            </form>
        </>

    )
}

export default ChangePasswordOption



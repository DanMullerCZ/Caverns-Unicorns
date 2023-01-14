import { NextPage } from "next";
import { useEffect, useRef } from "react";
import { trpc } from "utils/trpc";

type passwordState = true | false | 'notprovided'

const ChangePasswordOption: NextPage = () => {
    const passwordInput = useRef<HTMLFormElement>(null);
    const userPassword = trpc.userSettings.passwordCheck.useMutation()
    const newPassword = trpc.userSettings.changePassword.useMutation()
    let passwordStatus = ''
    const handleClick = (ev: React.FormEvent<EventTarget>) => {
        if(passwordInput.current?.elements[1].value === passwordInput.current?.elements[2].value && passwordInput.current?.elements[0].value.length ){
            const currentPassword: any = { currentPassword:  passwordInput.current?.elements[0].value, newPassword: passwordInput.current?.elements[1].value }
                ev.preventDefault()
                    passwordStatus = 'password need to be longer'
                    userPassword.mutate(currentPassword)
                    changePassword()
        } else {
            passwordStatus = 'provided invalid new passwords'
        }
            // if( userPassword.data === true ){
            //     console.log(userPassword.data);

            //     if(passwordInput.current?.elements[1].value === passwordInput.current?.elements[2].value){
            //         console.log('correct password');
            //         newPassword.mutate(passwordInput.current?.elements[1].value)
            //         console.log('succes');              
            //     } else {
            //         console.log('new password and confirmation must be the same');             
            //     }
            // } else {
            //     console.log('wrong password');    
            // }
    }

    const changePassword = () => {
      
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



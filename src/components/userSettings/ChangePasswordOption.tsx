import NavigationBar from 'components/NavigationBar';
import VideoBackground from 'components/VideoBackground';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type } from 'os';
import { useEffect, useRef, useState } from 'react';
import { hashToken } from 'pages/api/auth/jwt';
import { trpc } from 'utils/trpc';
import * as crypto from 'crypto';




const ChangePasswordOption = (props: any):JSX.Element => {

  const passwordInput = useRef<HTMLFormElement>(null);
  const [passwordStatus, setPasswordStatus] = useState("");
  const userPassword = trpc.userSettings.passwordCheck.useMutation();
  const changeUserPassword = trpc.userSettings.passwordChange.useMutation()
  const session = useSession();
  const currentPass = passwordInput.current?.elements[0] as HTMLInputElement;
  const newPass = passwordInput.current?.elements[1] as HTMLInputElement;
  const confirmNewPass = passwordInput.current?.elements[2] as HTMLInputElement;

  const hashFn = (password: string) => {
    return crypto.createHash('sha512').update(password).digest('hex');
  }
  
  useEffect(() => {
    userPassword.mutate({userId: session.data?.user?.id as string})
    console.log(userPassword.data, 'useeffect ')
  },[])

//   useEffect(() => {

//       setPasswordStatus(userPassword.data as any);
//     console.log(userPassword.data);
    
//     console.log("stanu se?");
    
//   }, [userPassword.data]);

  const handleClick = (ev: React.FormEvent<EventTarget>) => {
    ev.preventDefault()
    console.log('cur password hash',hashFn(currentPass.value), 'new pass hash:', hashFn(newPass.value))
    if (
      newPass.value === confirmNewPass.value
    ) {
      if(hashFn(currentPass.value) === userPassword.data){
        props.setChangePasswordSucces("Succesfully changed password")
        const hashedNewPass = hashFn(newPass.value)
        changeUserPassword.mutate({ 
          userId: session.data?.user?.id as string,
          newPassword: hashedNewPass
        })
        
        
      
    } else { 
      props.setChangePasswordSucces("incoreect password")
    }
  }else { props.setChangePasswordSucces("password dont match")}
};
  // if(userPassword.isSuccess){
  //   props.setChangePasswordSucces(passwordStatus)
  // }

  

  return (
    <>
      <form
        ref={passwordInput}
        onSubmit={handleClick}
        className="flex flex-col"
      >
        <div className="flex gap-1">
          <input
            className="rounded-md border bg-transparent px-3 py-2"
            type="password"
            placeholder="current password"
            required
          />
          <input className="rounded-md border bg-transparent px-3 py-2" type="password" placeholder="new password" required/>
          <input className="rounded-md border bg-transparent px-3 py-2" type="password" placeholder=" confirm new password" required/>
        </div>
        <p test-id="success">{passwordStatus}</p>
        <div className="self-center">
          <button type="submit">change password</button>
        </div>
      </form>
    </>
  );
};


export default ChangePasswordOption;

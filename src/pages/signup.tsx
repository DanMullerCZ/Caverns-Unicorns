import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

//import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const SignUp: NextPage = () => {
    const creation = trpc.backend.registration.useMutation()
    const [formData, setFormData] = useState({email:"",password1:"",password2:"", name:""})
    const handleChange = (ev: any) =>{
        setFormData({...formData,[ev.target?.name]:ev.target.value})
    }
    const submitForm = async () => {
      console.log(formData.password1,"--",formData.password2);
      
        if(formData.password1==formData.password2){
            creation.mutate({email:formData.email,password:formData.password1,name:formData.name})
            console.log(formData, "has been sent");
            
        }else{console.log("Passwords dont match");
        }
      }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <form>
        <label htmlFor="email">Email:</label>
        <input className="bg-black text-white" type="email" name="email" 
        onChange={handleChange}
        /><br/>
        <label htmlFor="name">Name:</label>
        <input className="bg-black text-white" type="text" name="name" 
        onChange={handleChange}
        />
        <br />
        <label htmlFor="password1">Password</label>
        <input
          className="bg-black text-white"
          type="password"
          name="password1"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password1">Confirm password:</label>
        <input
          className="bg-black text-white"
          type="password"
          name="password2"
          onChange={handleChange}
        />
        <br />
        <button type="button" onClick={submitForm}>Submit</button>
      </form>
    </>
  );
};

export default SignUp;

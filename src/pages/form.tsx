import { NextPage } from "next";
import { useState } from "react"; 


const Form: NextPage = () => {

    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (event: any) => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const login = (event: any) => {
        event.preventDefault()
    }

    return (<>
        <form>
            <label>USERNAME:
                <input type="text" name="username" value={data.username} onChange={handleChange} />
            </label>

            <label>PASSWORD:
                <input type="text" name="password" value={data.password} onChange={handleChange} />
            </label>

            <button type="submit" onClick={login}>SUBMIT</button>
        </form>
    </>)
}

export default Form
import React, { useState } from 'react'
//import fireDb from 'firebase/compat/app';
//import { auth } from "../firebase"
//import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../authContext';

const SignIn = () => {


    const [creds, setCreds] = useState({
        email: '',
        password: '',
    });
    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const auth = useAuth();
    const history = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            await 

            auth.signIn(creds.email, creds.password)

            console.log("secussefuly");
            toast.success("true");
            history("/2");
        } catch (err) {
            console.log("error");
            setLoading(true);
            setError(err.message);
            toast.error(err.message)
        }
    }

    const onChangeInput = (e) => {
        setCreds((prevCreds) => ({
            ...prevCreds, [e.target.name]: e.target.value,
        }));
    };


    return (
        <div>
            <center>
                <h1>Signin</h1>
                <form onSubmit={handleSubmit}>

                    <label>Email</label>
                    <br />
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        id="email"
                        value={creds.email}
                        onChange={onChangeInput}
                    />
                    <br /><br />
                    <label >Password</label>
                    <br />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={creds.password}
                        onChange={onChangeInput}
                    />
                    <br /><br />
                    <button type="submit">
                        Submit
                    </button>
                    {loading ? <p>loading</p> : <p></p>}
                    <h2>{error}</h2>

                </form>
            </center>
        </div>
    )
}

export default SignIn;

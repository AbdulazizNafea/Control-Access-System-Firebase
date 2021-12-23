import React, {useState} from 'react';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router';
//import fireDb from "../firebase";


const Register = () => {
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
            await auth.register(creds.email, creds.password)
            console.log("secussefuly");
           setTimeout( ()=>{
			   history("/step2");
		   },500) 
        } catch (err) {
            console.log("error");
            setLoading(true);
            setError(err.message);
        }
		
		//Add User to realtime DB by using Uid...

		//const userUid= auth.user.uid;
		// fireDb.child(`user/${auth.user.uid}`).set({ userID:userUid, ...creds}, (err) =>{
		// 	if(err){
		// 		console.log("error");
		// 	}else{
		// 		console.log("ok");
		// 	}
		// });

    }



    const onChangeInput = (e) => {
        setCreds((prevCreds) => ({
            ...prevCreds, [e.target.name]: e.target.value,
        }));
    };
	
	return (
		<div>
		<center>
			<h1>Register Step 1</h1>
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
				<button type="submit" loading={loading.toString()}>
					Submit
				</button>
				<h2>{error}</h2>

			</form>
		</center>
	</div>

	)
}

export default Register

import React, { useState,useEffect } from 'react';
import { useAuth } from '../authContext';
import { toast } from 'react-toastify';
import "../App.css"
import { getDatabase, ref } from "firebase/database";
 import { useNavigate } from 'react-router';
import fireDb from '../firebase'



const NewAddLM = () => {
    const auth = useAuth();
    const history = useNavigate();
    const [data ,setData] = useState({});
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        lineManger: "",
        deptName: "",
        status:"",
        lmemail:"",
    });
    

    const reqData = () => {
           
        fireDb.child("user/").orderByChild("role").equalTo("LM").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        });
        
   
}




    useEffect(() => {


        reqData();
    }, []);







    console.log(state.status)
    console.log(data)
    
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const db = getDatabase();
        
        if (state.status === "Line_Manger") {
            
            const refInfo = ref(db, 'user/' + auth.user.uid);
            try {
               await auth.createUser(refInfo, { UID: auth.user.uid, name: state.name, email: auth.user.email, dpt: state.deptName, status: state.status, role:"LM"})
                toast.success("User Added");
                 setTimeout( ()=> history("/logout"), 1000);
            }
            catch (error) {
                toast.error(error.message)
            }


        } 
        
        //======================user=============================
        else if (state.status === "User") {
            const refInfo = ref(db, 'user/' + auth.user.uid);
             var idd;

            fireDb.child("user/").orderByChild("UID").equalTo(state.lineManger).on("value", (snapshot) => {
                idd= snapshot.val();
            });
            console.log(state.lineManger)

            try {
                auth.createUser(refInfo, { UID: auth.user.uid, name: state.name, email: auth.user.email, dpt: state.deptName, Line_Manger: idd.name, LM_ID: idd.UID, LM_Email: idd.email, role:"user"})
                toast.success("User Added");
                // setTimeout( ()=> history("/logout"), 2500);
                setTimeout( ()=> history("/logout"), 1000);
            } catch (error) {
                toast.error(error.message)
            }
    
        }

        //====================================================================
    


    }

    const handleInputChange = (e) => {
        setState((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }));
    }





    return (
        <div className="App">
            <div  >
                <h1>Add User Profile</h1>
                <form onSubmit={handleOnSubmit}>
                    <label>name</label>
                    <br />
                    <input
                        name="name"
                        id="name"
                        value={state.name}
                        onChange={handleInputChange}
                        required
                    />
                    <br /><br />

                    <label>deptName</label>
                    <br />
                    <input
                        name="deptName"
                        id="deptName"
                        value={state.deptName}
                        onChange={handleInputChange}
                        required
                    />
                    <br /><br /><br />


                    <label>chose the user type</label>
                    <br/>
                    <select name="status" onChange={handleInputChange} value={state.status}>
                        <option value="User type:-" >User type:-</option>
                        <option value="Line_Manger">Line Manger</option>
                        <option value="User">User</option>

                    </select>
                    <br />
                    <br />

                    {state.status === "User" ?

                        <select id="test" name="lineManger" onChange={handleInputChange} value={state.lineManger}>
                            <option value="">--Please choose an option--</option>
                            {Object.keys(data).map((id) => {
                                return (
                                    <option key={id} value={data[id].UID}>{data[id].name}</option>
                                )
                            })}
                            {/* <option value="Zaki">Zaki</option>
                            <option value="Rashed">Rashed</option>
                            <option value="Ali">Ali</option>
                            <option value={auth.user.uid}>Salem</option> */}
                        </select>
                        :

                        <p>nothing</p>}
                    <br /><br />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}

export default NewAddLM;

import React, { useState } from 'react';
import { useAuth } from '../authContext';
import { toast } from 'react-toastify';
import "../App.css"
import { getDatabase, ref } from "firebase/database";
// import { useNavigate } from 'react-router';
import fireDb from '../firebase'


const NewAddUser = () => {
    const auth = useAuth();
    // const history = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        lineManger: "",
        deptName: "",

    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();


        var idd;
        fireDb.child("user/").orderByChild("role").equalTo(state.lineManger).on("child_added", (snapshot) => {
            idd = snapshot.val();
            //console.log(snapshot.key);
        });
        console.log(idd);



        const db = getDatabase();
        const refInfo = ref(db, 'user/' + auth.user.uid);

        try {
            auth.createUser(refInfo, { UID: auth.user.uid, name: state.name, email: auth.user.email, dpt: state.deptName, Line_Manger: idd.name, LM_ID: idd.UID, })
            toast.success("User Added");
            // setTimeout( ()=> history("/logout"), 2500);
        } catch (error) {
            toast.error(error.message)
        }

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
                    <br /><br />
                    {/* ========================================== */}
                    {/* Radio Button to chosse line manger or user */}
                    {/* ========================================== */}
                    <select id="test" name="lineManger" onChange={handleInputChange} value={state.lineManger}>
                        <option value="">--Please choose an option--</option>
                        {Object.keys(auth.lm).map((id) => {
                            return (
                                <option key={id} value={auth.lm[id].UID}>{auth.lm[id].name}</option>
                            )
                        })}
                        {/* <option value="Zaki">Zaki</option>
                            <option value="Rashed">Rashed</option>
                            <option value="Ali">Ali</option>
                            <option value={auth.user.uid}>Salem</option> */}
                    </select>
                    <br /><br />
                    <button type="submit">Add</button>

                </form>


            </div>
        </div>
    )
}

export default NewAddUser;

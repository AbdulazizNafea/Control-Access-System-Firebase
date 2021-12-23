import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//import {getDatabase , ref ,set}  from "firebase/database";
// import 'firebase/compat/database';
import fireDb from '../firebase'
import { Link, useNavigate, useParams } from 'react-router-dom';


const initialState = {
    from_email: "",
    name: "",
    email: "",
    contact: "",
    description:"",
    title:"",
    status:"",
};

const VacContrill = () => {

    const [state, setState] = useState(initialState);
      const [data, setData] = useState({});

    const { from_email, from_name , description ,title ,status} = state;

    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fireDb.child("Requests/Vaction/").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        })

        return () => {
            setData({});
        }
    }, [id]);



    useEffect(() => {
        if (id) {
            setState({ ...data[id] })
        } else {
            setState({ ...initialState })
        }
        return () => {
            setState({ ...initialState })
        }
    }, [id, data])








    const handleSubmit = (e) => {
        e.preventDefault();

            fireDb.child(`Requests/Vaction/${id}`).set(state, (err) => {
                if (err) {
                    toast.error("System error" + err);
                } else {
                    toast.success("user updated successfully")
                }
            });
             setTimeout(() => history("/vac"), 500);
        
    }

    const handleInputChange = (e) => {
        setState((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }));

    }


    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }}
                onSubmit={handleSubmit}>

                <br/>
                <label htmlFor="id"> Emp Email : {from_email}</label>

                <br/>
                <label htmlFor="name"> Name :  {from_name}</label>

                <br/>
                <label htmlFor="emai"> title : {title}</label>
                
                <br/>
                <label htmlFor="contact"> description : {description}</label>
                <br/>

                <br/><br/>
                <label>Set Status of Request</label>
                    <br />
                    <select name="status" onChange={handleInputChange} value={status}>
                        <option value="User type:-" >Chose Status:</option>
                        <option value="Aproval">Aproval</option>
                        <option value="Reject">Reject</option>

                    </select>
                    <br/><br/>

                

                <input type="submit" value={id ? "update" : "save"} />
            </form>
            <Link to={"/2"} className="link">cancel</Link>
            <p className="test" heloo />

        </div>
    )
}
export default VacContrill

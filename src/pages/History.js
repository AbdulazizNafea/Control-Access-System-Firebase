import React, { useState, useEffect } from 'react'
import { useAuth } from '../authContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Style.css"
import fireDb from "../firebase"

const History = () => {
    const auth = useAuth();
    const [data, setData] = useState({});
    const [state, setState] = useState({
        req: "Aproval",
    });
    const handleOnSubmit = async (e) => {
        e.preventDefault();        
            if (state.req === "Aproval") {
                fireDb.child("Requests/").orderByChild("id_lm").equalTo(auth.user.uid).on("value",  (snapshot) =>  {
                    if (snapshot.val() !== null) {
                        fireDb.child("Requests/").orderByChild("status").equalTo("Aproval").on("value", (snapshot) => {
                            if (snapshot.val() !== null) {
                                setData({ ...snapshot.val() });
                            } else {
                                setData({});
                            }
                        });

                    } else {
                        setData({});
                    }
                });

            } else if (state.req === "Reject") {
                fireDb.child("Requests/").orderByChild("id_lm").equalTo(auth.user.uid).on("value", (snapshot) => {
                    if (snapshot.val() !== null) {
                        fireDb.child("Requests/").orderByChild("status").equalTo("Reject").on("value", (snapshot) => {
                            if (snapshot.val() !== null) {
                                setData({ ...snapshot.val() });
                            } else {
                                setData({});
                            }
                        });

                    } else {
                        setData({});
                    }
                });

            }
        
    }

    


    // useEffect(() => {
    //     reqData();
    // }, [auth.user.uid]);



    const onDelete = (id) => {
        if (window.confirm('Are you sure you want delete this user?')) {
            fireDb.child(`Requests/${id}`).remove((err) => {
                if (err) {
                    toast.error(err)
                } else {
                    toast.success("user deleted successfully");
                }
            })
        }
    }


    const handleInputChange = (e) => {
        setState((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }));
    }



    return (
        <div>
            {auth.user.email}

            <form onSubmit={handleOnSubmit}>

            <select name="req" onChange={handleInputChange} value={state.req}>
                <option value="User type:-" >req type-</option>
                <option value="Aproval">Aproval</option>
                <option value="Reject">Reject</option>
            </select>

            <button type="submit">save</button>
            </form>

            <table className="ttt">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>description</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>type</th>
                        <th style={{ textAlign: "center" }}>aaa</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        return (
                            <tr className="ttt" key={id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data[id].from_name}</td>
                                <td>{data[id].from_email}</td>
                                <td>{data[id].description}</td>
                                <td>{data[id].status}</td>
                                <td>{data[id].type}</td>
                                <td>
                                    <Link to={`/ActionControl/${id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>

                                    <button className="btn btn-delete" onClick={() => onDelete(id)}>Delete</button>

                                    <Link to={`/update/${id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>

            <Link to="/2">Go Back</Link>



        </div>
    )
}

export default History


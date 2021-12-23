import React, { useState, useEffect } from 'react'
import { useAuth } from '../authContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Style.css"
import fireDb from "../firebase"

const ResReq = () => {
    const auth = useAuth();
    const [data, setData] = useState({});
    // const [data1, setData1] = useState({});

    // const reqData = () => {
    //     fireDb.child("Requests/leave/").orderByChild("id_lm").equalTo(auth.user.uid).on("value", (snapshot) => {
    //         if (snapshot.val() !== null) {
    //             setData({ ...snapshot.val() });
    //         } else {
    //             setData({});
    //         }
    //     });
    // }

    useEffect(() => {
        const reqData = () => {
            fireDb.child("Requests/").orderByChild("id_lm").equalTo(auth.user.uid).on("value", (snapshot) => {
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
        }

        reqData();
    }, [auth.user.uid]);




 
    


    const onDelete= (id)=>{
        if(window.confirm('Are you sure you want delete this user?')){
          fireDb.child(`Requests/${id}`).remove((err)=> {
            if(err){
              toast.error(err)
            }else{
              toast.success("user deleted successfully");
            }
          })
        }
      }


    
    return (
        <div>
            {auth.user.email}

            <table className="ttt">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>description</th>
                        <th style={{textAlign: "center"}}>Status</th>
                        <th style={{textAlign: "center"}}>type</th>
                        <th style={{textAlign: "center"}}>aaa</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        return(
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

                                    <button className="btn btn-delete" onClick={()=> onDelete(id) }>Delete</button>

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

export default ResReq

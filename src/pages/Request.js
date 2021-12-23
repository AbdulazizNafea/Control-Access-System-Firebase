import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { toast } from 'react-toastify';
import "../App.css"
// import { getDatabase } from "firebase/database";
import { useNavigate } from 'react-router';
import fireDb from '../firebase'
import { Link } from 'react-router-dom';



const Request = () => {
    const auth = useAuth();



    const [state, setState] = useState({
        description: "",
        req: "",
        Status: "Sending",
    });


    const history = useNavigate();
    // var idd;
    //=================انقلها كونتكست اذا كنت فاضي==================افضل طريقة نمسك فيها الداتا محددة===================
    const [data, setData] = useState({});
    
    const User_Ftch = () => {
        fireDb.child("user/").orderByChild("UID").equalTo(auth.user.uid).once("child_added", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
                // idd=snapshot.val();
            } else {
                setData({});
            }
            
        });
        return () => {
            setData({});
        }
    }
    useEffect(() => {
        User_Ftch();
    }, [])



    //===================================================================================================================






    //const db = getDatabase();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // if (state.req === "Leave") {
            const testAdd = () => {
                try {
                    const refrence = fireDb.child(`Requests/`);
                    const autoID = refrence.push().key
                    refrence.child(autoID).set({
                        from_uid: data.UID, from_email: data.email, from_name: data.name, status: state.Status, description: state.description, type: state.req, to_email: data.LM_Email, to_name: data.Line_Manger, id_lm: data.LM_ID, id: autoID
                    })
                    // set({
                    //     from_uid: idd.UID, from_email: idd.email, from_name: idd.name, status: idd.Status, description: state.description, title: state.req, to_email: idd.LM_Email, to_name: idd.Line_Manger, id_lm: idd.LM_ID, id: autoID
                    // })
                    toast.success("تم الارسال");
                    setTimeout(() => { history("/2") }, 1000);
                } catch (error) {
                    toast.success(error.message)
                }
            }
            testAdd();
        // } else if (state.req === "Va") {

        //     const testAdd = () => {
        //         const refrence = fireDb.child(`Requests/`);
        //         const autoID = refrence.push().key
        //         refrence.child(autoID).set({
        //             from_uid: data.UID, from_email: data.email, from_name: data.name, status: state.Status, description: state.description, title: state.req, to_email: data.LM_Email, to_name: data.Line_Manger, id_lm: data.LM_ID, id: autoID
        //         })
        //         toast.success("success")
        //     }
            // testAdd();

            //================================error import try later=========================================
            // const ref_req = ref(`Requests/leave/`);
            // auth.newRequest(ref_req,{from_uid:idd.UID, from_email:idd.email, from_name:idd.name, status:state.Status, description:state.description, title:state.req, to_email:idd.LM_Email, to_name:idd.Line_Manger, id_lm:idd.LM_ID, })
            //=========================================================================


            //================================error import try later=========================================
            // const ref_req = ref(`Requests/leave/`);
            // auth.newRequest(ref_req,{from_uid:idd.UID, from_email:idd.email, from_name:idd.name, status:state.Status, description:state.description, title:state.req, to_email:idd.LM_Email, to_name:idd.Line_Manger, id_lm:idd.LM_ID, })
            //=========================================================================

        // }
    }
    const handleInputChange = (e) => {
        setState((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }));
    }

    //console.log(data)

    return (
        <div className="App">
            <center>
                <div  >
                    <form onSubmit={handleOnSubmit}>
                        <h1>Add a req</h1>
                        <table>
                          <tbody>
                            <tr>
                                <td>
                                     name: {data.name}
                                </td>
                                <td>
                                line mangere name: {data.Line_Manger}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                     email:{data.email}
                                </td>
                                <td>
                                line mangere email:{data.LM_Email}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    chose the Request:
                                </td>
                                <td>
                                    <select name="req" onChange={handleInputChange} value={state.req}>
                                        <option value="User type:-" >req type-</option>
                                        <option value="Leave">Leave</option>
                                        <option value="Va">Vacation</option>
                                    </select>
                                </td>
                            </tr>

                            

                            <tr>
                                <td>
                                    description:
                                </td>
                                <td>
                                    <input
                                        name="description"
                                        id="description"
                                        value={state.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <br/><br/>
                        <button type="submit">Add</button>
                    </form>
                </div>
                <br/><br/>
                <Link to="/2">GO To Home</Link>
            </center>
        </div>
    )
}

export default Request;

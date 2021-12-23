import React, { useState } from 'react';
import { useAuth } from '../authContext';
//import fireDb from '../firebase';
import { toast } from 'react-toastify';
import "../App.css"
import { getDatabase, ref, set } from "firebase/database";

//نايف اقرطها 


const AddUser = () => {
    const auth = useAuth();
    //const history = useNavigate();
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        lineManger: "",
        reqTitle: "",
        reqDisc: "",
        deptName: "",
        manger: "",
    });



    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            await auth.register(state.email, state.password)
            toast.success("secussefuly");
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
       
        const db = getDatabase();
        const refInfo = ref(db,'user/'+ auth.user.uid);
       await set(refInfo, {name:state.name, email:state.email, Line_Manger: state.lineManger ,UID: auth.user.uid}, (err)=>{
            if(err){
                toast.error("System error"+err);
            }else{
                toast.success("user updated successfully")
                
            }

        });






        //const refDept = ref(db,'user/'+ auth.data.uid +'/dept');
        //const refReq = ref(db,'user/'+ auth.user.uid +'/req');
        //const refNewReq= ref(db,'user/'+ auth.user.uid +'/req/'+ state.reqTitle + time);
         //const time =  moment().format('MMMM Do YYYY, h:mm:ss a');





        // set(refDept, {deptName:state.deptName, manger:state.manger}, (err)=>{
        //     if(err){
        //         toast.error("System error"+err);
        //     }else{
        //         toast.success("user updated successfully")
        //     }
        // });

        //auth.createUser(refInfo, {name:state.name, email:state.email , UID:auth.user.uid});
        //auth.createUser(refDept, {deptName:state.deptName, manger:state.manger});
        //auth.newRequest({...req} , `user/${auth.user.uid}/req/`);
        
    
    //=================================this set way can customise key id====================================
        // set(refNewReq, {reqTitle:state.reqTitle, reqDisc:state.reqDisc}, (err)=>{
        //     if(err){
        //         toast.error("System error"+err);
        //     }else{
        //         toast.success("user updated successfully")
        //     }
        // })
    //======================================================================================================

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\THIS IS REFERANCE HOW CAN YOU GET ID/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
    //var database = firebase.database();
    // var rootRef = database.ref();
    // var autoId = rootRef.push().key
    // rootRef.child(autoId).set({
    // key: value,
    // key: value,
    // key: value,
    // autoid: autoId
    // })
    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    






    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<THIS BEST WAY TO ADD THE AUTO ID IN CHILD AND INSIDE CHILD<<<<<<<<<<
    // const testAdd = ()=>{
    //    const refrence = fireDb.child(`user/${auth.user.uid}/req/`);
    //    const autoID= refrence.push().key
    //    refrence.child(autoID).set({
    //        ...req,
    //        id:autoID
    //    })
    // }
    //  testAdd();
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    //,,,,,,,,,,,,,,,,,OLD WAY IT IS OK BUT YOU CAN NOT GET THE ID TO PUT IT INSIDE TH CHILD,,,,,,,,,,,,,,,,

        // fireDb.child(`user/${auth.user.uid}/req/`).push( req, (err) =>{
        //    if(err){
        //        toast.error("System error");
        //    }
        //    else{
        //        toast.success("user added successfully");
        //    }
        // });
    //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    
        //setTimeout( ()=> history("/"), 100);

    }

    //we want to add user by 'uid' and have 2 child node "info - requests"

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
                    <label>email</label>
                    <br />
                    <input
                        name="email"
                        id="email"
                        value={state.email}
                        onChange={handleInputChange}
                        required
                    />
                    <br /><br />
                    <label>Password</label>
                    <br />
                    <input
                        name="password"
                        id="password"
                        value={state.password}
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
                    <label>Manger</label>
                    <br />
                    <input
                        name="manger"
                        id="manger"
                        value={state.manger}
                        onChange={handleInputChange}
                        required
                    />
                    <br /><br />
                    <label>requst title</label>
                    <br />
                    <input
                        name="reqTitle"
                        id="reqTitle"
                        value={state.reqTitle}
                        onChange={handleInputChange}
                        required
                    />
                    <br /><br />
                    <label>reqDisc</label>
                    <br />
                    <input
                        name="reqDisc"
                        id="reqDisc"
                        value={state.reqDisc}
                        onChange={handleInputChange}
                        required
                    />
                    <br /><br />
                    <select name="lineManger" onChange={handleInputChange} value={state.lineManger}>
                    {Object.keys(auth.lm).map((id, index) => {
                        return(
                            <option value={auth.lm[id].name}>{auth.lm[id].name}</option>
                        )
                    })}
                   
                            </select>



                    <br /><br />
                    <button type="submit">Add</button>

                </form>


            </div>
        </div>
    )
}

export default AddUser;

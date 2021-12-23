import React from 'react'
import { useAuth } from '../authContext';
import { Link } from 'react-router-dom';
import "../App.css"
// import fireDb from "../firebase"


const Home = () => {
  const auth = useAuth();

  const log_out = () => {
    auth.logout();
  }

  const test = auth.req;
  

  return (
    <div className="App">
      <button onClick={log_out}> Logout</button>
      <h1>
        {auth.user ? `welcome: ${auth.user.email} ` : <Link to="/signin"> Siginin</Link>}
      </h1>
      -----------------------------------------------------------------------------------
      <br/>
     
      -----------------------------------------------------------------------------------
      ___________________________________________________________________________________

      {Object.keys(auth.data).map((id, index) => {
        return (
          <div key={id}>
            <h2><span>{index + 1}:-</span> {auth.data[id].name} - {auth.data[id].email} - {auth.data[id].UID} - {auth.data[id].LM} </h2>
          </div>
        );
      })}

      ____________________________________LM____________________________________________



      {Object.keys(auth.lm).map((id, index) => {
        return (
          <div key={id}>
            <h2><span>{index + 1}:-</span> {auth.lm[id].name} - {auth.lm[id].email} - {auth.lm[id].UID}  </h2>
          </div>
        );
      })}


      ____________________________________req_Leave___________________________________________

      

      {Object.keys(test).map((id, index) => {
        return (
          <div key={id}>
            <h2><span>{index + 1}:-</span> {test[id].from_uid} - {test[id].from_name} - {test[id].from_email}  </h2>
          </div>
        );
      })}

    </div>
  )
}
export default Home

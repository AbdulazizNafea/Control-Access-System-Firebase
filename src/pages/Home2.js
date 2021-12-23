import React,{useState , useEffect} from 'react'
import { useAuth } from '../authContext';
import { Link } from 'react-router-dom';
import "../App.css"
import fireDb from "../firebase"
import { useNavigate } from 'react-router';



const Home2 = () => {
  const auth = useAuth();
  const history = useNavigate();


//   var idd;
//   fireDb.child("user/").orderByChild("UID").equalTo(auth.user.uid).on("child_added", (snapshot) => {
//     idd=snapshot.val()
// });

//   if (idd.role === "Admin"){
//     console.log("Admin123456")
//      setTimeout(() => { history("/2") }, 10);

//   }

  // select from
  
  // if role === "Admin"
  // push (/admin)

  const log_out = () => {
    auth.logout();
  }

  const [data, setData] = useState({});

  useEffect(() => {
    const User_Ftch = () => {
        fireDb.child("user/").orderByChild("UID").equalTo(auth.user.uid).on("child_added", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        });
  
        fireDb.child("LM/").orderByChild("UID").equalTo(auth.user.uid).on("child_added", (snapshot) => {
          if (snapshot.val() !== null) {
              setData({ ...snapshot.val() });
          } else {
              setData({});
          }
      });
        return () => {
            setData({});
        }
  
    } 
    User_Ftch();
      
  }, [auth.user.uid])
  console.log(data.name)


  


  return (
    <div className="App">
     
      <h1>
        {auth.user ? `welcome: ${auth.user.email} ` : <Link to="/signin"> Siginin</Link>}<button onClick={log_out}> Logout</button>
      </h1>


      
      {/* its clear i think */}
      <button><Link to="/req">Add Request</Link></button> 
      <br/> <br/>


      {/* any request has my uid in "from_uid" show me the all req*/}
      <button><Link to="/his"> Request history </Link></button> 
      <br/> <br/>


      {/* if the requst conin my uid or email in "first_email" or "second_email"*/}
      <button><Link to="/res"> Reseve Request </Link></button> 
      <br/><br/>


      <Link to="/vac" > Vacation </Link>


      {data.name}


      <br/>
    </div>
  )
}
export default Home2

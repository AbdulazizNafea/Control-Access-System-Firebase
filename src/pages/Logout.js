import React ,{useEffect}from 'react'
import { useAuth } from '../authContext';
import "../App.css"
import { useNavigate } from 'react-router';


const Home = () => {
    const auth = useAuth();
    const history = useNavigate();

  

 
    useEffect(() => {
      setTimeout( ()=>{ 
            auth.logout();
             history("/")
            },50);
        }, [history ,auth])    
    
   return (
    <div className="App">

       
    </div>

    )
}

export default Home

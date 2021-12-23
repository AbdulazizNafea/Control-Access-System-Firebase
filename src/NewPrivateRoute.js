import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext';

 const NewPrivateRoute = () => 
 {
    const auth = useAuth();
    if(auth.user == null) return <></>

    else return auth.user ? <Outlet/> : <Navigate to="/signin" />;
}
export default NewPrivateRoute;
import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div>
            <center>
            <h1> 404 Page not Found </h1>
            <h2>Go to <Link to="/">Home</Link></h2>
            </center>
            
        </div>
    )
}

export default PageNotFound

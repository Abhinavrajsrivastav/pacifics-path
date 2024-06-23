//Importing libraries
import React, { useState } from 'react';

//Importing routing functions
import { Link, useNavigate } from 'react-router-dom';

//Importing context hooks
import {AuthContext} from '../Context/AuthProvider';
import { useContext } from 'react';
import UserAuth from '../Api/AuthFunction_Call';

//Importing CSS
import './Navbar.css';



function NavBar() {

//Some Data members-----------------
  const windowSize = window.innerWidth;
  const authContext = useContext(AuthContext); 

  const {setUser, user, auth, data, setData} = useContext(AuthContext);
  const navigate = useNavigate();

  const email = authContext.user?.email;
    const { handleGoogleSignIn, handleEmailSignup, EmailSignin, handleForgotPassword, handleLogout } = UserAuth();

// Logout function---------------
    const logout = () =>{
      handleLogout();
    }

  return (
    <div className="nav-container">
      <div className="nav-brand">
        <div className="nav-brand-logo">
          <img src="./Icons/cat.png" alt="" style={{ height: '50px', width: '50px' }} className='m-3'/>
        </div>
        <div className="nav-brand-name">googcom</div>
      </div>
      <div className="nav-links">
        {windowSize > 1005 && 
        <>
        <Link to="/pacifics-path"><a href="#" className="nav-link" style={{opacity: "1"}}>Home</a></Link>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Services</a>
        <a href="#" className="nav-link">Contact</a>
        {email==null?<Link to="/login"><button className="nav-login-btn">login</button></Link>:<a onClick={()=>logout()}>logout</a>}
        </>
        }
        {email==null?<Link to="/signup"><button className="nav-login-btn">SignUp</button></Link>:<img src={data.photoURL} style={{height: "30px", width: "30px", marginRight: "20px", borderRadius: "50%" }} onClick={()=>navigate("/profile")}></img>}
      </div>
    </div>
  );
}

export default NavBar;

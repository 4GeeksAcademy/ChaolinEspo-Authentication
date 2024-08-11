import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("");
    const navigate = useNavigate ();

    const handleLogin= async(event)=>{
        event.preventDefault()
        const success = await actions.logIn({
            email:email,
            password:password

        })
        if (success) {
            navigate("/private")
        } else {
            alert("something went wrong")
        }
    }

	return (
      <div>

        <input 
            type="text" 
            name="Email"
            value={email}
            placeholder= "Email"
            onChange={(e)=> setEmail(e.target.value)}       
        />

        <input
            type="text" 
            name="Password"
            value={password}
            placeholder="password"
            onChange={(e)=> setPassword(e.target.value)}
        />
        <button 
            type="button" 
            onClick={handleLogin}
            class="btn btn-primary">
            login
        </button>
        <Link to="/signup">click here to signup</Link>

      </div>
		
	);
};

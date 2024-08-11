import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        console.log("sending signup request with email: ", email);
        event.preventDefault()
        const success = await actions.signUp({
            email: email,
            password: password

        })
        if (success) {
            navigate("/login")
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
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                name="Password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                onClick={handleSignup}
                class="btn btn-primary">
                signup
            </button>


        </div>

    );
};

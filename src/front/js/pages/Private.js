import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Private = () => {
    const { actions } = useContext(Context)
    const [isAuthenticated, setIsAuthenticated] = useState("pending")

    useEffect(() => {
        let authenticate = async () => {
            try {
                const result = await actions.goPrivate();
                setIsAuthenticated(result ? "yes" : "no");
            } catch (error) {
                console.error("error occurred during authentication: ", error);
                setIsAuthenticated("no");
            }
        };

        authenticate();
    }, [actions]);

    switch (isAuthenticated) {
        case "pending":
            return (
                <div>
                    <h1>authentication in progress</h1>
                    <p>please wait while we check your authentication status</p>
                </div>
            )
        case "yes":
            return (
                <div>
                    <h1>private page accessed</h1>
                    <p>this page is accessible to successfully logged in users</p>
                </div>
            )
            case "no":
                return (
                    <div>
                        <h1>access denied</h1>
                        <p>you are not an authenticated user. please logn in successfully to access the private page</p>
                        <Link to="/login">
                        <p>click here to login</p>
                        </Link>
                    </div>
                )
    }
};


export default Private;
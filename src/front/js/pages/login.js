import React from "react";
import { LoginForm } from "../component/login-form";
import "../../styles/login.css";

export const Login = () => {

    return (
        <div className="container-login">
            <div className="login w-75">
                <div className="w-50 login-left">
                    <h1>OPTIMA</h1>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
                <div className="w-50 login-right">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

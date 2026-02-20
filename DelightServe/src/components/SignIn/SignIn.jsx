import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";

const SignIn = () => {

    const apiURL = import.meta.env.VITE_API_URL;
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    // const [isLoggedIn, setIsLoggedIn] = useState(!!user?.phone);
    const [loginError, setLoginError] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");

        try {
            if (!credentials?.email) {
                setLoginError("Email should not be empty!");
                return;
            }
            if (!credentials?.password) {
                setLoginError("Password should not be empty!");
                return;
            }
            const response = await axios.post(
                apiURL + "/api/auth/login",
                credentials
            );
            const { token } = response.data;

            login(token);
            // setIsLoggedIn(true);
        } catch (error) {
            if (error?.response?.data?.message) {
                setLoginError(error?.response?.data?.message);
                return;
            }
            if (error?.message) {
                setLoginError(error?.message);
                return;
            }
            setLoginError("Invalid Email or password.", error);
        }
    };

    return (
        <div className="signin-view">
            <div className="login-panel">
                <ul className="login-container">
                    <li>
                        <label htmlFor="email" className="label">Email*</label>
                        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} className="input" />
                    </li>
                    <li>
                        <label htmlFor="password" className="label">Password*</label>
                        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="input" />
                    </li>
                    <li>
                        {loginError && <p className="error error-message">{loginError}</p>}
                    </li>
                    <li className="button-container">
                        <input type="button" className="button" value="Sign In" onClick={handleSubmit} />
                    </li>
                </ul>
            </div>
        </div>
    )
};

export { SignIn };
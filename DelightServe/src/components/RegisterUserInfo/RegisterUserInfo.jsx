import { useState } from "react";
import api from "../../contexts/APIContext";
import { useAuth } from "../../contexts/AuthContext";

import "./index.css";


const RegisterUserInfo = () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const { login } = useAuth();
    const initialSignupInfo = {
        name: "",
        phone: "",
        email: "",
        // role: "user",
        status: "completed"
    }

    const [signupInfo, setSignupInfo] = useState(initialSignupInfo);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const addFieldValue = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        try {
            const { ...signupInfoCopy } = signupInfo;
            if (!signupInfo?.name) {
                setError("Name should not be empty!");
                return;
            }
            if (!signupInfo?.phone) {
                setError("Phone should not be empty!");
                return;
            }
            const response = await api.post(apiURL + "/api/auth/user-register", signupInfoCopy);

            if (response?.status === 201 && !!response?.data?.token) {
                const { token } = response.data;
                login(token);
                // setSuccess("Registered successfully. Kindly do SignIn");
                setSignupInfo(initialSignupInfo);
            }

            //   navigate("/dashboard");
        } catch (error) {
            if (error?.response?.data?.message) {
                setError(error?.response?.data?.message);
                return;
            }
            if (error?.message) {
                setError(error?.message);
                return;
            }
            setError("Already info present!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="registeruserinfo-view">
            <div className="signup-wrap">
                <div className="signup-html">
                    <div className="signup-form">
                        <div>
                            <div className="group">
                                <label htmlFor="name" className="label">Name*</label>
                                <input type="text" name="name" placeholder="Name" value={signupInfo.name} onChange={addFieldValue} className="input" />
                            </div>
                            <div className="group">
                                <label htmlFor="phone" className="label">Mobile*</label>
                                <input type="text" name="phone" placeholder="Mobile" value={signupInfo.phone} onChange={addFieldValue} className="input" />
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="label">Email</label>
                                <input type="text" name="email" placeholder="Email" value={signupInfo.email} onChange={addFieldValue} className="input" />
                            </div>
                            <div className="group group-error">
                                {error && <p className="error">{error}</p>}
                                {success && <p className="success">{success}</p>}
                            </div>
                            <div className="group event-footer">
                                <input type="submit" className="button" value="Save" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export { RegisterUserInfo };
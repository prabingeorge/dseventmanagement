import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../contexts/APIContext";
import "./index.css";
import starLogo from "../../assets/images/header/logo3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelopeCircleCheck, faSignOut, faSignIn, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const AdminHeader = () => {

    const { user, logout } = useAuth();
    const apiURL = import.meta.env.VITE_API_URL;
    let location = useLocation();
    const isEventInfoPage = location?.pathname.includes('eventinformations') || location?.pathname.includes('home');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await api.get(apiURL + "/api/admin/health-check");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="header-view">
            <div className="middle-header">
                <div>
                    <Link to={'/admin/dashboard'}>
                        <img src={starLogo} alt="logo" className="header-logo" />
                    </Link>
                </div>
                <div className="menu-container">
                    {!isEventInfoPage && <label>
                        <FontAwesomeIcon icon={faCartShopping} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </label>}
                    {user?.name ? <>
                        <label onClick={logout} title="logout">
                            {user?.name}
                            <FontAwesomeIcon icon={faSignOut} size="1x" style={{ color: '#ffa500', paddingLeft: '5px' }} />
                        </label>
                    </> :
                        <label>
                            <FontAwesomeIcon icon={faSignIn} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                            <Link to="/login">Sign In</Link>
                        </label>}
                    {/* <label>
                        <FontAwesomeIcon icon={faHeart} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                        Wishlist (0)
                    </label> */}
                </div>
            </div>
        </div>
    )
};

export { AdminHeader };
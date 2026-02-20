import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { renderToString } from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Images from "../Images/Images";
import { CartContext } from "../../contexts/Cart";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../contexts/APIContext";
import "./index.css";

const EmailTemplate = ({ cartItems }) => {
    return (
        // < !DOCTYPE html >
        <html>
            <head>
                <title>Furniture App</title>
            </head>
            <body>
                <div id="root">
                    <div className="email-view">
                        <ul style={{ border: 'solid #1161ee', listStyle: 'none', padding: '0px' }}>
                            {cartItems?.length > 0 && cartItems.map(item => {
                                return (
                                    <li key={item?.categoryListItemId} style={{ display: 'flex', border: '2px solid #ffa500', margin: '5px', padding: '10px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div>
                                                Name: <label style={{ fontWeight: 'bold' }} key={item?.id}>{item?.itemName}</label>
                                            </div>
                                            <div>
                                                Price: <label style={{ fontWeight: 'bold' }} key={item?.id}>
                                                    <FontAwesomeIcon icon={faIndianRupee} size="1x" />{item?.price}
                                                </label> per Product
                                            </div>
                                            <div>
                                                Discount: <label style={{ fontWeight: 'bold' }} key={item?.id}>{item?.discountPrice}</label>
                                            </div>
                                            <div>
                                                Total: <label style={{ fontWeight: 'bold' }} key={item?.id}>{(item?.price - item?.discountPrice) * item?.quantity}</label>
                                            </div>
                                            <div>
                                                Quantity: <label style={{ fontWeight: 'bold' }} key={item?.id}>{item?.quantity}</label>
                                            </div>
                                        </div>
                                        <div>
                                            <img style={{ height: '200px' }} src={'cid:' + item?.id + '@example.com'} alt={item?.image_name} />
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    )
}

const ProductConfirmation = () => {

    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    let navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;

    const [emailValidationError, setEmailValidationError] = useState("");
    const [error, setError] = useState("");

    const eventTimeInfo = ['Morning', 'Noon', 'Evening'];
    const genderWeddingInfo = ['Bride', 'Groom'];
    const genderBirthdayInfo = ['Girl', 'Boy'];

    const savePurchaseDetails = async () => {

        try {
            const promises = cartItems.map(async (cartItem) => {
                if (!cartItem?.venuInfo) {
                    return;
                }
                if (cartItem?.cateringListItemId) {
                    const cateringDetail = {
                        userId: user?.userId,
                        categoryId: cartItem?.categoryId,
                        categoryListId: cartItem?.categoryListId,
                        cateringListItemId: cartItem?.cateringListItemId,
                        quantity: cartItem?.quantity,
                        amount: cartItem?.price,
                        venueInfo: cartItem?.venuInfo
                    }
                    await api.post(apiURL + "/api/user/catering-booking-detail", cateringDetail);
                } else {
                    const detail = {
                        userId: user?.userId,
                        categoryId: cartItem?.categoryId,
                        categoryListId: cartItem?.categoryListId,
                        categoryListItemId: cartItem?.categoryListItemId,
                        quantity: cartItem?.quantity,
                        amount: cartItem?.price,
                        venueInfo: cartItem?.venuInfo
                    }
                    await api.post(apiURL + "/api/user/purchase-detail", detail);
                }
            });
            await Promise.all(promises);
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

    const sendConfirmationEmail = async () => {
        try {
            const html = renderToString(<EmailTemplate cartItems={cartItems} />);
            const attachments = [];
            cartItems.map(item => {
                const attachment = {
                    filename: item?.image_name,
                    path: "D:/Divine/furniturem/API/public/images/details/" + item?.imageName,
                    cid: item?.id + '@example.com' //"nodemailer@example.com", // matches the cid in the img src attribute
                };
                attachments.push(attachment);
            });

            const emailBody = {
                to: user?.email,
                subject: "Furniture Order Confirmation",
                message: html,
                attachments: attachments
            }

            await api.post(apiURL + "/api/user-profile/send-mail", emailBody);
            // if (response?.statusText === "Created") {
            //     setSuccess("Order updated successfully");
            //     clearCart();
            //     navigate('/delivery');
            // }
        } catch (error) {
            if (error?.response?.data?.message) {
                setEmailValidationError(error?.response?.data?.message);
                return;
            }
        }
    }

    const confirmedClick = async () => {
        await savePurchaseDetails();
        // await sendConfirmationEmail();
        clearCart();
        navigate('/delivery');
    };

    const removeItemClick = (item) => {
        removeFromCart(item);
    }

    const { user } = useAuth();

    // const [isLoggedIn, setIsLoggedIn] = useState(!!user?.phone);
    if (cartItems?.length === 0) {
        return (
            <div className="product-confirmation-view">
                <label className="no-product">No orders in the Cart!</label>
            </div>
        )
    }

    return (
        <div className="product-confirmation-view">
            <ul className="product-panel">
                {cartItems?.length > 0 && cartItems.map((item) => {
                    if (!item?.venuInfo) {
                        return;
                    }
                    return (
                        <>
                            <li key={item?.categoryListItemId} className="product-wrapper">
                                <div className="product-details">
                                    {item?.discountPrice && <>
                                        <div>
                                            Name: <label>{item?.itemName}</label>
                                        </div>
                                        <div>
                                            Price: <label>
                                                <FontAwesomeIcon icon={faIndianRupee} size="1x" />{item?.price}
                                            </label>
                                        </div>
                                        <div>
                                            Discount: <label>
                                                <FontAwesomeIcon icon={faIndianRupee} size="1x" />{item?.discountPrice}
                                            </label>
                                        </div>
                                        <div>
                                            Total: <label>
                                                <FontAwesomeIcon icon={faIndianRupee} size="1x" />{(item?.price - item?.discountPrice) * item?.quantity}
                                            </label>
                                        </div>
                                    </>}
                                    {!item?.discountPrice && <>
                                        <div>
                                            Name: <label>{item?.itemName} - {item?.foodName}</label>
                                        </div>
                                        {item?.description && <div>
                                            <label>({item?.description})</label>
                                        </div>}
                                        <div>
                                            Price: <label>
                                                <FontAwesomeIcon icon={faIndianRupee} size="1x" />{item?.price}
                                            </label>
                                        </div>
                                        <div>
                                            Guests: <label>{item?.venuInfo?.guests}</label>
                                        </div>
                                        <div>
                                            Total: <label>
                                                <FontAwesomeIcon icon={faIndianRupee} size="1x" />{(item?.price * item?.venuInfo?.guests)}
                                            </label>
                                        </div>
                                    </>}
                                    <div>
                                        <h5 className="venu-info-title">Venue Info:</h5>
                                    </div>
                                    <div>
                                        Location: <label>{item?.venuInfo?.location}</label>
                                    </div>
                                    <div>
                                        Date: <label>{item?.venuInfo?.eventDate}</label>
                                    </div>
                                    <div>
                                        Time: <label>{eventTimeInfo?.[item?.venuInfo?.eventTime - 1]}</label>
                                    </div>
                                    {item?.discountPrice && item?.categoryListId == 1 && <>
                                        <div>
                                            Gender: <label>{genderWeddingInfo?.[item?.venuInfo?.gender - 1]}</label>
                                        </div>
                                    </>}
                                    {item?.discountPrice && item?.categoryListId == 2 && <>
                                        <div>
                                            Gender: <label>{genderBirthdayInfo?.[item?.venuInfo?.gender - 1]}</label>
                                        </div>
                                    </>}
                                    {/* <div>
                                        Quantity: <label>{item?.quantity}</label>
                                    </div> */}
                                    <div className="footer-container">
                                        <FontAwesomeIcon title="Remove" icon={faTrashCan} size="1x" style={{ cursor: 'pointer' }} onClick={() => removeItemClick(item)} />
                                    </div>
                                </div>
                                <div>
                                    {!item?.foodId && (item?.categoryListId == 1) && <Images fileName={item?.imageName} path={`categorieslist/wedding/`} cssClass={'square-image'} />}
                                    {!item?.foodId && (item?.categoryListId == 2) && <Images fileName={item?.imageName} path={`categorieslist/birthday/`} cssClass={'square-image'} />}
                                    {item?.foodId && <Images fileName={item?.imageName1} path={`cateringlisttypes/fooditems`} cssClass={'square-image'} />}
                                </div>
                            </li>
                        </>
                    )
                })}
            </ul>

            {user && emailValidationError && <div className="email-validation-container">
                <div className="group group-error">
                    <label className="error">{emailValidationError}</label>
                </div>
            </div>}
            {user && error && <div className="email-validation-container">
                <div className="group group-error">
                    <label className="error">{error}</label>
                </div>
            </div>}
            {user && <div className="confirm-button-wrapper">
                <input type="button" className="button" value="Confirmed" onClick={confirmedClick} />
            </div>}
        </div>
    )
};

export default ProductConfirmation;
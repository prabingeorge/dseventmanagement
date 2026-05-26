import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import AppCarousel from './../Carousel/Carousel';
import { CartContext } from "../../contexts/Cart";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import api from "../../contexts/APIContext";
import './index.css';

const Home = () => {
    const { addSelectedCategoryToCart } = useContext(CartContext);
    const ourEvents = [{
        name: 'Wedding',
        imageName: 'wedding.jpg',
        navigatePath: '/categorieslist/1'
    },
    {
        name: 'Birthday',
        imageName: 'birthday.jpg',
        navigatePath: '/categorieslist/2'
    },
    {
        name: 'Communion',
        imageName: 'communion.jpg'
    },
    {
        name: 'Puberty',
        imageName: 'puberty.jpg'
    }];

    const ourCaterings = [{
        "cateringListItemTypeId": 1,
        "typeName": "Tiffin",
        "imageName": "tiffin.jpg",
        "cateringListItemId": 1
    },
    {
        "cateringListItemTypeId": 2,
        "typeName": "Meal",
        "imageName": "meal.jpg",
        "cateringListItemId": 1
    },
    {
        "cateringListItemTypeId": 5,
        "typeName": "Biriyani",
        "imageName": "biriyani.jpg",
        "cateringListItemId": 2
    }];

    const apiURL = import.meta.env.VITE_API_URL;

    const [ourDecorations, setOurDecorations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/categories-list-items-by-id", { categoryListId: 1 });
                const { data } = response;
                const slicedData = data.splice(0,4);
                setOurDecorations([...slicedData]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home-view">
            <div className="carousel-container">
                <AppCarousel></AppCarousel>
            </div>
            <div className='location-order-container'>
                <Link to={'/dashboard'} onClick={() => addSelectedCategoryToCart(1)} className='order-button'>View & Place Order</Link>
            </div>
            <div className="our-events">
                <h2>Our Events</h2>
                <p>We will support the events with our full support.</p>
                <div className="card-container">
                    <CardGroup>
                        {ourEvents?.map((event) => {
                            return (
                                <Card>
                                    <Card.Img className="d-block w-10 card-image" variant="top" src={`/images/dashboard/${event?.imageName}`} />
                                    <Card.Body>
                                        {event.navigatePath ? <Link to={event.navigatePath} onClick={() => addSelectedCategoryToCart(1)}>
                                            <Card.Title>{event?.name}</Card.Title>
                                        </Link> :
                                            <Card.Title>{event?.name}</Card.Title>}
                                    </Card.Body>
                                </Card>

                            )
                        })}
                    </CardGroup>
                </div>
            </div>
            <div className="our-events">
                <h2>Most Popular Decorations</h2>
                <p>The customers best choice decorations.</p>
                <div className="card-container">
                    <CardGroup>
                        {ourDecorations?.map((event) => {
                            return (
                                <Card>
                                    <Card.Img className="d-block w-10 card-image" variant="top" src={`/images/categorieslist/wedding/'}` + event?.imageName} />
                                    <Card.Body>
                                        <Link to={'/categorieslist/1'} onClick={() => addSelectedCategoryToCart(1)}>
                                            <Card.Title>{event?.itemName}</Card.Title>
                                        </Link>
                                    </Card.Body>
                                </Card>

                            )
                        })}
                    </CardGroup>
                </div>
            </div>
            <div className="our-events">
                <h2>Most Delicious Foods</h2>
                <p>We serve tasty and quality foods.</p>
                <div className="card-container">
                    <CardGroup>
                        {ourCaterings?.map((event) => {
                            return (
                                <Card>
                                    <Card.Img className="d-block w-10 card-image" variant="top" src={`/images/cateringlisttypes/foodmenu/${event?.imageName}`} />
                                    <Card.Body>
                                        <Card.Title>{event?.typeName}</Card.Title>
                                    </Card.Body>
                                </Card>

                            )
                        })}
                    </CardGroup>
                </div>
            </div>
            <div className="footer-container">
                <div>
                    <label className='label'>Info:</label>
                    <div className='info-details'>
                        <Link className="info-link" to={'/contact-information'}>Contact Us</Link>
                        <Link className="info-link" to={'/terms-of-service'}>Term of Services</Link>
                        <Link className="info-link" to={'/privacy-policy'}>Privacy Policy</Link>
                    </div>
                </div>
                <label className='label'>Our Mission:</label>
                <div className='misson-details'>
                    <p className='description'>We provide full-service catering for intimate gatherings to grand galas, specializing in modern American cuisine with customizable menus for corporate events and weddings. Our service includes menu planning with dietary considerations, professional staff for seamless service, setup of elegant buffet stations with high-quality linens, and complete breakdown/cleanup, ensuring a delicious and stress-free experience from concept to completion.</p>
                </div>
            </div>
        </div>
    )
};

export { Home };
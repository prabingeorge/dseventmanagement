import { useContext } from "react";
import { Link } from 'react-router-dom';
import AppCarousel from './../Carousel/Carousel';
import { CartContext } from "../../contexts/Cart";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './index.css';

const Home = () => {
    const { addSelectedCategoryToCart } = useContext(CartContext);
    const ourEvents = [{
        name: 'Wedding',
        imageName: 'wedding.jpg'
    },
    {
        name: 'Birthday',
        imageName: 'birthday.jpg'
    },
    {
        name: 'Communion',
        imageName: 'communion.jpg'
    },
    {
        name: 'Puberty',
        imageName: 'puberty.jpg'
    }];

    const ourDecorations = [{
        "categoryListId": 1,
        "categoryListItemId": 1,
        "itemName": "Gerbera Theme",
        "imageName": "1_1.jpg",
        "price": "20999",
        "discountPrice": "1000",
        "ratings": 5,
        "sendItemsCount": 1
    },
    {
        "categoryListId": 1,
        "categoryListItemId": 2,
        "itemName": "Royal Look",
        "imageName": "1_2.jpg",
        "price": "25999",
        "discountPrice": "1000",
        "ratings": 5,
        "sendItemsCount": 1
    },
    {
        "categoryListId": 1,
        "categoryListItemId": 3,
        "itemName": "Test",
        "imageName": "1_3.jpg",
        "price": "1000",
        "discountPrice": "100",
        "ratings": 5,
        "sendItemsCount": 3
    },
    {
        "categoryListId": 1,
        "categoryListItemId": 4,
        "itemName": "Test2",
        "imageName": "1_4.jpg",
        "price": "30000",
        "discountPrice": "900",
        "ratings": 4,
        "sendItemsCount": 10
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
                                        <Card.Title>{event?.name}</Card.Title>
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
                                    <Card.Img className="d-block w-10 card-image" variant="top" src={`/images/categorieslist/wedding/${event?.imageName}`} />
                                    <Card.Body>
                                        <Card.Title>{event?.itemName}</Card.Title>
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
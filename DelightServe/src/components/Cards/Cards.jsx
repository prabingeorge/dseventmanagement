import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/Cart";
import "./index.css";

const Cards = ({ cateringListItemId, cateringListItemTypeId, foodItems }) => {

    const { cateringCurrentItem, addToCartCatering } = useContext(CartContext);
    const navigate = useNavigate();
    const buyNowProduct = (selectedFoodItem) => {
        let selectedCateringItem = cateringCurrentItem;

        if (selectedCateringItem) {
            selectedCateringItem['cateringListItemTypeId'] = cateringListItemTypeId;
            selectedCateringItem['foodId'] = selectedFoodItem?.foodId;
            selectedCateringItem['foodName'] = selectedFoodItem?.foodName;
            selectedCateringItem['imageName1'] = selectedFoodItem?.imageName;
            selectedCateringItem['price'] = selectedFoodItem?.price;
            selectedCateringItem['description'] = selectedFoodItem?.description;
            addToCartCatering(selectedCateringItem);
        }

        navigate(`/eventinformations/catering/${cateringListItemId}`);
    };

    return (
        <CardGroup>
            {foodItems?.map((item) => {
                return (
                    <Card>
                        <Card.Img className="d-block w-10 card-image" variant="top" src={`/images/cateringlisttypes/fooditems/${item?.imageName}`} />
                        <Card.Body>
                            <Card.Title>{item?.foodName}</Card.Title>
                            <Card.Text>
                                {item?.description}
                            </Card.Text>
                            <Card.Text>
                                <label style={{ fontWeight: 'bold' }}>Price:</label> <FontAwesomeIcon icon={faIndianRupee} size="1x" />{item?.price} per person
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <input type="button" className="buy-now" onClick={() => buyNowProduct(item)} value={'Place Order'} />
                            {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                        </Card.Footer>
                    </Card>
                )
            })}
        </CardGroup>
    );
}

export { Cards };
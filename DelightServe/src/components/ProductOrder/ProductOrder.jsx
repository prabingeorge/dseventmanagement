import { useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Images from "../Images/Images";
import { CartContext } from "../../contexts/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const ProductOrder = () => {
    const { cartItems } = useContext(CartContext);
    let params = useParams();
    const navigate = useNavigate();

    const product = cartItems.find((cartItem) => cartItem.categoryListItemId === parseInt(params?.categoryListItemId));

    const [productQuantity, setProductQuantity] = useState(product?.quantity);

    const categoryListMap = [{ categoryListId: 1, type: 'wedding' }, { categoryListId: 2, type: 'birthday' }];
    const selectedCategoryListMap = categoryListMap.find((list) => list?.categoryListId == product?.categoryListId);

    const buyNowProduct = () => {
        navigate(`/eventinformations/decoration/${params?.categoryListItemId}`);
    };

    return (
        <>
            <div className="productorder-view">
                <div>
                    <Images fileName={product?.imageName} path={`categorieslist/` + selectedCategoryListMap?.type} cssClass={'order-rectangle-image'} />
                </div>
                <div className="order-right-panel">
                    <ul className="order-summary">
                        <li className="product-name">
                            {product?.itemName}
                        </li>
                        <li>
                            <label>Ratings:</label> {product?.ratings}
                        </li>
                        <li>
                            <label>Total Orders:</label> {product?.sendItemsCount}
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li>
                            <label>Price:</label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" />{product?.price}
                        </li>
                        <li>
                            <label>Discount:</label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" />{product?.discountPrice}
                        </li>
                        <li>
                            <label>Total Price:</label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" />{product?.price - product?.discountPrice}
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li>
                            <label>Total Price: </label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" />{(product?.price - product?.discountPrice) * productQuantity} (incl. of all taxes)
                        </li>
                        <li className="footer">
                            <input type="button" className="buy-now" onClick={() => buyNowProduct()} value={'Place Order'} />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default ProductOrder;
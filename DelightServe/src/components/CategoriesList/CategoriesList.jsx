import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Images from "../Images/Images";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const CategoriesList = () => {

    let navigate = useNavigate();
    let params = useParams();
    const apiURL = import.meta.env.VITE_API_URL;
    const { addToCart, cartItems, selectedCategoryId } = useContext(CartContext);
    const [categoriesListItems, setCategoriesListItems] = useState([]);

    const categoryListMap = [{ categoryListId: 1, type: 'wedding' }, { categoryListId: 2, type: 'birthday' }];
    const selectedCategoryListMap = categoryListMap.find((list) => list?.categoryListId == params?.categoryListId);

    const addToCartClick = (item) => {
        if (item?.isAddedToCart) {
            return;
        }
        let isAlreadyAddedtoCart = cartItems.find((item) => item?.categoryId == 1 && item?.venuInfo);

        if (!isAlreadyAddedtoCart) {
            addItemAndNavigate(item);
            return;
        }

        let text = "You have already selected a Decoration item! Click 'Ok' to change or Cancel";
        if (confirm(text) == true) {
            addItemAndNavigate(item);
        }
    }

    const addItemAndNavigate = (item) => {
        item.categoryId = selectedCategoryId;
        addToCart(item);
        navigate('/productorder/' + item.categoryListItemId);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/categories-list-items-by-id", { categoryListId: params?.categoryListId });
                const { data } = response;
                if (data?.length > 0 && cartItems?.length > 0) {
                    cartItems?.forEach((item) => {
                        const addedCartData = data?.find((datum) => datum?.categoryListItemId == item?.categoryListItemId && item?.venuInfo);
                        if (addedCartData) {
                            addedCartData.isAddedToCart = true;
                        }
                    });
                }
                setCategoriesListItems([...data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [params?.categoryListId]);

    return (
        <div className="categorieslist-view">
            <div>
                <div className="images-container">
                    {categoriesListItems?.length > 0 && categoriesListItems.map((image) => {
                        return (
                            <>
                                <ul key={image?.categoryListItemId} className="images-wrapper">
                                    <li>
                                        <Images fileName={image.imageName} path={`categorieslist/` + selectedCategoryListMap?.type} cssClass={'rectangle-image'} />
                                    </li>
                                    <li>
                                        <label className="product-name">{image.itemName}</label>
                                    </li>
                                    <li className="product-ratings-count">
                                        <div>
                                            <label>Ratings:</label> {image.ratings}
                                        </div>
                                        <div>
                                            <label>Total Ordered:</label> {image.sendItemsCount}
                                        </div>
                                    </li>
                                    <li>
                                        <label>Price:</label>
                                        <FontAwesomeIcon icon={faIndianRupee} size="1x" />{image.price}
                                    </li>
                                    <li className="button-container">
                                        <input type="button" className={image?.isAddedToCart ? 'added-to-cart' : 'add-to-cart'} value={image?.isAddedToCart ? 'Added' : 'Add'} onClick={() => addToCartClick(image)} />
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                </ul>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoriesList;
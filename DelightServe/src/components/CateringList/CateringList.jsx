import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Images from "../Images/Images";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart";
import './index.css';

const CateringList = () => {

    let navigate = useNavigate();
    const {addToCartCurrentCatering, selectedCategoryId } = useContext(CartContext);
    const [categoriesListItems, setCategoriesListItems] = useState([]);

    const addToCartClick = (item) => {
        item.categoryId = selectedCategoryId;
        addToCartCurrentCatering(item);
        navigate('/cateringlisttypes/' + item.cateringListItemId);
    }

    let params = useParams();
    const apiURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/catering-list-items-by-id", { categoryListId: params?.categoryListId });
                const { data } = response;
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
                    {categoriesListItems?.length > 0 && categoriesListItems?.map((image) => {
                        return (
                            <>
                                <ul key={image?.categoryListItemId} className="images-wrapper">
                                    <li>
                                        <Images fileName={image.imageName} path={`cateringlist/`} cssClass={'rectangle-image'} />
                                    </li>
                                    <li>
                                        <label className="product-name">{image.itemName}</label>
                                    </li>
                                    <li className="button-container">
                                        <input type="button" className="add-to-cart" value={'Add'} onClick={() => addToCartClick(image)} />
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

export { CateringList };
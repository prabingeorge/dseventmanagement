import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/Cart";
import api from "../../contexts/APIContext";
import "./index.css";
import { BreadcrumbExample } from "../Breadcrumb/Breadcrumb";

const Menu = () => {
    const dummyData = [{
        "categoryId": 1,
        "name": "Decoration"
    },
    {
        "categoryId": 2,
        "name": "Catering"
    }];
    const { selectedCategoryId, addSelectedCategoryToCart } = useContext(CartContext);
    const [categoriesList, setCategoriesList] = useState(dummyData);

    const apiURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiURL + "/api/user/categories");
                const { data } = response;
                setCategoriesList([...data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const changeCategory = (categoryId) => {
        addSelectedCategoryToCart(categoryId);
    };
    return (
        <div className="menu-view">
            <div className="bottom-header">
                <div>
                    <ul className="bottom-menu">
                        <li key={0} className={(selectedCategoryId == 0) ? 'active-menu' : 'non-active-menu'}>
                            <Link to={'/home'} onClick={() => changeCategory(0)}>Home</Link>
                        </li>
                        {categoriesList?.length > 0 && categoriesList.map((category) => {
                            return (
                                <li key={category?.categoryId} className={(selectedCategoryId == category?.categoryId) ? 'active-menu' : 'non-active-menu'}>
                                    <Link to={'/dashboard'} onClick={() => changeCategory(category?.categoryId)}>{category?.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="breadcrumb-header">
                <BreadcrumbExample />
            </div>
        </div>
    )
};

export { Menu };
import { useState, useEffect } from 'react';
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./index.css";

const AFoodMenu = () => {

    const apiURL = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategoryListId, setSelectedCategoryListId] = useState(0);
    const [cateringListItems, setCateringListItems] = useState([]);
    const [selectedCateringListItemId, setSelectedCateringListItemId] = useState(0);

    const [cateringListItemsTypes, setCateringListItemsTypes] = useState([]);
    const [selectedCateringListItemTypeId, setSelectedCateringListItemTypeId] = useState(0);

    const [foodMenu, setFoodMenu] = useState([]);

    const initialFoodMenuItem = {
        foodName: "",
        imageName: "",
        price: "",
        description: "",
        cateringListItemTypeId: ""
    };
    const [foodMenuItem, setFoodMenuItem] = useState(initialFoodMenuItem);
    const [foodmenuItemError, setFoodmenuItemError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiURL + "/api/user/categories");
                const { data } = response;
                setCategories(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const changeCategory = async (event) => {
        setFoodMenuItem(initialFoodMenuItem);
        setCategoriesList([]);
        setCateringListItems([]);
        setSelectedCategoryId(event.target.value || 0);
        setSelectedCategoryListId(0);
        if (!event.target.value) {
            return;
        }
        try {
            const response = await api.post(apiURL + "/api/user/categories-list-by-id", { categoryId: event.target.value });
            const { data } = response;
            setCategoriesList(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const changeCategoryList = async (event) => {
        setCateringListItems([]);
        setSelectedCategoryListId(event.target.value || 0);
        setSelectedCateringListItemId(0)
        if (!event.target.value) {
            return;
        }
        try {
            const response = await api.post(apiURL + '/api/user/catering-list-items-by-id', { categoryListId: event.target.value });
            const { data } = response;
            setCateringListItems(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const changeCategoryListItem = async (event) => {
        setSelectedCateringListItemId(event.target.value || 0);
        if (!event.target.value) {
            return;
        }
        try {
            const response = await api.post(apiURL + '/api/user/catering-list-items-types-by-id', { cateringListItemId: event.target.value });
            const { data } = response;
            setCateringListItemsTypes(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const changeCategoryListItemType = async (event) => {
        setSelectedCateringListItemTypeId(event.target.value || 0);
        if (!event.target.value) {
            return;
        }
        try {
            const response = await api.post(apiURL + '/api/user/food-menus-by-id', { cateringListItemTypeId: event.target.value });
            const { data } = response;
            setFoodMenu(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addFoodMenu = (event) => {
        const { name, value } = event.target;
        setFoodMenuItem({ ...foodMenuItem, [name]: value })
    }

    const addFoodMenuItem = async () => {
        if (!foodMenuItem?.foodName || !foodMenuItem?.imageName || !foodMenuItem?.price || !foodMenuItem?.description) {
            return;
        }
        try {
            const foodMenuItemData = { ...foodMenuItem, cateringListItemTypeId: selectedCateringListItemTypeId };
            const response = await api.post(apiURL + "/api/auth/food-menu", foodMenuItemData);
            const { data } = response;
            setFoodMenu([...foodMenu, data]);
            setFoodMenuItem(initialFoodMenuItem);
            setFoodmenuItemError("");
        } catch (error) {
            setFoodmenuItemError(error?.response?.data?.message || error?.message);
            console.error("Error fetching data:", error);
        }
    };


    return (
        <div className="acategorieslistitems-view">
            <div className='category-container'>
                <label htmlFor="category-select">Select Category: (Only Catering) </label>
                <select id="category-select" value={selectedCategoryId} onChange={changeCategory}>
                    <option key={0} value={''}>
                        --Select--
                    </option>
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='category-container'>
                <label htmlFor="categorylist-select">Select Category List: </label>
                <select id="categorylist-select" value={selectedCategoryListId} onChange={changeCategoryList}>
                    <option key={0} value={''}>
                        --Select--
                    </option>
                    {categoriesList.map((categoryList) => (
                        <option key={categoryList.categoryListId} value={categoryList.categoryListId}>
                            {categoryList.type}
                        </option>
                    ))}
                </select>
            </div>
            <div className='category-container'>
                <label htmlFor="cateringlistitem-select">Select Catering List Item: </label>
                <select id="cateringlistitem-select" value={selectedCateringListItemId} onChange={changeCategoryListItem}>
                    <option key={0} value={''}>
                        --Select--
                    </option>
                    {cateringListItems.map((listItem) => (
                        <option key={listItem.cateringListItemId} value={listItem.cateringListItemId}>
                            {listItem.itemName}
                        </option>
                    ))}
                </select>
            </div>
            <div className='category-container'>
                <label htmlFor="cateringlistitemtype-select">Select Catering List Item Type: </label>
                <select id="cateringlistitemtype-select" value={selectedCateringListItemTypeId} onChange={changeCategoryListItemType}>
                    <option key={0} value={''}>
                        --Select--
                    </option>
                    {cateringListItemsTypes.map((itemType) => (
                        <option key={itemType.cateringListItemTypeId} value={itemType.cateringListItemTypeId}>
                            {itemType.typeName}
                        </option>
                    ))}
                </select>
            </div>
            <div className='categorylist-container'>
                {foodMenu?.length == 0 && <div>
                    No data is available!
                </div>}
                {(selectedCateringListItemTypeId != 0 && foodMenu?.length > 0) && <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>List Item Type Id</th>
                            <th>Food Id</th>
                            <th>Food Name</th>
                            <th>Image Name</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodMenu?.map((itemType, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        {itemType?.cateringListItemTypeId}
                                    </td>
                                    <td>
                                        {itemType?.foodId}
                                    </td>
                                    <td>
                                        {itemType?.foodName}
                                    </td>
                                    <td>
                                        {itemType?.imageName}
                                    </td>
                                     <td>
                                        {itemType?.price}
                                    </td>
                                     <td>
                                        {itemType?.description}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>}
            </div>
            {selectedCateringListItemTypeId != 0 && <div className='add-categorylist-container'>
                <ul>
                    <li>
                        <label>Food Name: </label>
                        <input type="text" name="foodName" value={foodMenuItem?.foodName} onChange={(event) => addFoodMenu(event)} />
                    </li>
                    <li>
                        <label>Image Name: </label>
                        <input type="text" name="imageName" value={foodMenuItem?.imageName} onChange={(event) => addFoodMenu(event)} />
                    </li>
                    <li>
                        <label>Price: </label>
                        <input type="text" name="price" value={foodMenuItem?.price} onChange={(event) => addFoodMenu(event)} />
                    </li>
                    <li>
                        <label>Description: </label>
                        <input type="text" name="description" value={foodMenuItem?.description} onChange={(event) => addFoodMenu(event)} />
                    </li>
                    <li className='button-container'>
                        <button disabled={!selectedCateringListItemTypeId} className='add-button' onClick={addFoodMenuItem}>Add</button>
                    </li>
                    <li className='group-error'>
                        {foodmenuItemError && <p className="error">{foodmenuItemError}</p>}
                    </li>
                </ul>
            </div>}
            {/* <div>
                <Link to={'/admin/categorieslistitems'}>Add Categories List Items</Link>
            </div> */}
        </div>
    )
};

export { AFoodMenu };
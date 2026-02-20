import { useState, useEffect } from 'react';
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./index.css";

const ACategoriesListItems = () => {

    const apiURL = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategoryListId, setSelectedCategoryListId] = useState(0);
    const [categoriesListItems, setCategoriesListItems] = useState([]);
    const [cateringListItems, setCateringListItems] = useState([]);

    const initialListItem = {
        itemName: "",
        imageName: "",
        price: "",
        discountPrice: "",
        ratings: "",
        sendItemsCount: "",
        categoryListId: ""
    };
    const [listItem, setListItem] = useState(initialListItem);
    const [addListItemError, setAddListItemError] = useState("");
    const selectedCategory = categories.find((category) => category.categoryId == selectedCategoryId);
    const isCateringType = selectedCategory?.name === 'Catering' || false;

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
        setListItem(initialListItem);
        setCategoriesList([]);
        setCategoriesListItems([]);
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
        setCategoriesListItems([]);
        setCateringListItems([]);
        setSelectedCategoryListId(event.target.value || 0);
        if (!event.target.value) {
            return;
        }
        try {
            if (isCateringType) {
                const response = await api.post(apiURL + '/api/user/catering-list-items-by-id', { categoryListId: event.target.value });
                const { data } = response;
                setCateringListItems(data);
                return;
            }
            const response = await api.post(apiURL + '/api/user/categories-list-items-by-id', { categoryListId: event.target.value });
            const { data } = response;
            setCategoriesListItems(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addListItem = (event) => {
        const { name, value } = event.target;
        setListItem({ ...listItem, [name]: value })
    }

    const addCategoryListItem = async () => {
        if (!listItem?.itemName || !listItem?.imageName || !listItem?.price || !listItem?.discountPrice || !listItem?.ratings || !listItem?.sendItemsCount) {
            return;
        }
        try {
            const listItemData = { ...listItem, categoryListId: selectedCategoryListId };
            const response = await api.post(apiURL + "/api/auth/categories-list-items", listItemData);
            const { data } = response;
            setCategoriesListItems([...categoriesListItems, data]);
            setListItem(initialListItem);
            setAddListItemError("");
        } catch (error) {
            setAddListItemError(error?.response?.data?.message || error?.message);
            console.error("Error fetching data:", error);
        }
    };

    const addCateringListItem = async () => {
        if (!listItem?.itemName || !listItem?.imageName) {
            return;
        }
        try {
            const listItemData = { ...listItem, categoryListId: selectedCategoryListId };
            const response = await api.post(apiURL + "/api/auth/catering-list-items", listItemData);
            const { data } = response;
            setCateringListItems([...cateringListItems, data]);
            setListItem(initialListItem);
            setAddListItemError("");
        } catch (error) {
            setAddListItemError(error?.response?.data?.message || error?.message);
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="acategorieslistitems-view">
            <div className='category-container'>
                <label htmlFor="category-select">Select Category: </label>
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
            <div className='categorylist-container'>
                {categoriesListItems?.length == 0 && cateringListItems?.length == 0 && <div>
                    No data is available!
                </div>}
                {(selectedCategoryListId != 0 && categoriesListItems?.length > 0) && <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>List Id</th>
                            <th>List Item Id</th>
                            <th>Item Name</th>
                            <th>Image Name</th>
                            <th>Price</th>
                            <th>Discount Price</th>
                            <th>Ratings</th>
                            <th>Send Items Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesListItems?.map((list, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        {list?.categoryListId}
                                    </td>
                                    <td>
                                        {list?.categoryListItemId}
                                    </td>
                                    <td>
                                        {list?.itemName}
                                    </td>
                                    <td>
                                        {list?.imageName}
                                    </td>
                                    <td>
                                        {list?.price}
                                    </td>
                                    <td>
                                        {list?.discountPrice}
                                    </td>
                                    <td>
                                        {list?.ratings}
                                    </td>
                                    <td>
                                        {list?.sendItemsCount}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>}

                {(selectedCategoryListId != 0 && cateringListItems?.length > 0) && <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>List Id</th>
                            <th>List Item Id</th>
                            <th>Item Name</th>
                            <th>Image Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cateringListItems?.map((list, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        {list?.categoryListId}
                                    </td>
                                    <td>
                                        {list?.cateringListItemId}
                                    </td>
                                    <td>
                                        {list?.itemName}
                                    </td>
                                    <td>
                                        {list?.imageName}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>}
            </div>
            {selectedCategoryListId != 0 && <div className='add-categorylist-container'>
                <ul>
                    <li>
                        <label>Item Name: </label>
                        <input type="text" name="itemName" value={listItem?.itemName} onChange={(event) => addListItem(event)} />
                    </li>
                    <li>
                        <label>Image Name: </label>
                        <input type="text" name="imageName" value={listItem?.imageName} onChange={(event) => addListItem(event)} />
                    </li>
                    {!isCateringType && <>
                        <li>
                            <label>Price: </label>
                            <input type="text" name="price" value={listItem?.price} onChange={(event) => addListItem(event)} />
                        </li>
                        <li>
                            <label>Discount Price: </label>
                            <input type="text" name="discountPrice" value={listItem?.discountPrice} onChange={(event) => addListItem(event)} />
                        </li>
                        <li>
                            <label>Ratings: </label>
                            <input type="text" name="ratings" value={listItem?.ratings} onChange={(event) => addListItem(event)} />
                        </li>
                        <li>
                            <label>Send Items Count: </label>
                            <input type="text" name="sendItemsCount" value={listItem?.sendItemsCount} onChange={(event) => addListItem(event)} />
                        </li>
                    </>}
                    <li className='button-container'>
                        {!isCateringType ? <button disabled={!selectedCategoryId} className='add-button' onClick={addCategoryListItem}>Add</button> :
                            <button disabled={!selectedCategoryId} className='add-button' onClick={addCateringListItem}>Add</button>}
                    </li>
                    <li className='group-error'>
                        {addListItemError && <p className="error">{addListItemError}</p>}
                    </li>
                </ul>
            </div>}
            <div className='nextpage-link'>
                <Link to={'/admin/cateringlistitemstypes'}>Add Catering List Items Types</Link>
            </div>
        </div>
    )
};

export { ACategoriesListItems };
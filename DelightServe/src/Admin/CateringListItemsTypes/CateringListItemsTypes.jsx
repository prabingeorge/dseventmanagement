import { useState, useEffect } from 'react';
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./index.css";

const ACateringListItemsTypes = () => {

    const apiURL = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategoryListId, setSelectedCategoryListId] = useState(0);
    const [cateringListItems, setCateringListItems] = useState([]);
    const [selectedCateringListItemId, setSelectedCateringListItemId] = useState(0);

    const [cateringListItemsTypes, setCateringListItemsTypes] = useState([]);

    const initialListItemType = {
        typeName: "",
        imageName: "",
        cateringListItemId: ""
    };
    const [listItemType, setListItemType] = useState(initialListItemType);
    const [addListItemTypeError, setAddListItemTypeError] = useState("");

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
        setListItemType(initialListItemType);
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

    const addListItemType = (event) => {
        const { name, value } = event.target;
        setListItemType({ ...listItemType, [name]: value })
    }

    const addCateringListItemTypes = async () => {
        if (!listItemType?.typeName || !listItemType?.imageName) {
            return;
        }
        try {
            const listItemTypeData = { ...listItemType, cateringListItemId: selectedCateringListItemId };
            const response = await api.post(apiURL + "/api/auth/catering-list-items-types", listItemTypeData);
            const { data } = response;
            setCateringListItemsTypes([...cateringListItemsTypes, data]);
            setListItemType(initialListItemType);
            setAddListItemTypeError("");
        } catch (error) {
            setAddListItemTypeError(error?.response?.data?.message || error?.message);
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
            <div className='categorylist-container'>
                {cateringListItemsTypes?.length == 0 && <div>
                    No data is available!
                </div>}
                {(selectedCateringListItemId != 0 && cateringListItemsTypes?.length > 0) && <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>List Item Id</th>
                            <th>List Item Type Id</th>
                            <th>Type Name</th>
                            <th>Image Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cateringListItemsTypes?.map((itemType, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        {itemType?.cateringListItemId}
                                    </td>
                                    <td>
                                        {itemType?.cateringListItemTypeId}
                                    </td>
                                    <td>
                                        {itemType?.typeName}
                                    </td>
                                    <td>
                                        {itemType?.imageName}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>}
            </div>
            {selectedCateringListItemId != 0 && <div className='add-categorylist-container'>
                <ul>
                    <li>
                        <label>Type Name: </label>
                        <input type="text" name="typeName" value={listItemType?.typeName} onChange={(event) => addListItemType(event)} />
                    </li>
                    <li>
                        <label>Image Name: </label>
                        <input type="text" name="imageName" value={listItemType?.imageName} onChange={(event) => addListItemType(event)} />
                    </li>
                    <li className='button-container'>
                        <button disabled={!selectedCateringListItemId} className='add-button' onClick={addCateringListItemTypes}>Add</button>
                    </li>
                    <li className='group-error'>
                        {addListItemTypeError && <p className="error">{addListItemTypeError}</p>}
                    </li>
                </ul>
            </div>}
            <div className='nextpage-link'>
                <Link to={'/admin/foodmenu'}>Add Food Menu Items</Link>
            </div>
        </div>
    )
};

export { ACateringListItemsTypes };
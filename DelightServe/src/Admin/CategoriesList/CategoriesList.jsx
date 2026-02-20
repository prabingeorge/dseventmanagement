import { useState, useEffect } from 'react';
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./index.css";

const ACategoriesList = () => {

    const apiURL = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const initialList = { type: "", imageName: "", categoryId: "" };
    const [list, setList] = useState(initialList);
    const [addListError, setAddListError] = useState("");

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
        setList(initialList);
        setCategoriesList([]);
        setSelectedCategoryId(event.target.value || 0);
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

    const addList = (event) => {
        const { name, value } = event.target;
        setList({ ...list, [name]: value })
    }

    const addCategoryList = async () => {
        if (!list?.type || !list?.imageName) {
            return;
        }
        try {
            const listData = { ...list, categoryId: selectedCategoryId };
            const response = await api.post(apiURL + "/api/auth/categories-list", listData);
            const { data } = response;
            setCategoriesList([...categoriesList, data]);
            setList(initialList);
            setAddListError("");
        } catch (error) {
            setAddListError(error?.response?.data?.message || error?.message);
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="acategorieslist-view">
            <div className='category-container'>
                <label htmlFor="user-select">Select Category: </label>
                <select id="user-select" value={selectedCategoryId} onChange={changeCategory}>
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
            <div className='categorylist-container'>
                {categoriesList?.length == 0 && <div>
                    No data is available!
                </div>}
                {(selectedCategoryId != 0 && categoriesList?.length > 0) && <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ListId</th>
                            <th>Type</th>
                            <th>Image Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesList?.map((list, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        {list?.categoryListId}
                                    </td>
                                    <td>
                                        {list?.type}
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
            {selectedCategoryId != 0 && <div className='add-categorylist-container'>
                <ul>
                    <li>
                        <label>Type: </label>
                        <input type="text" name="type" value={list?.type} onChange={(event) => addList(event)} />
                    </li>
                    <li>
                        <label>Image Name: </label>
                        <input type="text" name="imageName" value={list?.imageName} onChange={(event) => addList(event)} />
                    </li>
                    <li className='button-container'>
                        <button disabled={!selectedCategoryId} className='add-button' onClick={addCategoryList}>Add</button>
                    </li>
                    <li className='group-error'>
                        {addListError && <p className="error">{addListError}</p>}
                    </li>
                </ul>
            </div>}
            <div className='nextpage-link'>
                <Link to={'/admin/categorieslistitems'}>Add Categories List Items</Link>
            </div>
        </div>
    )
};

export { ACategoriesList };
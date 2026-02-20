import { useState, useEffect } from 'react';
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./index.css";

const ACategories = () => {

    const apiURL = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiURL + "/api/user/categories");
                const { data } = response;
                setCategories([...data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const addCategory = async () => {
        if (!categoryName) {
            return;
        }
        try {
            const response = await api.post(apiURL + "/api/auth/categories", { name: categoryName });
            const { data } = response;
            setCategories([...categories, data]);
            setCategoryName("");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="acategories-view">
            <div className='categorieslist'>
                {categories?.length == 0 && <div>No data is available!</div>}
                {categories?.length > 0 && <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        {category?.name}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>}
            </div>
            <div className='add-category-container'>
                <div>
                    Name: <input type="text" value={categoryName} onChange={(event) => setCategoryName(event?.target?.value)} />
                </div>
                <div>
                    <button className='add-button' onClick={addCategory}>Add</button>
                </div>
            </div>
            <div className='nextpage-link'>
                <Link to={'/admin/categorieslist'}>Add Categories List</Link>
            </div>
        </div>
    )
};

export { ACategories };
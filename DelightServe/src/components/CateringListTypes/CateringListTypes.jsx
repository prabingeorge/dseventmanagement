import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import api from "../../contexts/APIContext";
import Images from "../Images/Images";
import "./index.css";
import { Cards } from "../Cards/Cards";

const CateringListTypes = () => {

    const [cateringListItemsTypes, setCateringListItemsTypes] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [selectedFoodTypeId, setSelectedFoodTypeId] = useState(0);

    let params = useParams();
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/catering-list-items-types-by-id", { cateringListItemId: params?.cateringListItemId });
                const { data } = response;
                setCateringListItemsTypes(data);
                if (data[0]?.cateringListItemTypeId) {
                    setSelectedFoodTypeId(data[0]?.cateringListItemTypeId);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/food-menus-by-id", { cateringListItemTypeId: selectedFoodTypeId });
                const { data } = response;
                setFoodItems(data);
            } catch (error) {
                console.error("Error fetching food data:", error);
            }
        };

        fetchData();
    }, [selectedFoodTypeId]);

    const showFoodItems = async (cateringListItemTypeId) => {
        setSelectedFoodTypeId(cateringListItemTypeId);
    };

    return (
        <div className="dashboard">
            <div>
                <div className="images-container">
                    {cateringListItemsTypes?.length > 0 && cateringListItemsTypes.map((type) => {
                        return (
                            <div key={type?.cateringListItemTypeId}>
                                <div className={(selectedFoodTypeId == type?.cateringListItemTypeId) ? 'active-food-menu' : 'non-active-food-menu'}>
                                    <button onClick={() => showFoodItems(type?.cateringListItemTypeId)}>
                                        <Images fileName={type?.imageName} isNavigate={false} path={'cateringlisttypes/foodmenu'} cssClass={'circle-image'} />
                                    </button>
                                </div>
                                <div className="type-container">
                                    <label>{type?.typeName}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="cateringlisttypes-view">
                <div className='categorieslist'>
                    {foodItems?.length == 0 && <div>No Food item is available!</div>}
                    {foodItems?.length > 0 && <Cards cateringListItemId={params?.cateringListItemId} cateringListItemTypeId={selectedFoodTypeId} foodItems={foodItems}/>}
                </div>
            </div>
        </div>
    )
};

export { CateringListTypes };
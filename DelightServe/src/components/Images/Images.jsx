import { Link } from "react-router-dom";
import './index.css';

// const baseUrl = `http://localhost:5173/src/assets/images/`;
// const baseUrl = `https://furniture-ui-2qka.onrender.com/public/images`;
const baseUrl = `/images/`;

const Images = ({ fileName, navigatePath = '', path, cssClass, isNavigate = true }) => {
    const url = baseUrl + path + '/' + fileName;

    if (!isNavigate) {
        return (
            <div className="images-view">
                <img className={cssClass} src={url} alt={fileName}
                    // srcSet={`${url} 200w,`}
                    onError={
                        (e) => {
                            e.target.src = baseUrl + `default.jpg`;
                        }
                    } />
            </div>
        )
    }

    return (
        <div className="images-view">
            {/* <Link to={"/categorieslist/" + categoryListId}> */}
            <Link to={navigatePath}>
                <img className={cssClass}
                    src={url}
                    alt={fileName}
                    onError={
                        (e) => {
                            e.target.src = baseUrl + `default.jpg`;
                        }
                    }
                />
            </Link>
        </div>
    )
}

export default Images;
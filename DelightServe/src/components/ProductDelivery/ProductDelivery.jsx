import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'

import "./index.css";

const ProductDelivery = () => {

    return (
        <>
            <div className="delivery-view">
                <p>Your Order has confirmed. Thanks for choosing us!</p>
                <p>We will contact you as soon as possible.</p>

                <p>If any support needed call us <FontAwesomeIcon icon={faPhone} size="1x" style={{ color: '#ffa500' }} /><label> +91 9486629098</label></p>
            </div>
        </>
    )
};

export default ProductDelivery;
import "./index.css";

const ContactInformation = () => {

    return (
        <div className="contactinformation-view">
            <label className="title-name">Contact Information</label>
            <ul className="contact-info-container">
                <li>
                    <label>Name:</label> Ajin Selvaraj
                </li>
                <li>
                    <label>Mobile:</label> +91 9486629098
                </li>
                <li>
                    <label>Email:</label> ajinselva03@gmail.com
                </li>
                <li>
                    <label>Address:</label> Thickanamcode, Kanyakumari Dist - 629804
                </li>
            </ul>
        </div>
    )
};

export { ContactInformation };
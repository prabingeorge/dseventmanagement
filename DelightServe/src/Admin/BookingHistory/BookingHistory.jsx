import React, { useState, useEffect } from 'react';
import "./index.css";
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';

const ABookingHistory = () => {

    const [eventDetails, setEventDetails] = useState({});
    const apiURL = import.meta.env.VITE_API_URL;
    const eventTimeInfo = ['Morning', 'Noon', 'Evening'];
    const genderWeddingInfo = ['Bride', 'Groom'];
    const genderBirthdayInfo = ['Girl', 'Boy'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiURL + "/api/admin/users-details/users-purchase-details");
                const { data } = response;
                setEventDetails(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='ABookinghistory-view'>
            <div>
                <h4>Decoration</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>User</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventDetails && eventDetails?.decoration?.map((purchase) => {
                            return (
                                <>
                                    <tr key={purchase?.purchase_id}>
                                        <td>
                                            {purchase?.purchase_id}
                                        </td>
                                        <td>
                                            {purchase?.CategoriesList?.type}
                                        </td>
                                        <td>
                                            {purchase?.VenueDetail?.event_date}
                                        </td>
                                        <td>
                                            {purchase?.VenueDetail?.location}
                                        </td>
                                        <td>
                                            {purchase?.User?.name}
                                        </td>
                                        <td>
                                            {purchase?.User?.phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={'6'}>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Time: {eventTimeInfo?.[purchase?.VenueDetail?.event_time - 1]}
                                                        </td>
                                                        <td>
                                                            Gender:
                                                            {(purchase?.CategoriesList?.type === 'Wedding') && genderWeddingInfo?.[purchase?.VenueDetail?.gender - 1]}
                                                            {(purchase?.CategoriesList?.type === 'Birthday') && genderBirthdayInfo?.[purchase?.VenueDetail?.gender - 1]}
                                                        </td>
                                                        <td>
                                                            Amount: {purchase?.amount}
                                                        </td>
                                                        <td>
                                                            Type: {purchase?.CategoriesListItem?.item_name}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            <div>
                <h4>Catering</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>User</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventDetails && eventDetails?.catering?.map((purchase) => {
                            return (
                                <>
                                    <tr key={purchase?.purchase_id}>
                                        <td>
                                            {purchase?.purchase_id}
                                        </td>
                                        <td>
                                            {purchase?.CategoriesList?.type}
                                        </td>
                                        <td>
                                            {purchase?.VenueDetail?.event_date}
                                        </td>
                                        <td>
                                            {purchase?.VenueDetail?.location}
                                        </td>
                                        <td>
                                            {purchase?.User?.name}
                                        </td>
                                        <td>
                                            {purchase?.User?.phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={'6'}>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Time: {eventTimeInfo?.[purchase?.VenueDetail?.event_time - 1]}
                                                        </td>
                                                        <td>
                                                            Guests: {purchase?.VenueDetail?.guest_count}
                                                        </td>
                                                        <td>
                                                            Amount: {purchase?.amount}
                                                        </td>
                                                        <td>
                                                            Type: {purchase?.CateringListItem?.item_name}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
};

export { ABookingHistory };





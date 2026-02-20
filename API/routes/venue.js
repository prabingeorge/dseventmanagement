import express from "express";
// import DonationUser from "../models/DonationUser.js";
import auth from "../middleware/auth.js";
import { Op } from 'sequelize';
import model from '../models/index.cjs';

const { VenueDetails } = model;

const router = express.Router();

// Add Venue Detail
router.post("/venue-detail", async (req, res) => {
  const { location, eventDate, eventTime, gender = '', guestCount = 0 } = req.body;
  try {
    // Create new Venue Detail
    const newData = await VenueDetails.create({
      location,
      event_date: eventDate,
      event_time: eventTime,
      gender: gender,
      guest_count: guestCount
    });

    res.status(201).json({ venueId: newData.venue_id, location: newData.location, eventDate: newData?.event_date, eventTime: newData?.event_time, gender: newData?.gender, guestCount: newData?.guest_count, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
  } catch (e) {
    console.log(e);
    return res.status(500)
      .send(
        { message: 'Could not perform operation at this time, kindly try again later.' });
  }
});

// Get venue-detail by venue_id
router.post("/venue-detail-by-id", async (req, res) => {
  try {
    const { venueId } = req.body;
    console.log(venueId);
    const data = await VenueDetails.findAll({
      attributes: [
        ['venue_id', 'venueId'],
        'location',
        ['event_date', 'eventDate'],
        ['event_time', 'eventTime'],
        'gender',
        ['guest_count', 'guestCount'],
      ],
      where: { [Op.or]: [{ venue_id: venueId }] }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

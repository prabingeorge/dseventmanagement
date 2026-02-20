import express from "express";
import auth from "../middleware/auth.js";
import { Op } from 'sequelize';
import model from '../models/index.cjs';

const { User, Categories, CategoriesLists, CategoriesListItems, CateringListItems, CateringListItemsTypes, FoodMenusTables, VenueDetails, DecorationBookingDetails, CateringBookingDetails } = model;

const router = express.Router();

// Get all categories
// router.get("/categories", auth, async (req, res) => {
router.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: [
        ['category_id', 'categoryId'],
        'name'
      ],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Categories-list
router.post("/categories-list", async (req, res) => {
  const { type, imageName, categoryId } = req.body;
  try {
    const categoriesList = await CategoriesLists.findOne({ where: { [Op.or]: [{ type }] } });
    if (categoriesList) {
      return res.status(422)
        .send({ message: 'Type already exists' });
    }

    // Create new categories list
    const newData = await CategoriesLists.create({
      type,
      image_name: imageName,
      category_id: categoryId
    });

    res.status(201).json({ id: newData.id, type: newData.type, imageName: newData?.image_name, categoryId: newData?.category_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
  } catch (e) {
    console.log(e);
    return res.status(500)
      .send(
        { message: 'Could not perform operation at this time, kindly try again later.' });
  }
});

// Get all categories-list
router.get("/categories-list", async (req, res) => {
  try {
    const categoriesList = await CategoriesLists.findAll();
    res.json(categoriesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories-list by category_id
router.post("/categories-list-by-id", async (req, res) => {
  try {
    const { categoryId } = req.body;
    const categoriesList = await CategoriesLists.findAll({
      attributes: [
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        'type',
        ['image_name', 'imageName'],
      ],
      where: { [Op.or]: [{ category_id: categoryId }] }
    });
    res.json(categoriesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories-list-items by category_list_id
router.post("/categories-list-items-by-id", async (req, res) => {
  try {
    const { categoryListId } = req.body;
    const categoriesListItems = await CategoriesListItems.findAll({
      attributes: [
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        ['item_name', 'itemName'],
        ['image_name', 'imageName'],
        'price',
        ['discount_price', 'discountPrice'],
        'ratings',
        ['send_items_count', 'sendItemsCount']
      ],
      where: { [Op.or]: [{ category_list_id: categoryListId }] }
    });
    res.json(categoriesListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get categories-list-items details by category_list_item_id
router.post("/categories-list-items-details", async (req, res) => {
  try {
    const { categoryListItemId } = req.body;
    const categoriesListItems = await CategoriesListItems.findAll({
      attributes: [
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        ['item_name', 'itemName'],
        ['image_name', 'imageName'],
        'price',
        ['discount_price', 'discountPrice'],
        'ratings',
        ['send_items_count', 'sendItemsCount']
      ],
      where: { [Op.or]: [{ category_list_item_id: categoryListItemId }] }
    });
    res.json(...categoriesListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all catering-list-items by category_list_id
router.post("/catering-list-items-by-id", async (req, res) => {
  try {
    const { categoryListId } = req.body;
    const data = await CateringListItems.findAll({
      attributes: [
        ['category_list_id', 'categoryListId'],
        ['catering_list_item_id', 'cateringListItemId'],
        ['item_name', 'itemName'],
        ['image_name', 'imageName'],
      ],
      where: { [Op.or]: [{ category_list_id: categoryListId }] }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get catering-list-items-types details by catering_list_item_id
router.post("/catering-list-items-types-by-id", async (req, res) => {
  try {
    const { cateringListItemId } = req.body;
    const data = await CateringListItemsTypes.findAll({
      attributes: [
        ['catering_list_item_type_id', 'cateringListItemTypeId'],
        ['type_name', 'typeName'],
        ['image_name', 'imageName'],
        ['catering_list_item_id', 'cateringListItemId'],
      ],
      where: { [Op.or]: [{ catering_list_item_id: cateringListItemId }] }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get food-menus by catering_list_item_type_id
router.post("/food-menus-by-id", async (req, res) => {
  try {
    const { cateringListItemTypeId } = req.body;
    const data = await FoodMenusTables.findAll({
      attributes: [
        ['food_id', 'foodId'],
        ['food_name', 'foodName'],
        ['image_name', 'imageName'],
        'price',
        'description',
        ['catering_list_item_type_id', 'cateringListItemTypeId'],
      ],
      where: { [Op.or]: [{ catering_list_item_type_id: cateringListItemTypeId }] }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add purchase detail (for the authenticated user)
router.post("/purchase-detail", auth, async (req, res) => {
  const { userId, categoryId, categoryListId, categoryListItemId, quantity, amount, venueInfo } = req.body;
  const { location, eventDate, eventTime, gender, guests } = venueInfo;
  console.log("======" + JSON.stringify(req.body))
  try {
    // Create new Venue Detail
    const count = guests == "" ? 0 : guests;
    const newVenuData = await VenueDetails.create({
      location,
      event_date: eventDate,
      event_time: eventTime,
      gender,
      guest_count: count
    });

    // Create new purchase list
    const newData = await DecorationBookingDetails.create({
      user_id: userId,
      category_id: categoryId,
      category_list_id: categoryListId,
      category_list_item_id: categoryListItemId,
      quantity,
      amount,
      venue_id: newVenuData?.venue_id
    });

    res.status(201).json({ purchaseId: newData.purchase_id, userId: newData.user_id, categoryId: newData?.category_id, listId: categoryListId?.category_list_id, categoryListItemId: newData?.category_list_item_id, quantity: newData?.quantity, amount: newData?.amount, venueInfo: newVenuData, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: 'Could not perform operation at this time, kindly try again later.' });
  }
});

// Get all purchase details
router.get("/purchase-details", async (req, res) => {
  try {
    const DecorationBookingDetails = await DecorationBookingDetails.findAll({
      attributes: [
        ['purchase_id', 'purchaseId'],
        ['user_id', 'userId'],
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        'quantity',
        'amount'
      ]
    });
    res.json(DecorationBookingDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all purchase details by userid
router.post("/purchase-details-by-userid", async (req, res) => {
  try {
    const { userId } = req.body;
    const DecorationBookingDetails = await DecorationBookingDetails.findAll({
      attributes: [
        ['purchase_id', 'purchaseId'],
        ['user_id', 'userId'],
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        'quantity',
        'amount'
      ],
      where: { [Op.or]: [{ user_id: userId }] }
    });
    res.json(DecorationBookingDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Catering Booking detail (for the authenticated user)
router.post("/catering-booking-detail", auth, async (req, res) => {
  const { userId, categoryId, categoryListId, cateringListItemId, quantity, amount, venueInfo } = req.body;
  const { location, eventDate, eventTime, gender, guests } = venueInfo;
  console.log("======" + JSON.stringify(req.body))
  try {
    // Create new Venue Detail
    const newVenuData = await VenueDetails.create({
      location,
      event_date: eventDate,
      event_time: eventTime,
      gender,
      guest_count: guests
    });

    // Create new catering booking detail
    const newData = await CateringBookingDetails.create({
      user_id: userId,
      category_id: categoryId,
      category_list_id: categoryListId,
      catering_list_item_id: cateringListItemId,
      quantity,
      amount,
      venue_id: newVenuData?.venue_id
    });

    res.status(201).json({ purchaseId: newData.purchase_id, userId: newData.user_id, categoryId: newData?.category_id, listId: categoryListId?.category_list_id, cateringListItemId: newData?.catering_list_item_id, quantity: newData?.quantity, amount: newData?.amount, venueInfo: newVenuData, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
  } catch (e) {
    console.log(e);
    return res.status(500)
      .send(
        { message: 'Could not perform operation at this time, kindly try again later.' });
  }
});

// Get all Catering Booking details
router.get("/catering-booking-details", async (req, res) => {
  try {
    const DecorationBookingDetails = await CateringBookingDetails.findAll({
      attributes: [
        ['purchase_id', 'purchaseId'],
        ['user_id', 'userId'],
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        ['catering_list_item_id', 'cateringListItemId'],
        'quantity',
        'amount'
      ]
    });
    res.json(DecorationBookingDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all Catering Booking Details by userid
router.post("/catering-booking-details-by-userid", async (req, res) => {
  try {
    const { userId } = req.body;
    const DecorationBookingDetails = await CateringBookingDetails.findAll({
      attributes: [
        ['purchase_id', 'purchaseId'],
        ['user_id', 'userId'],
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        ['catering_list_item_id', 'cateringListItemId'],
        'quantity',
        'amount'
      ],
      where: { [Op.or]: [{ user_id: userId }] }
    });
    res.json(DecorationBookingDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;

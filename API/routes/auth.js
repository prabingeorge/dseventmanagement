import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import AuthController from '../controllers/AuthController.js';

import { Op } from 'sequelize';
import model from '../models/index.cjs';

const { User, Categories, CategoriesLists, CategoriesListItems, CateringListItems, CateringListItemsTypes, FoodMenusTables } = model;

console.log("Modal" + Categories);


import { registerSchema, loginSchema } from "../validators/auth.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
// router.post('/register', AuthController.signUp);
router.post("/register", async (req, res) => {
    console.log("register API");
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, phone, password, status } = req.body;
    try {
        console.log(User);
        const user = await User.findOne({ where: { [Op.or]: [{ phone }, { email }] } });
        if (user) {
            return res.status(422)
                .send({ message: 'User with that email or phone already exists' });
        }

        // Hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        const hashedPassword = bcrypt.hashSync(password, 8)

        // Create new user
        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            status,
        });

        // Generate JWT
        const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(201).json({
            token,
            user: { name: name, email: email }
        });

        // return res.status(201).send({message: 'Account created successfully'});
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    try {
        // Check for user
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ userId: user.user_id, name: user.name, email: user.email, phone: user?.phone, role: 'user' }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.json({
            token,
            user: { userId: user.user_id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
// router.post('/register', AuthController.signUp);
router.post("/user-register", async (req, res) => {
    console.log("user register API");
   
    const { name, email, phone, status } = req.body;
    try {
        // Create new user
        const newUser = await User.create({
            name,
            email,
            phone,
            status,
        });

        // Generate JWT
        const token = jwt.sign({ userId: newUser.user_id, name: newUser.name, email: newUser.email, phone: newUser?.phone, role: 'user' }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(201).json({
            token,
            user: { userId: newUser.user_id, name: newUser.name, email: newUser.email, role: newUser.role }
        });

    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Add Categories
router.post("/categories", async (req, res) => {
    console.log("register API");
    const { name } = req.body;
    try {
        // console.log(Categories);
        const user = await Categories.findOne({ where: { [Op.or]: [{ name }] } });
        if (user) {
            return res.status(422)
                .send({ message: 'Name already exists' });
        }

        // Create new categories
        const newData = await Categories.create({
            name
        });

        res.status(201).json({ categoryId: newData.category_id, name: newData.name });

        // return res.status(201).send({message: 'Account created successfully'});
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send(
                { message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Add CategoriesLists
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

        res.status(201).json({ categoryListId: newData.category_list_id, type: newData.type, imageName: newData?.image_name, categoryId: newData?.category_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Add Categories-list-items
router.post("/categories-list-items", async (req, res) => {
    const { itemName, imageName, price, discountPrice, ratings, sendItemsCount, categoryListId } = req.body;
    try {
        const categoriesListItems = await CategoriesListItems.findOne({ where: { [Op.or]: [{ item_name: itemName }] } });
        if (categoriesListItems) {
            return res.status(422)
                .send({ message: 'Item name already exists' });
        }

        // Create new categories list
        const newData = await CategoriesListItems.create({
            item_name: itemName,
            image_name: imageName,
            price,
            discount_price: discountPrice,
            ratings: ratings,
            send_items_count: sendItemsCount,
            category_list_id: categoryListId
        });

        res.status(201).json({ categoryListItemId: newData?.category_list_item_id, itemName: newData.item_name, imageName: newData?.image_name, price: newData?.price, discountPrice: newData?.discount_price, ratings: newData?.ratings, sendItemsCount: newData?.send_items_count, categoryListId: newData?.category_list_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Add Catering-list-items
router.post("/catering-list-items", async (req, res) => {
    const { itemName, imageName, categoryListId } = req.body;
    try {
        const data = await CateringListItems.findOne({ where: { [Op.or]: [{ item_name: itemName }] } });
        if (data) {
            return res.status(422)
                .send({ message: 'Item name already exists' });
        }

        // Create new catering list
        const newData = await CateringListItems.create({
            item_name: itemName,
            image_name: imageName,
            category_list_id: categoryListId
        });

        res.status(201).json({ cateringListItemId: newData?.catering_list_item_id, itemName: newData.item_name, imageName: newData?.image_name, categoryListId: newData?.category_list_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Add Catering-list-items-types
router.post("/catering-list-items-types", async (req, res) => {
    const { typeName, imageName, cateringListItemId } = req.body;
    try {
        const data = await CateringListItemsTypes.findOne({ where: { [Op.or]: [{ type_name: typeName }] } });
        if (data) {
            return res.status(422)
                .send({ message: 'Type name already exists' });
        }

        // Create new categories list items types
        const newData = await CateringListItemsTypes.create({
            type_name: typeName,
            image_name: imageName,
            catering_list_item_id: cateringListItemId
        });

        res.status(201).json({ cateringListItemTypeId: newData?.catering_list_item_type_id, typeName: newData.type_name, imageName: newData?.image_name, cateringListItemId: newData?.catering_list_item_id });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Add Food-menus
router.post("/food-menu", async (req, res) => {
    const { foodName, imageName, price, description, cateringListItemTypeId } = req.body;
    try {
        const data = await FoodMenusTables.findOne({ where: { [Op.or]: [{ food_name: foodName }] } });
        if (data) {
            return res.status(422)
                .send({ message: 'Food name already exists' });
        }

        // Create new food menu
        const newData = await FoodMenusTables.create({
            food_name: foodName,
            image_name: imageName,
            price,
            description,
            catering_list_item_type_id: cateringListItemTypeId
        });

        res.status(201).json({ foodId: newData?.food_id, foodName: newData.food_name, imageName: newData?.image_name, price: newData?.price, description: newData?.description, cateringListItemTypeId: newData?.catering_list_item_type_id });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

export default router;

import express from "express";
import model from '../models/index.cjs';

const { Categories, CategoriesLists, CategoriesListItems, CateringListItems, CateringListItemsTypes, FoodMenusTables, DecorationBookingDetails, CateringBookingDetails, User, VenueDetails } = model;

User.hasMany(DecorationBookingDetails, { foreignKey: 'user_id' });
DecorationBookingDetails.belongsTo(User, { foreignKey: 'user_id' });
Categories.hasMany(DecorationBookingDetails, { foreignKey: 'category_id' });
DecorationBookingDetails.belongsTo(Categories, { foreignKey: 'category_id' });
CategoriesLists.hasMany(DecorationBookingDetails, { foreignKey: 'category_list_id' });
DecorationBookingDetails.belongsTo(CategoriesLists, { foreignKey: 'category_list_id' });

VenueDetails.hasMany(DecorationBookingDetails, { foreignKey: 'venue_id' });
DecorationBookingDetails.belongsTo(VenueDetails, { foreignKey: 'venue_id' });
CategoriesListItems.hasMany(DecorationBookingDetails, { foreignKey: 'category_list_item_id' });
DecorationBookingDetails.belongsTo(CategoriesListItems, { foreignKey: 'category_list_item_id' });


User.hasMany(CateringBookingDetails, { foreignKey: 'user_id' });
CateringBookingDetails.belongsTo(User, { foreignKey: 'user_id' });
Categories.hasMany(CateringBookingDetails, { foreignKey: 'category_id' });
CateringBookingDetails.belongsTo(Categories, { foreignKey: 'category_id' });
CategoriesLists.hasMany(CateringBookingDetails, { foreignKey: 'category_list_id' });
CateringBookingDetails.belongsTo(CategoriesLists, { foreignKey: 'category_list_id' });

VenueDetails.hasMany(CateringBookingDetails, { foreignKey: 'venue_id' });
CateringBookingDetails.belongsTo(VenueDetails, { foreignKey: 'venue_id' });
CateringListItems.hasMany(CateringBookingDetails, { foreignKey: 'catering_list_item_id' });
CateringBookingDetails.belongsTo(CateringListItems, { foreignKey: 'catering_list_item_id' });

const router = express.Router();

// Get all users details
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove all users details
router.delete("/all-users-remove", async (req, res) => {
  try {
    const users = await User.truncate({ cascade: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get all purchases details
router.get("/all-purchases", async (req, res) => {
  try {
    const DecorationBookingDetails = await DecorationBookingDetails.findAll();
    res.json(DecorationBookingDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove all purchases details
router.delete("/all-purchases-remove", async (req, res) => {
  try {
    const DecorationBookingDetails = await DecorationBookingDetails.destroy({
      where: {},
      truncate: true,
    });
    res.json(DecorationBookingDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all purchase details
router.get("/users-purchase-details", async (req, res) => {
  try {
    // const users = await Categories.findAll({
    //   // Select specific attributes if necessary
    //   attributes: [
    //     ['category_id', 'categoryId'],
    //     'name'
    //   ],
    //   include: [
    //     {
    //       model: CategoriesLists,
    //       as: 'CategoriesLists', // Use the alias defined in your association
    //       required: true, // Forces an INNER JOIN for the Order table
    //       attributes: [
    //         ['category_list_id', 'categoryListId'],
    //         'type',
    //         ['image_name', 'imageName'],
    //         ['category_id', 'categoryId'],
    //       ],
    //       include: [
    //         {
    //           model: CategoriesListItems,
    //           as: 'CategoriesListItems', // Use the alias defined in your association
    //           required: true, // Forces an INNER JOIN for the Order table
    //           "send_items_count": 1,
    //           attributes: [
    //             ['category_list_item_id', 'categoryListItemId'],
    //             ['item_name', 'itemName'],
    //             ['image_name', 'imageName'],
    //             'price',
    //             ['discount_price', 'discountPrice'],
    //             'ratings',
    //             ['send_items_count', 'sendItemsCount']
    //           ],
    //           include: [
    //             {
    //               model: DecorationBookingDetails,
    //               as: 'DecorationBookingDetails', // Use the alias defined in your association
    //               required: true, // Forces an INNER JOIN for the Order table
    //               attributes: [
    //                 ['purchase_id', 'purchaseId'],
    //                 'quantity',
    //                 'amount'
    //               ],
    //               include: [
    //                 {
    //                   model: User,
    //                   as: 'User', // Use the alias defined in your association
    //                   required: true, // Forces an INNER JOIN for the Order table
    //                   attributes: [
    //                     ['user_id', 'userId'],
    //                     'name',
    //                     'email',
    //                     'phone',
    //                     'status'
    //                   ],
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // });
    const data = await DecorationBookingDetails.findAll({
      // where: { id: 1 },
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Categories,
          required: true,
        },
        {
          model: CategoriesLists,
          required: true,
        },
        {
          model: VenueDetails,
          required: true,
        },
        {
          model: CategoriesListItems,
          required: true,
        },
      ]
    });
    const data1 = await CateringBookingDetails.findAll({
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Categories,
          required: true,
        },
        {
          model: CategoriesLists,
          required: true,
        },
        {
          model: VenueDetails,
          required: true,
        },
        {
          model: CateringListItems,
          required: true,
        },
      ]
    })
    res.json({ decoration: data, catering: data1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Truncate all the tables
router.delete("/truncate-tables", async (req, res) => {
  try {
    await Categories.truncate({ restartIdentity: true });
    await CategoriesLists.truncate({ restartIdentity: true });
    await CategoriesListItems.truncate({ restartIdentity: true });
    await DecorationBookingDetails.truncate({ restartIdentity: true });
    await User.truncate({ restartIdentity: true });
    res.json({ message: "Truncated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

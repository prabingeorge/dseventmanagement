import express from "express";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/admin-only", auth, admin, (req, res) => {
//   res.json({ message: "Welcome, Admin!" });
// });

router.get("/health-check", (req, res) => {
  res.json({ message: "Success!" });
});

export default router;

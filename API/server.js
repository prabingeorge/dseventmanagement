import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import categoriesRoutes from "./routes/categories.js";
import userProfilesRoutes from "./routes/userprofiles.js";
import adminUsersRoutes from "./routes/users.js";
import veuneRoutes from "./routes/venue.js";

import adminRoutes from "./routes/admin.js";

// Load environment variables
config();
// connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", categoriesRoutes);
app.use("/api/user-profile", userProfilesRoutes);
app.use("/api/admin/users-details", adminUsersRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/venue", veuneRoutes);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

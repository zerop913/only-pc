const express = require("express");
const cors = require("cors");
const app = express();
const processorRoutes = require("./routes/processorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const videocardRoutes = require("./routes/videocardRoutes");
const motherboardRoutes = require("./routes/motherboardRoutes");
const kuleryRoutes = require("./routes/kuleryRoutes");
const zidkostnoeOxlazdenieSzoRoutes = require("./routes/zidkostnoeOxlazdenieSzoRoutes");
const operativnayaPamyatRoutes = require("./routes/operativnayaPamyatRoutes");
const nakopiteliSsdRoutes = require("./routes/nakopiteliSsdRoutes");
const zhestkieDiskiHddRoutes = require("./routes/zhestkieDiskiHddRoutes");
const blokiPitaniyaRoutes = require("./routes/blokiPitaniyaRoutes");
const korpusaRoutes = require("./routes/korpusaRoutes");
const filtersRoutes = require("./routes/filtersRoutes");
const authController = require("./controllers/authController");
const authMiddleware = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/v1/processors", processorRoutes);
app.use("/api/v1/videocards", videocardRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subcategories", subcategoryRoutes);
app.use("/api/v1/subcategories", categoryRoutes);
app.use("/api/v1/motherboard", motherboardRoutes);
app.use("/api/v1/kulery-dlya-processorov", kuleryRoutes);
app.use("/api/v1/zidkostnoe-oxlazdenie-szo", zidkostnoeOxlazdenieSzoRoutes);
app.use("/api/v1/operativnaya-pamyat", operativnayaPamyatRoutes);
app.use("/api/v1/nakopiteli-ssd", nakopiteliSsdRoutes);
app.use("/api/v1/zhestkie-diski-hdd", zhestkieDiskiHddRoutes);
app.use("/api/v1/bloki-pitaniya", blokiPitaniyaRoutes);
app.use("/api/v1/korpusa", korpusaRoutes);
app.use("/api/v1/filters", filtersRoutes);
app.post("/api/v1/register", authController.register);
app.post("/api/v1/login", authController.login);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/upload-image", imageRoutes);

app.get(
  "/api/v1/admin",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  (req, res) => {
    res.json({ message: "Welcome, admin!" });
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

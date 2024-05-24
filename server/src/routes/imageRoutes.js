const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.params.category;
    const productTitle = req.params.productTitle;
    const uploadPath = path.join("public", "images", category, productTitle);

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

// Обработчик для загрузки изображения
router.post("/:category/:productTitle", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const category = req.params.category;
  const imagePath = `images/${category}/${req.file.filename}`;

  res.send(imagePath);
});

module.exports = router;

const express = require("express");
const controller = require("../controllers/docController.js");
const router = express.Router();

// GET request to fetch all users
router.get("/", controller.getAllUsers);
router.post("/create-user", controller.createUser);

module.exports = router;

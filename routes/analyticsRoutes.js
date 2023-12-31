const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  bloodGroupDetailsContoller,
} = require("../controllers/analyticsController.js");

const router = express.Router();

// Get All Blood records
router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailsContoller);

module.exports = router;

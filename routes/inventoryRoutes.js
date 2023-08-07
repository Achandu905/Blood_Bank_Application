const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitallsController,
  getOrgnaisationController,
  getOrgnaisationHospitalController,
  getHospitalInventoryController,
  getRecentInventoryController,
} = require("../controllers/inventoryController.js");
const router = express.Router();

// Create Inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

// Get All Blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

// Get recent Blood records
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

// get hospital blood records
router.post(
  "/get-hospital-inventory",
  authMiddleware,
  getHospitalInventoryController
);

// Get All Donars Records
router.get("/get-donars", authMiddleware, getDonarController);

// Get All Hospital Records
router.get("/get-hospitals", authMiddleware, getHospitallsController);

// Get all organisation
router.get("/get-organisation", authMiddleware, getOrgnaisationController);

// Get all organisation for hospital
router.get(
  "/get-organisation-hospital",
  authMiddleware,
  getOrgnaisationHospitalController
);

module.exports = router;

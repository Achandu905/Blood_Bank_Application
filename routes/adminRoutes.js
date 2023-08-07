const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getHospitalListController,
  getOrganisationListController,
  deleteDonarController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);
router.get(
  "/organisations-list",
  authMiddleware,
  adminMiddleware,
  getOrganisationListController
);

// Actions

// Delete donar

router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);

module.exports = router;

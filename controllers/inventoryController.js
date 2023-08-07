const mongoose = require("mongoose");
const inventoryModel = require("../model/inventoryModel.js");
const userModel = require("../model/userModel.js");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

// Get All Blood Records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};

// Get recent 3 blood records
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.body.userId })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent inventory successfully fetched",
      inventory,
    });
  } catch (error) {
    console.log("Get recent inventroy controller" + error);
    res.status(500).send({
      success: false,
      message: "Error in get recent inventory API",
      error,
    });
  }
};

// Get Hospital Blood Records
const getHospitalInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital records successfully",
      inventory,
    });
  } catch (error) {
    console.log("Error in get hospital inventory controller" + error);
    return res.status(500).send({
      success: false,
      message: "Error In Get hospital Inventory",
      error,
    });
  }
};

//get donar record
const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donarsId = await inventoryModel.distinct("donar", { organisation });
    const donars = await userModel.find({ _id: { $in: donarsId } });
    return res.status(200).send({
      success: true,
      message: "Donars fetched successfully",
      donars,
    });
  } catch (error) {
    console.log("error in get donar controller" + error);
    return res.status(500).send({
      success: false,
      message: "Error in get donar controller",
      error,
    });
  }
};

// Get all hospitals records controller
const getHospitallsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Fetched all hospitals succesfully",
      hospitals,
    });
  } catch (error) {
    console.log("Error in get all hospitalls controller" + error);
    return res.status(500).send({
      success: false,
      message: "Error in get all hospitals controller",
      error,
    });
  }
};

// Get All Organisations
const getOrgnaisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};
// Get All Organisations for hospitals
const getOrgnaisationHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};
module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitallsController,
  getOrgnaisationController,
  getOrgnaisationHospitalController,
  getHospitalInventoryController,
  getRecentInventoryController,
};

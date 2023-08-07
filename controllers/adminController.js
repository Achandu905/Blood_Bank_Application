const { default: mongoose } = require("mongoose");
const userModel = require("../model/userModel");

// Get donars list controller
const getDonarListController = async (req, res) => {
  try {
    const donars = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Donars fetched successfull",
      totalLength: donars.length,
      donars,
    });
  } catch (error) {
    console.log("Error in get donar list API" + error);
    return res.status(500).send({
      success: false,
      message: "Error in donar list API",
      error,
    });
  }
};

// Get Hospitals list
const getHospitalListController = async (req, res) => {
  try {
    const hospitals = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Organisations fetched successfull",
      totalLength: hospitals.length,
      hospitals,
    });
  } catch (error) {
    console.log("Error in get hospital list API" + error);
    return res.status(500).send({
      success: false,
      message: "Error in hospital list API",
      error,
    });
  }
};

// Get organisations list
const getOrganisationListController = async (req, res) => {
  try {
    const organisations = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Organisations fetched successfull",
      totalLength: organisations.length,
      organisations,
    });
  } catch (error) {
    console.log("Error in get organisations list API" + error);
    return res.status(500).send({
      success: false,
      message: "Error in organisations list API",
      error,
    });
  }
};

// Delete a donar
const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

module.exports = {
  getDonarListController,
  getHospitalListController,
  getOrganisationListController,
  deleteDonarController,
};

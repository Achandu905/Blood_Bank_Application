const userModel = require("../model/userModel.js");
module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unathourised access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Error in admin check middleware" + error);
    return res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};

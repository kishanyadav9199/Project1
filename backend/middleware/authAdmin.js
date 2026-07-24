import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    const admin = await doctorModel.findById(decoded.id);

    if (!admin || admin.role !== "admin") {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authAdmin;

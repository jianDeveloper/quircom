const mongoose = require("mongoose");
const FreelancerModel = require("../models/FreelancerModel");
const ClientModel = require("../models/ClientModel");

const ValidateUserData = async (req, res) => {
  try {
    const { userName, eMail, contactNum } = req.body;

    // Perform parallel database queries to check for existing data in both collections
    const checks = await Promise.all([
      FreelancerModel.findOne({ $or: [{ userName }, { eMail }, { contactNum }] }),
      ClientModel.findOne({ $or: [{ userName }, { eMail }, { contactNum }] })
    ]);

    // checks[0] will contain the result from FreelancerModel, and checks[1] from ClientModel
    const userNameExists = checks.some(result => result && result.userName === userName);
    const eMailExists = checks.some(result => result && result.eMail === eMail);
    const contactNumExists = checks.some(result => result && result.contactNum === contactNum);

    // If any of the fields exist in either collection, respond accordingly
    if (userNameExists || eMailExists || contactNumExists) {
      return res.status(200).json({
        exists: true,
        userNameExists,
        eMailExists,
        contactNumExists,
      });
    }

    // If none of the fields exist in either collection, proceed
    res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error validating user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  ValidateUserData
};
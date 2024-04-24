const jwt = require("jsonwebtoken");
const FreelancerModel = require("../models/FreelancerModel.js")
const ClientModel = require("../models/ClientModel.js") // Assuming this is the correct import for ClientModel

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // Checks if there is a token available for authentication
  if (!authorization) {
      return res.status(401).json({ message: "Authorization Token Required" });
  }

  const token = authorization.split(" ")[1];

  // Verifies if the token is valid
  try {
      const { _id } = jwt.verify(token, process.env.JWT_SECRET); // Extracting eMail from the token

      // Check if the eMail exists in either FreelancerModel or ClientModel
      const freelancer = await FreelancerModel.findOne({ _id });
      const client = await ClientModel.findOne({ _id });

      // If eMail exists in either model, proceed to next middleware
      if (freelancer || client) {
          req.user = _id;
          next();
      } else {
          return res.status(404).json({ message: "User not found" });
      }
  } catch (err) {
      res.status(404).json({ message: err.message });
  }
}

module.exports = requireAuth;

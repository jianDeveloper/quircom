const mongoose = require("mongoose");
const AdminModel = require("../models/AdminModel");
const requireAuth = require("../utils/requireAuth")

const GetAllAdmin = async (req, res) => {
  try {
    const result = await AdminModel.find({});

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetSpecificAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await AdminModel.findById(id);

    if (!result) {
        return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateAdmin = async (req, res) => {
  try {
    const admin = req.body;

    const result = await AdminModel.create({
      admin: admin.admin,
      password: admin.password
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const UpdateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await AdminModel.findByIdAndUpdate(
      admin._id,
      {
        $set: {
         admin: admin.admin,
         password: admin.password
        },
      }, 
    {new: true}
    );

    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const DeleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No admin listed");
    }
  
    const admin = await AdminModel.findById(id);
  
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the admin document from the database
    const result = await AdminModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const GetAllAdminWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetAllAdmin(req, res);
  });
};
const GetSpecificAdminWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetSpecificAdmin(req, res);
  });
};
const CreateAdminWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await CreateAdmin(req, res);
  });
};
const UpdateAdminWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await UpdateAdmin(req, res);
  });
};
const DeleteAdminWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await DeleteAdmin(req, res);
  });
};

module.exports = {
  GetAllAdminWithAuth,
  GetSpecificAdminWithAuth,
  CreateAdminWithAuth,
  UpdateAdminWithAuth,
  DeleteAdminWithAuth
};
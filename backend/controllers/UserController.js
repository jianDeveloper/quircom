const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

const GetAllUsers = async (req, res) => {
  try {
    const result = await UserModel.find({});

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const GetSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json("No such user");
    }

    const result = await UserModel.findById(id);

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const CreateUser = async (req, res) => {
  try {
    const data = req.body;

    const result = await UserModel.create({ ...data });

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const EditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json("No such user");
    }

    const result = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json("No such user");
    }

    const result = await UserModel.findByIdAndDelete(id, { new: true });

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  EditUser,
  DeleteUser,
};
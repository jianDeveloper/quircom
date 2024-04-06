const mongoose = require("mongoose");
<<<<<<< Updated upstream:backend/controllers/UserController.js
const UserModel = require("../models/UserModel");
=======
const UserModel = require("../models/ClientModel");
const DriveService = require("../utils/DriveService");
>>>>>>> Stashed changes:backend/controllers/ClientController.js

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
<<<<<<< Updated upstream:backend/controllers/UserController.js
  try {
    const data = req.body;
=======
  try{
    const {body, file} = req;
    const user = JSON.parse(body.client);
>>>>>>> Stashed changes:backend/controllers/ClientController.js

    const result = await UserModel.create({ ...data });

<<<<<<< Updated upstream:backend/controllers/UserController.js
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
=======
    if (file) {
        const { id, name } = await DriveService.UploadFiles(
          file,
          process.env.FOLDER_ID_MESSAGE
        );
        Object.assign(userProfile, {
          id: id,
          name: name,
          link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        });
      }

    const result = await UserModel.create({
        firstName: user.firstName,
        surName: user.surName,
        userName: user.userName,
        eMail: user.eMail,
        passWord: user.passWord,
        contactNum: user.contactNum,
        region: user.region,
        province: user.province,
        city: user.city,
        accType: user.accType,
        aggRee: user.aggRee,
        profilePic: userProfile,
        subs: user.subs,
    });
    res.status(201).json(result);

    }catch(err){
        res.status(404).json({message: err.message});
    }
>>>>>>> Stashed changes:backend/controllers/ClientController.js
};

const EditUser = async (req, res) => {
  try {
    const { id } = req.params;
<<<<<<< Updated upstream:backend/controllers/UserController.js
    const data = req.body;
=======
    const {body, file} = req;
    const user = JSON.parse(body.client);

    let userProfile = {};
>>>>>>> Stashed changes:backend/controllers/ClientController.js

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
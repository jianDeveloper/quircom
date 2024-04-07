const mongoose = require("mongoose");
const UserModel = require("../models/ClientModel");
const DriveService = require("../utils/DriveService");

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
      res.status(400).json("No such client");
    }

    const result = await UserModel.findById(id);

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const CreateUser = async (req, res) => {
  try{
    const {body, file} = req;
    const client = JSON.parse(body.client);

    let userProfile = {};

    if (file) {
        const { id, name } = await DriveService.UploadFiles(
          file,
          process.env.FOLDER_ID_PROFILE
        );
        Object.assign(userProfile, {
          id: id,
          name: name,
          link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        });
      }

    const result = await UserModel.create({
        firstName: client.firstName,
        surName: client.surName,
        userName: client.userName,
        eMail: client.eMail,
        passWord: client.passWord,
        contactNum: client.contactNum,
        region: client.region,
        province: client.province,
        city: client.city,
        accType: client.accType,
        aggRee: client.aggRee,
        profilePic: userProfile,
        subs: client.subs,
    });
    res.status(201).json(result);

    }catch(err){
        res.status(404).json({message: err.message});
    }
};

const EditUser = async (req, res) => {
  try {

    const { id } = req.params;
    const {body, file} = req;
    const client = JSON.parse(body.client);

    let userProfile = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid ID"});
    }

    if (file) {
        const { id: fileID, name: fileName } = await DriveService.UploadFiles(
          file,
          process.env.FOLDER_ID_PROFILE
        );
        Object.assign(userProfile, {
          id: fileID,
          name: fileName,
          link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
        });

        await DriveService.DeleteFiles(client.profilePic.id);
      }

    const result = await UserModel.findByIdAndUpdate(
       client._id,
       {
        $set: {
          firstName: client.firstName,
          surName: client.surName,
          userName: client.userName,
          eMail: client.eMail,
          passWord: client.passWord,
          contactNum: client.contactNum,
          region: client.region,
          province: client.province,
          city: client.city,
          profilePic: userProfile.hasOwnProperty("id") ? userProfile : client.profilePic,
        },
      }, 
    {new: true}
    );
    res.status(201).json(result);

  } catch (err) {
    res.status(404).json({message: err.message})
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No client listed");
    }
  
    const request = await UserModel.findById(id);
  
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
  
    // Delete associated taskPicture from Google Drive
    for (const image of request.taskPicture) {
      await DriveService.DeleteFiles(image.id);
    }
  
    // Delete the request document from the database
    const result = await UserModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const ValidateUserData = async (req, res) => {
  try {
    const { userName, eMail, contactNum } = req.body;

    // Perform database query to check if the provided username, email, and contact number already exist
    // You'll need to implement this query based on your database model
    const userNameExists = await UserModel.exists({ userName });
    const eMailExists = await UserModel.exists({ eMail });
    const contactNumExists = await UserModel.exists({ contactNum });

    // Send response indicating whether each field exists or not
    res.status(200).json({
      exists: true,
      userNameExists,
      eMailExists,
      contactNumExists,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  EditUser,
  DeleteUser,
  ValidateUserData
};
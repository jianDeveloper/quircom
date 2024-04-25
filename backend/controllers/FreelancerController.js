const mongoose = require("mongoose");
const UserModel = require("../models/FreelancerModel");
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
      res.status(400).json("Invalid ID");
    }

    const result = await UserModel.findById(id);

    if (!result) {
      return res.status(404).json({ message: "freelancer not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateUser = async (req, res) => {
  try {
    const { body, file } = req;
    const freelancer = JSON.parse(body.freelancer);
  
    let freelancerProfile = {};
  
    if (file) {
      const { id, name } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_PROFILE
      );
      freelancerProfile = {
        id: id,
        name: name,
        link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
      };
    }
  
    const result = await UserModel.create({
      firstName: freelancer.firstName,
      surName: freelancer.surName,
      userName: freelancer.userName,
      eMail: freelancer.eMail,
      passWord: freelancer.passWord,
      contactNum: freelancer.contactNum,
      region: freelancer.region,
      province: freelancer.province,
      city: freelancer.city,
      accType: freelancer.accType,
      aggRee: freelancer.aggRee,
      profilePic: freelancerProfile,
      userInfo: null,
      portFolio: [],
      ratings: freelancer.ratings,
    });
    
    res.status(201).json(result);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

const EditUser = async (req, res) => {
  try {

    const { id } = req.params;
    const {body, file} = req;
    const freelancer = JSON.parse(body.freelancer);

    let freelancerProfile = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid ID"});
    }

    if (file) {
      const { id: fileID, name: fileName } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_PROFILE
      );
      Object.assign(freelancerProfile, {
        id: fileID,
        name: fileName,
        link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
      });

      // Presuming you wish to replace the old profile picture,
      // ensure you handle cases where a user might not have an existing profile picture.
      if(client.profilePic && client.profilePic.id) {
        await DriveService.DeleteFiles(client.profilePic.id);
      }
    }

    const result = await UserModel.findByIdAndUpdate(
      freelancer._id,
      {
        $set: {
          firstName: freelancer.firstName,
          surName: freelancer.surName,
          userName: freelancer.userName,
          eMail: freelancer.eMail,
          passWord: freelancer.passWord,
          contactNum: freelancer.contactNum,
          region: freelancer.region,
          province: freelancer.province,
          city: freelancer.city,
          profilePic: freelancerProfile.hasOwnProperty("id") ? freelancerProfile : freelancer.profilePic,
          userInfo: freelancer.userInfo,
        },
      }, 
    {new: true}
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(404).json({message: err.message})
  }
};

const EditPortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    const freelancer = JSON.parse(body.freelancer);

    const existingUser = await UserModel.findById(freelancer._id);
    if (!existingUser) {
        return res.status(404).json({ message: "No user found" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    let appendPortfolio = [];

    // Ensure existingUser.portFolio is initialized as an empty array if it's null
    const existingPortfolio = existingUser.portFolio || [];

    // Determine the files to delete
    const filesToDelete = existingPortfolio.filter(existingFile => !freelancer.portFolio.some(newFile => newFile.id === existingFile.id));

    // Delete selected files from both the array and Google Drive
    for (const fileToDelete of filesToDelete) {
        await DriveService.DeleteFiles(fileToDelete.id);
    }

    // Handle file uploads
    if (files && files.length > 0) {
        for (const file of files) {
            const { id: fileID, name: fileName } = await DriveService.UploadFiles(
                file,
                process.env.FOLDER_ID_PORTFOLIO
            );
            appendPortfolio.push({
                id: fileID,
                name: fileName,
                link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
            });
        }
    }

    // Append the remaining files in the portfolio
    appendPortfolio.push(...freelancer.portFolio);

    const result = await UserModel.findByIdAndUpdate(
        freelancer._id,
        {
            $set: {
              portFolio: appendPortfolio,
            },
        },
        { new: true }
    );
    res.status(201).json(result);
  } catch (err) {
      res.status(404).json({ message: err.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No freelancer listed");
    }
  
    const freelancer = await UserModel.findById(id);
  
    if (!freelancer) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Check if the user has a profile picture and delete it from Google Drive
    if (freelancer.profilePic && freelancer.profilePic.id) {
      await DriveService.DeleteFiles(freelancer.profilePic.id);
    }
  
    // If there are task pictures, delete each associated file from Google Drive
    if (freelancer.portFolio && Array.isArray(freelancer.portFolio)) {
      for (const image of freelancer.portFolio) {
        if (image.id) { // Ensure there's an id to work with
          await DriveService.DeleteFiles(image.id);
        }
      }
    }
  
    // Delete the user document from the database
    const result = await UserModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message); // It's better to use status 500 for server errors
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
  EditPortfolio,
  DeleteUser,
  ValidateUserData
};
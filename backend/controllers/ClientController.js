const mongoose = require("mongoose");
const UserModel = require("../models/ClientModel");
const DriveService = require("../utils/DriveService");
const jwt = require("jsonwebtoken");
const requireAuth = require("../utils/requireAuth")

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
  try {
    const { body, file } = req;
    const client = JSON.parse(body.client);

    let clientProfile = {};

    if (file) {
      const { id, name } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_PROFILE
      );
      Object.assign(clientProfile, {
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
      verify: false,
      profilePic: clientProfile,
      userInfo: null,
      subs: {
        status: false,
        dateSubscribed: "", 
        dateExpire: ""
      },
      billing: {
        amount: "",
        name: "",
        refNum: "",
        paymentNum: "",
        paymentMethod: "",
      },
    });

    const emailToken = jwt.sign(
      { _id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "3m" }
    );

    res.status(201).json({ result, emailToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const EditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, file } = req;
    const client = JSON.parse(body.client);

    let clientProfile = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (file) {
      const { id: fileID, name: fileName } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_PROFILE
      );
      Object.assign(clientProfile, {
        id: fileID,
        name: fileName,
        link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
      });

      // Presuming you wish to replace the old profile picture,
      // ensure you handle cases where a user might not have an existing profile picture.
      if (client.profilePic && client.profilePic.id) {
        await DriveService.DeleteFiles(client.profilePic.id);
      }
    }

    // Define the update object outside the update function to conditionally include fields
    let update = {
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
        profilePic: clientProfile.hasOwnProperty("id")
          ? clientProfile
          : client.profilePic,
        userInfo: client.userInfo,
      },
    };

    const result = await UserModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const SubscriptionStatus = async (req, res) => {
  const { id } = req.params;
  const client = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  let update = {
    $set: {
      "subs.status": client.subs.status, // Directly update the status
    },
  };

  // Update the dateSubscribed and dateExpire if status is true
  if (client.subs && client.subs.status === true) {
    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setMonth(currentDate.getMonth() + 1); // Set dateExpire to one month later

    update.$set["subs.dateSubscribed"] = currentDate;
    update.$set["subs.dateExpire"] = expirationDate;
  }

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current date is equal to the dateExpire and set subs.status to false if it is
    const currentDate = new Date();
    if (user.subs.dateExpire && currentDate >= new Date(user.subs.dateExpire)) {
      update.$set["subs.status"] = false;
    }

    const result = await UserModel.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const EditBilling = async (req, res) => {
  try {
    const { id } = req.params;
    const client = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let update = {
      $set: {
        'billing.amount': client.billing.amount,
        'billing.name': client.billing.name,
        'billing.refNum': client.billing.refNum,
        'billing.paymentNum': client.billing.paymentNum,
        'billing.paymentMethod': client.billing.paymentMethod
      },
    };

    const result = await UserModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const VerifyUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const update = {
      $set: {
        verify: true
      },
    };

    const result = await UserModel.findByIdAndUpdate(id, update, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No client listed");
    }

    const client = await UserModel.findById(id);

    if (!client) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user has a profile picture, delete it from Google Drive
    if (client.profilePic && client.profilePic.id) {
      await DriveService.DeleteFiles(client.profilePic.id);
    }

    // If there are task pictures, delete each associated file from Google Drive
    if (client.taskPicture && Array.isArray(client.taskPicture)) {
      for (const image of client.taskPicture) {
        if (image.id) {
          // Ensure there's an id to work with
          await DriveService.DeleteFiles(image.id);
        }
      }
    }

    // Delete the user document from the database
    const result = await UserModel.findByIdAndDelete(id);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message); // Use status 500 for server errors
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

const GetAllUsersWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetAllUsers(req, res);
  });
};
const GetSpecificUserWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetSpecificUser(req, res);
  });
};
const EditUserWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await EditUser(req, res);
  });
};
const DeleteUserWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await DeleteUser(req, res);
  });
};
const SubscriptionStatusWithAuth  = (req, res) => {
  requireAuth(req, res, async () => {
    await SubscriptionStatus(req, res);
  });
};
const EditBillingWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await EditBilling(req, res);
  });
};
const VerifyUserWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await VerifyUser(req, res);
  });
};

module.exports = {
  CreateUser,
  GetAllUsersWithAuth,
  GetSpecificUserWithAuth,
  EditUserWithAuth,
  DeleteUserWithAuth,
  SubscriptionStatusWithAuth,
  EditBillingWithAuth,
  VerifyUserWithAuth,
  ValidateUserData,
};

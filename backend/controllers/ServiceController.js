const mongoose = require("mongoose");
const ServiceModel = require("../models/ServiceModel");
const DriveService = require("../utils/DriveService");

const GetAllServices = async (req, res) => {
  try {
    const result = await ServiceModel.find({});

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetSpecificService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await ServiceModel.findById(id);

    if (!result) {
        return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateService = async (req, res) => {
  // try{
  //   const {body, file} = req;
  //   const user = JSON.parse(body.freelancer);

  //   let userProfile = {};

  //   if (file) {
  //     const { id, name } = await DriveService.UploadFiles(
  //       file,
  //       process.env.FOLDER_ID_PROFILE
  //     );
  //     Object.assign(userProfile, {
  //       id: id,
  //       name: name,
  //       link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
  //     });
  //   }

  //   const result = await UserModel.create({
  //       firstName: user.firstName,
  //       surName: user.surName,
  //       userName: user.userName,
  //       eMail: user.eMail,
  //       passWord: user.passWord,
  //       contactNum: user.contactNum,
  //       region: user.region,
  //       province: user.province,
  //       city: user.city,
  //       accType: user.accType,
  //       aggRee: user.aggRee,
  //       profilePic: userProfile,
  //   });
  //   res.status(201).json(result);

  try {
    const {body, file} = req;
    const user = JSON.parse(body.service);
    
    const { thumbNail, serviceName, serviceType, serviceInfo, progLang, freelancerId } = req.body;

    const result = await ServiceModel.create({
        thumbNail,
        serviceName,
        serviceType,
        serviceInfo,
        progLang,
        freelancerId,
        dateUploaded: new Date()
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const EditService = async (req, res) => {
    try {
        const { id } = req.params;
        const { thumbNail, serviceName, serviceType, serviceInfo, progLang } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const service = await ServiceModel.findById(id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        service.thumbNail = thumbNail;
        service.serviceName = serviceName;
        service.serviceType = serviceType;
        service.serviceInfo = serviceInfo;
        service.progLang = progLang;

        await service.save();

        res.status(200).json(service);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const DeleteService = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const result = await ServiceModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    GetAllServices,
    GetSpecificService,
    CreateService,
    EditService,
    DeleteService
};
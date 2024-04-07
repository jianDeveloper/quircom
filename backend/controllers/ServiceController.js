const mongoose = require("mongoose");
const ServiceModel = require("../models/ServiceModel");
const DriveService = require("../utils/DriveService");

const GetAllServices = async (req, res) => {
  try {
    const result = await ServiceModel.find({}).populate("freelancerId");
    // variable.freelancerId.userName

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

    const result = await ServiceModel.findById(id).populate("freelancerId");

    if (!result) {
        return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateService = async (req, res) => {
  try {
    const {body, file} = req;
    const service = JSON.parse(body.service);

    let serviceThumbnail = {};

    if (file) {
      const { id, name } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_THUMBNAIL
      );
      Object.assign(serviceThumbnail, {
        id: id,
        name: name,
        link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
      });
    }

    const result = await ServiceModel.create({
      thumbNail: serviceThumbnail,
      serviceName: service.serviceName,
      serviceType: service.serviceType,
      serviceInfo: service.serviceInfo,
      price: service.price,
      reviews: service.reviews,
      freelancerId: service.freelancerId,
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
    const { body, file } = req;
    const service = JSON.parse(body.service);

    let serviceThumbnail = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid ID" });
    }

    if (file) {
      const { id: fileID, name: fileName } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_THUMBNAIL
      );
      Object.assign(serviceThumbnail, {
        id: fileID,
        name: fileName,
        link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
      });

      await DriveService.DeleteFiles(service.thumbNail.id);
    }

    const result = await ServiceModel.findByIdAndUpdate(
      service._id,
      {
        $set: {
          thumbNail: serviceThumbnail.hasOwnProperty("id") ? serviceThumbnail : service.thumbNail,
          serviceName: service.serviceName,
          serviceType: service.serviceType,
          serviceInfo: service.serviceInfo,
          price: service.price,
          dateUploaded: new Date()
        },
      }, 
    {new: true}
    );
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const DeleteService = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No service listed");
    }
  
    const request = await ServiceModel.findById(id);
  
    if (!request) {
      return res.status(404).json({ message: "Service not found" });
    }
  
    // Delete associated taskPicture from Google Drive
    for (const image of request.taskPicture) {
      await DriveService.DeleteFiles(image.id);
    }
  
    // Delete the request document from the database
    const result = await ServiceModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
    GetAllServices,
    GetSpecificService,
    CreateService,
    EditService,
    DeleteService
};
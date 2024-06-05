const mongoose = require("mongoose");
const ServiceModel = require("../models/ServiceModel");
const RequestModel = require("../models/ReqServiceModel");
const DriveService = require("../utils/DriveService");
const requireAuth = require("../utils/requireAuth");

const GetAllServices = async (req, res) => {
  try {
    const result = await ServiceModel.find({})
      .populate({
        path: "requestId",
        populate: {
          path: "clientId",
          model: "client", // Assuming the name of the model is "Client"
        },
      })
      .populate("freelancerId");
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

    const result = await ServiceModel.findById(id)
      .populate({
        path: "requestId",
        populate: {
          path: "clientId",
          model: "client", // Assuming the name of the model is "Client"
        },
      })
      .populate("freelancerId");

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
    const { body, file } = req;
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

    // Find all requests associated with the given serviceId
    const requests = await RequestModel.find({ serviceId: service._id });

    // Extract requestIds from the requests
    const requestIds = requests.map((request) => request._id);

    let uniqueServiceId = generateUniqueServiceId();
    const result = await ServiceModel.create({
      thumbNail: serviceThumbnail,
      serviceId: uniqueServiceId,
      serviceName: service.serviceName,
      serviceType: service.serviceType,
      serviceSubCat: service.serviceSubCat,
      serviceInfo: service.serviceInfo,
      price: service.price,
      requestId: requestIds, // Assign requestIds to requestId
      freelancerId: service.freelancerId,
      dateUploaded: new Date(),
      dateUpdated: null,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  function generateUniqueServiceId() {
    let serviceId;
    do {
      serviceId = Math.floor(10000 + Math.random() * 90000); // Generate a random number between 10000 and 99999
    } while (!isServiceIdUnique(serviceId)); // Loop until the generated serviceId is unique
    return serviceId;
  }

  // Function to check if the generated serviceId is unique in the database
  async function isServiceIdUnique(serviceId) {
    const existingService = await ServiceModel.findOne({
      serviceId: serviceId,
    });
    return !existingService; // Return true if serviceId is unique, false otherwise
  }
};

const EditService = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, file } = req;
    const service = JSON.parse(body.service);

    let serviceThumbnail = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
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
          thumbNail: serviceThumbnail.hasOwnProperty("id")
            ? serviceThumbnail
            : service.thumbNail,
          serviceName: service.serviceName,
          serviceType: service.serviceType,
          serviceSubCat: service.serviceSubCat,
          serviceInfo: service.serviceInfo,
          price: service.price,
          dateUpdated: new Date(),
        },
      },
      { new: true }
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

    const service = await ServiceModel.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete associated taskPicture from Google Drive
    if (Array.isArray(service.thumbNail)) {
      for (const image of service.thumbNail) {
        await DriveService.DeleteFiles(image.id);
      }
    } else {
      // If thumbNail is not an array, treat it as a single object and delete it
      await DriveService.DeleteFiles(service.thumbNail.id);
    }

    // Delete the service document from the database
    const result = await ServiceModel.findByIdAndDelete(id);

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const GetAllServicesWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetAllServices(req, res);
  });
};
const GetSpecificServiceWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetSpecificService(req, res);
  });
};
const CreateServiceWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await CreateService(req, res);
  });
};
const EditServiceWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await EditService(req, res);
  });
};
const DeleteServiceWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await DeleteService(req, res);
  });
};

module.exports = {
  GetAllServicesWithAuth,
  GetSpecificServiceWithAuth,
  CreateServiceWithAuth,
  EditServiceWithAuth,
  DeleteServiceWithAuth,
};

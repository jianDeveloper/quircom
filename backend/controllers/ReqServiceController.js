const mongoose = require("mongoose");
const RequestModel = require("../models/ReqServiceModel");
const ServiceModel = require("../models/ServiceModel")
const DriveService = require("../utils/DriveService");
const requireAuth = require("../utils/requireAuth");

const GetAllRequest = async (req, res) => {
  try {
    const result = await RequestModel.find({}).populate("clientId").populate({
      path: "serviceId",
      populate: {
        path: "freelancerId",
        model: "freelancer", 
      },
    });
    // variable.freelancerId.userName

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetSpecificRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await RequestModel.findById(id).populate("clientId").populate({
      path: "serviceId",
      populate: {
        path: "freelancerId",
        model: "freelancer", 
      },
    });

    if (!result) {
        return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateRequest = async (req, res) => {
  try {
    const request = req.body
    // const { body, files } = req;
    // const request = JSON.parse(body.request);

    // let requestPicture = [];
    // if (files && files.length > 0) {
    //   for (const file of files) {
    //     const { id: fileID, name: fileName } = await DriveService.UploadFiles(
    //         file,
    //         process.env.FOLDER_ID_REQUEST
    //     );
    //     requestPicture.push({
    //         id: fileID,
    //         name: fileName,
    //         link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
    //     });
    //   }
    // }

    let uniqueRequestId = generateUniqueRequestId();
    const newRequest = await RequestModel.create({
      requestId: uniqueRequestId,
      status: "Pending",
      clientId: request.clientId,
      serviceId: request.serviceId,
      taskTitle: request.taskTitle,
      taskDetails: request.taskDetails,
      // taskPicture: requestPicture,
      // feedbackNum: request.feedbackNum,
      // feedbackInfo: request.feedbackInfo,
      feedbackNum: null,
      feedbackInfo: null,
      report: {
        status: false,
        reportType: "",
        details: ""
      },
      contract: false,
      deadLine: request.deadLine,
      dateUploaded: new Date()
    });

    // After creating a request, update the associated service to include this new request's ID
    await ServiceModel.findByIdAndUpdate(request.serviceId, {
      $push: { requestId: newRequest._id }
    });

    res.status(201).json(newRequest);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }

  // Function to generate a unique 5-digit random number
  function generateUniqueRequestId() {
      let requestId;
      do {
          requestId = Math.floor(10000 + Math.random() * 90000); // Generate a random number between 10000 and 99999
      } while (!isRequestIdUnique(requestId)); // Loop until the generated requestId is unique
      return requestId;
  }

  // Function to check if the generated requestId is unique in the database
  async function isRequestIdUnique(requestId) {
      const existingRequest = await RequestModel.findOne({ requestId: requestId });
      return !existingRequest; // Return true if requestId is unique, false otherwise
  }
};

const EditRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = req.body
    // const { body, files } = req;
    // const request = JSON.parse(body.request);
  
    // const existingReq = await RequestModel.findById(id);
    // if (!existingReq) {
    //   return res.status(404).json({ message: "No record found" });
    // }
  
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid ID" });
    // }
  
    // let requestPicture = existingReq.taskPicture;
  
    // // Compare existing images with new ones to determine removed images
    // const removedImages = existingReq.taskPicture.filter(image => !request.taskPicture.some(newImage => newImage.id === image.id));
  
    // // Delete removed images from both the array and Google Drive
    // for (const image of removedImages) {
    //   await DriveService.DeleteFiles(image.id);
    //   const index = requestPicture.findIndex(pic => pic.id === image.id);
    //   if (index !== -1) {
    //     requestPicture.splice(index, 1);
    //   }
    // }
  
    // // Handle file uploads
    // if (files && files.length > 0) {
    //   for (const file of files) {
    //     const { id: fileID, name: fileName } = await DriveService.UploadFiles(
    //       file,
    //       process.env.FOLDER_ID_REQUEST
    //     );
    //     requestPicture.push({
    //       id: fileID,
    //       name: fileName,
    //       link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
    //     });
    //   }
    // }

    const result = await RequestModel.findByIdAndUpdate(
      id,
      {
        $set: {
          taskTitle: request.taskTitle,
          taskDetails: request.taskDetails,
          // taskPicture: requestPicture,
          // feedbackNum: request.feedbackNum,
          // feedbackInfo: request.feedbackInfo,
          deadLine: request.deadLine,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const SubmitFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const request = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let update = {
      $set: {
        feedbackNum: request.feedbackNum,
        feedbackInfo: request.feedbackInfo
      },
    };

    const result = await RequestModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const VerifyRequest = async (req, res) => {
  try{
    const { id } = req.params;
    const request = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let update = {
      $set: {
        status: request.status
      },
    };

    const result = await RequestModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
}

const ReportRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let update = {
      $set: {
        'report.status': true,
        'report.reportType': request.report.reportType,
        'report.details': request.report.details,
      },
    };

    const result = await RequestModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};


const ContractCRequest = async (req, res) => {
  try{
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let update = {
      $set: {
        contractC: true
      },
    };

    const result = await RequestModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
}

const ContractFRequest = async (req, res) => {
  try{
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let update = {
      $set: {
        contractF: true
      },
    };

    const result = await RequestModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
}

const DeleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No request listed");
    }
  
    const request = await RequestModel.findById(id);
  
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
  
    // // Delete associated taskPicture from Google Drive
    // for (const image of request.taskPicture) {
    //   await DriveService.DeleteFiles(image.id);
    // }
  
    // Delete the request document from the database
    const result = await RequestModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const GetAllRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetAllRequest(req, res);
  });
};
const GetSpecificRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetSpecificRequest(req, res);
  });
};
const CreateRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await CreateRequest(req, res);
  });
};
const EditRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await EditRequest(req, res);
  });
};
const SubmitFeedbackWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await SubmitFeedback(req, res);
  });
};
const VerifyRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await VerifyRequest(req, res);
  });
};
const ReportRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await ReportRequest(req, res);
  });
};
const ContractCRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await ContractCRequest(req, res);
  });
};
const ContractFRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await ContractFRequest(req, res);
  });
};
const DeleteRequestWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await DeleteRequest(req, res);
  });
};

module.exports = {
    GetAllRequestWithAuth,
    GetSpecificRequestWithAuth,
    CreateRequestWithAuth,
    EditRequestWithAuth,
    SubmitFeedbackWithAuth,
    VerifyRequestWithAuth,
    ReportRequestWithAuth,
    ContractCRequestWithAuth,
    ContractFRequestWithAuth,
    DeleteRequestWithAuth
};
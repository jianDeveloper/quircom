const mongoose = require("mongoose");
const MessageModel = require("../models/MessageModel");
const DriveService = require("../utils/DriveService");
const requireAuth = require("../utils/requireAuth");

const GetMessage = async (req, res) => {
  try {

    const result = await MessageModel.find({}).populate("requestId").populate('sender').populate('receiver')

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetMessageWithPolling = async (req, res) => {
  try {
    // Retrieve messages initially
    let result = await MessageModel.find({})
      .populate("requestId")
      .populate("sender")
      .populate("receiver");

    // If no messages, wait for a while before sending an empty response
    if (result.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 3 seconds
      result = await MessageModel.find({})
        .populate("requestId")
        .populate("sender")
        .populate("receiver");
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetSpecificMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await MessageModel.findById(id).populate("requestId").populate('sender').populate('receiver')

    if (!result) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateMessage = async (req, res) => {
  try {
    const { body, file } = req;
    const chat = JSON.parse(body.chat);

    let messageAttachment = {};

    if (file) {
      const { id, name } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_MESSAGE
      );
      messageAttachment = {
        id: id,
        name: name,
        link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
      };
    }

    const result = await MessageModel.create({
      requestId: chat.requestId,
      sender: chat.sender,
      senderType: chat.senderType,
      receiver: chat.receiver,
      receiverType: chat.receiverType,
      message: chat.message,
      attachment: messageAttachment,
      createdAt: new Date(),
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const DeleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No Message listed");
    }

    const chat = await MessageModel.findById(id);

    if (!chat) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (Array.isArray(chat.attachment)) {
      for (const image of chat.attachment) {
        await DriveService.DeleteFiles(image.id);
      }
    } else {
      await DriveService.DeleteFiles(chat.attachment.id);
    }

    // Delete the Message document from the database
    const result = await MessageModel.findByIdAndDelete(id);

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const GetMessageWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetMessage(req, res);
  });
};
const GetMessageWithPollingWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetMessageWithPolling(req, res);
  });
};
const GetSpecificMessageWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await GetSpecificMessage(req, res);
  });
};
const CreateMessageWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await CreateMessage(req, res);
  });
};
const DeleteMessageWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await DeleteMessage(req, res);
  });
};

module.exports = {
  GetMessageWithAuth,
  GetMessageWithPollingWithAuth,
  GetSpecificMessageWithAuth,
  CreateMessageWithAuth,
  DeleteMessageWithAuth,
};

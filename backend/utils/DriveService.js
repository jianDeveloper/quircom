const {google} = require("googleapis");
const fs = require("fs");
const authorize = require("../config/Gdrive.js");

// UPLOAD FILES
const UploadFiles = async (fileObject, folder_id) => {
  try {
    const { data } = await google
      .drive({ version: "v3", auth: authorize })
      .files.create({
        media: {
          mimeType: fileObject.mimeType,
          body: fs.createReadStream(fileObject.path),
        },
        requestBody: {
          name: fileObject.originalname,
          parents: [folder_id],
        },
        fields: "id,name",
      });

    return data;
  } catch (err) {
    console.log(err);
  }
};

// DELETE FILES
const DeleteFiles = async (fileID) => {
  try {
    const { data } = await google
      .drive({ version: "v3", auth: authorize })
      .files.delete({
        fileId: fileID,
      });

    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  UploadFiles,
  DeleteFiles,
};
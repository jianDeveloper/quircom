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

const DownloadFiles = async (fileID) => {
  try {
    const drive = google.drive({ version: 'v3', auth: authorize });
    
    const { data } = await drive.files.get({
      fileId: fileID,
      alt: 'media'  // This parameter tells the API to return the actual file content
    }, { responseType: 'stream' });

    return data;
  } catch (err) {
    console.error('Error fetching file: ', err);
    throw err;
  }
};

module.exports = {
  UploadFiles,
  DeleteFiles,
  DownloadFiles
};
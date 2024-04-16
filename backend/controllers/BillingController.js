const mongoose = require("mongoose");
const BillingModel = require("../models/BillingModel");
const ClientModel = require("../models/ClientModel");

const GetAllBilling = async (req, res) => {
  try {
    const result = await BillingModel.find({}).populate("clientId");
    // variable.freelancerId.userName

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetSpecificBilling = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await BillingModel.findById(id).populate("clientId");

    if (!result) {
        return res.status(404).json({ message: "Credit not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateBilling = async (req, res) => {
  try {
    const billing = req.body;

    const newPayment = await BillingModel.create({
      clientId: billing.clientId,
      firstName: billing.firstName,
      surName: billing.surName,
      cardNum: billing.cardNum,
      expireDate: new Date(),
      cvv: billing.cvv,
      aggRee: billing.aggRee
    });

    await ClientModel.findByIdAndUpdate(billing.clientId, {
      $push: { paymentId: newPayment._id }
    });

    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const EditBilling = async (req, res) => {
  try {
    const { id } = req.params;
    const billing = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let update = {
      $set: {
        firstName: billing.firstName,
        surName: billing.surName,
        cardNum: billing.cardNum,
        expireDate: new Date(),
        cvv: billing.cvv,
      },
    };

    const result = await BillingModel.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const DeleteBilling = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No billing listed");
    }
  
    const billing = await BillingModel.findById(id);
  
    if (!billing) {
      return res.status(404).json({ message: "Billing not found" });
    }

    // Delete the billing document from the database
    const result = await BillingModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
  
};

module.exports = {
    GetAllBilling,
    GetSpecificBilling,
    CreateBilling,
    EditBilling,
    DeleteBilling
};
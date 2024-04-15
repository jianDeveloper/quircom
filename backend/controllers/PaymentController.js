const mongoose = require("mongoose");
const PaymentModel = require("../models/PaymentModel");
const ClientModel = require("../models/PaymentModel");

const GetAllCredit = async (req, res) => {
  try {
    const result = await PaymentModel.find({}).populate("requestId").populate("freelancerId");
    // variable.freelancerId.userName

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetSpecificCredit = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await PaymentModel.findById(id).populate("requestId").populate("freelancerId");

    if (!result) {
        return res.status(404).json({ message: "Credit not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateCredit = async (req, res) => {
  try {
    const { body } = req;
    const credit = JSON.parse(body.credit);

    const newPayment = await PaymentModel.create({
      clientId: credit.clientId,
      firstName: credit.firstName,
      surName: credit.surName,
      cardNum: credit.cardNum,
      expireDate: new Date(),
      cvv: credit.cvv,
      aggRee: credit.aggRee
    });

    await ClientModel.findByIdAndUpdate(client.paymentId, {
      $push: { payment: newPayment._id }
    });

    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



const EditCredit = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const credit = JSON.parse(body.credit);

    const result = await PaymentModel.findByIdAndUpdate(
      credit._id,
      {
        $set: {
          firstName: credit.firstName,
        surName: credit.surName,
        cardNum: credit.cardNum,
        expireDate: new Date(),
        cvv: credit.cvv,
        },
      }, 
    {new: true}
    );
    res.status(201).json(result);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const DeleteCredit = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No credit listed");
    }
  
    const credit = await PaymentModel.findById(id);
  
    if (!credit) {
      return res.status(404).json({ message: "credit not found" });
    }

    // Delete the credit document from the database
    const result = await PaymentModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
  
};

module.exports = {
    GetAllCredit,
    GetSpecificCredit,
    CreateCredit,
    EditCredit,
    DeleteCredit
};
const express = require("express");
const userReg = require("../modules/register.js");

const route = express.Router();

route.get("/", async (req, res) => {
  try{
    const allReg = await userReg.find({});
    res.status(200).json({ status: "SUCCESS", allReg});
  }catch (error){
    res.status(500).json({ statue: "FILED", error})
  }
});

route.post("/create", async (req, res) => {
  try{
    const newReg = await userReg.create(req.body);
    res.status(200).json({ status: "SUCCESS", newReg});
  } catch(error){
    res.status(500).json({ statue: "FILED", error})
  }
})

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try{
    const singleUser = await userReg.findById(id);
    res.status(200).json({ status: "SUCCESS", singleUser});
  } catch(error){
    res.status(500).json({ statue: "FILED", error})
  }
})

module.exports = route;
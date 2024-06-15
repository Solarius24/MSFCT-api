const { default: mongoose } = require("mongoose");
const Asset = require("../models/assetModel");

const getAssets = async (req, res) => {
  const assets = await Asset.find({}).sort({ createdAt: -1 });
  res.status(200).json(assets);
};

const createNewAsset = async (req, res) => {
  const { id } = req.query;
  req.body.itemId = new mongoose.Types.ObjectId();
  req.body.createdDate = new Date();

  const newAsset = await Asset.findOneAndUpdate(
    { _id: id },
    { $addToSet: { listOfItems: req.body } }
  );
  if (!newAsset) {
    return res.status(404).json({ error: "No such asset" });
  }

  res.status(200).json(newAsset);
};

const updateAsset = async (req, res) => {
  const { id } = req.query;
  const newStatus = await Asset.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        listOfItems: req.body,
      },
    }
  );

  if (!newStatus) {
    return res.status(400).json({ error: "No such form" });
  }

  res.status(200).json(newStatus);
};

module.exports = {
  getAssets,
  updateAsset,
  createNewAsset,
};

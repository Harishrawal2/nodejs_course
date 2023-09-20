const Players = require("../models/players");

function GetAllPlayers(req, res) {
  res.json({ message: "GET All Players Seen Successfully", Players });
}

function AddPlayers(req, res) {
  const player = req.body;
  Players.push(player);
  res.json({ message: "Added Players Successfully", player });
}

function UpdatePlayers(req, res) {
  res.json({ message: "Updated Players Successfully" });
}

function GetPlayer(req, res) {
  res.json({ message: "GET Players Seen Successfully" });
}

function DeletePlayers(req, res) {
  res.json({ message: "Deleted Players Successfully" });
}

module.exports = {
  GetAllPlayers,
  AddPlayers,
  UpdatePlayers,
  GetPlayer,
  DeletePlayers,
};

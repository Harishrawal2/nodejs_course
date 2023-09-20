const express = require("express");
const {
  GetAllPlayers,
  AddPlayers,
  UpdatePlayers,
  GetPlayer,
  DeletePlayers,
} = require("../controllers/playersControllers");
const router = express.Router();

// get All players
router.get("/players", GetAllPlayers);

// Add POST METHOD players
router.post("/players", AddPlayers);

// Update players
router.put("/players/:id", UpdatePlayers);

// get One players
router.get("/players/:id", GetPlayer);

// get All players
router.delete("/players/:id", DeletePlayers);

module.exports = router;

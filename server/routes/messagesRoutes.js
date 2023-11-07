const express = require("express");

const {
  addMessage,
  getMessages,
} = require("../controllers/messagesController");

const router = express.Router();

router.post("/addMessage", addMessage);
router.post("/getMessage", getMessages);

module.exports = router;

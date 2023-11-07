const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    console.log(from, to, message);
    const messages = new Message({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    const savedMessages = await messages.save();

    if (savedMessages) {
    //   const lastMessage = await Message.aggregate([
    //     { $match: { users: from } },
    //     { $sort: { updatedAt: -1 } },
    //     { $limit: 1 },
    //   ]);

      return res
        .status(201)
        .json({
          savedMessages,
        //   lastMessage,
          msg: "Message added successfully",
        });
    }
    return res
      .status(400)
      .json({ msg: "Adding message to the database failed" });
  } catch (err) {
    if (err) res.status(500).json({ error: err.message });
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const chatMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.status(200).json(chatMessages);
  } catch (err) {
    if (err) res.status(500).json({ error: err.message });
  }
};

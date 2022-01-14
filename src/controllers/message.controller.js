const MsgModel = require("../schemas/message.schema");

class MessageController {
  getMessagesInRoom = async (req, res) => {
    const info = await MsgModel.find({ to: req.params.roomId })
      .sort({ created: -1 })
      .limit(50)
      .populate({ path: "senderId" });
    let result = info.map((i) => {
      return {
        body: i.text,
        id: i._id,
        room: i.to,
        user: {
          id: i.senderId._id,
          name: i.senderId.name,
          picture: "/Messanger/static/media/avatar.79bfd233.png",
        },
      };
    });
    res.json({ messages: result });
  };
}

module.exports = new MessageController();

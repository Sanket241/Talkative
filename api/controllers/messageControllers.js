import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    // Find an existing conversation or create a new one without messages
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: []  // Initialize with an empty array
      });
    }

    // Create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();
      res.status(200).json({ message: "Message sent successfully", newMessage });
    } else {
      res.status(500).json({ message: "Failed to create message" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages"); 
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
};
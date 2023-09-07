const _Message = require("../models/message.model");
const _User = require("../models/user.model");
const { renameSync } = require("fs");
const { ObjectId } = require("mongodb");

module.exports = {
  addMessage: async (req, res, next) => {
    try {
      const { message, from, to } = req.body;
      const getUser = onlineUsers.get(to);
      if (message && from && to) {
        const newMessage = await _Message.create({
          senderId: from,
          recieverId: to,
          message,
          messageStatus: getUser ? "delivered" : "sent",
        });
        return res.status(200).json({
          message: "Message Send Successfully!",
          message: newMessage,
        });
      }
      return res.status(400).send("Bad Request!");
    } catch (err) {
      next(err);
    }
  },
  getMessage: async (req, res, next) => {
    try {
      const { from, to } = req.params;
      const query = {
        $or: [
          { senderId: from, recieverId: to },
          { senderId: to, recieverId: from },
        ],
      };
      const messages = await _Message.find(query);
      const unreadMessages = [];
      messages.forEach((message, index) => {
        if (message.messageStatus !== "read" && message.senderId === to) {
          messages[index].messageStatus = "read";
          unreadMessages.push(message._id);
        }
      });
      if (unreadMessages.length > 0) {
        await _Message.updateMany(
          { _id: { $in: unreadMessages } },
          { $set: { messageStatus: "read" } }
        );
      }
      if (messages) {
        return res.status(200).json({
          message: "List Of Message",
          messages,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  addImageMessage: async (req, res, next) => {
    try {
      if (req.file) {
        const date = Date.now();
        let fileName = "uploads/images/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const { from, to } = req.query;
        const getUser = onlineUsers.get(to);
        if (from && to) {
          const message = await _Message.create({
            senderId: from,
            recieverId: to,
            message: fileName,
            messageStatus: getUser ? "delivered" : "sent",
            type: "image",
          });
          return res.status(200).json({
            message,
          });
        }
        return res.status(400).json("Bad Request!");
      }
      return res.status(400).json("Image is required!");
    } catch (err) {
      next(err);
    }
  },
  getInitialContactWithMessages: async (req, res, next) => {
    try {
      const { from } = req.params;
      const senderUserMessage = await _Message
        .find({ senderId: from })
        .populate("senderId recieverId");
      const recieveUserMessage = await _Message
        .find({ recieverId: from })
        .populate("senderId recieverId");
      const messages = [...senderUserMessage, ...recieveUserMessage];
      messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      const users = new Map();

      const messageStatusChange = [];

      messages.forEach((msg) => {
        const userId = from;
        const isSender = new ObjectId(msg.senderId._id).toString() === userId;
        const calculatedId = isSender
          ? new ObjectId(msg.recieverId._id).toString()
          : new ObjectId(msg.senderId._id).toString();
        if (msg.messageStatus === "sent") {
          messageStatusChange.push(msg._id);
        }
        const {
          _id,
          type,
          message,
          messageStatus,
          createdAt,
          senderId,
          recieverId,
        } = msg;
        if (!users.get(calculatedId)) {
          let user = {
            messageId: _id,
            type,
            message,
            messageStatus,
            createdAt,
            senderId,
            recieverId,
          };
          if (isSender) {
            userUpdate = {
              ...user,
              ...msg.recieverId,
              totalUnreadMessages: 0,
            };
          } else {
            userUpdate = {
              ...user,
              ...msg.senderId,
              totalUnreadMessages: messageStatus !== "read" ? 1 : 0,
            };
          }
          users.set(calculatedId, { ...userUpdate });
        } else if (msg.messageStatus !== "read" && !isSender) {
          const user = users.get(calculatedId);
          if (user) {
            users.set(calculatedId, {
              ...user,
              totalUnreadMessages: user.totalUnreadMessages + 1,
            });
          }
        }
      });
      if (messageStatusChange.length > 0) {
        await _Message.updateMany(
          { _id: { $in: messageStatusChange } },
          { $set: { messageStatus: "delivered" } }
        );
      }
      return res.status(200).json({
        users: Array.from(users.values()),
        onlineUsers: Array.from(onlineUsers.keys()),
      });
    } catch (err) {
      next(err);
    }
  },
  // getInitialContactWithMessages: async (req, res, next) => {
  //   try {
  //     const { from } = req.params;

  //     // Fetch all messages related to the user
  //     const messages = await _Message
  //       .find({
  //         $or: [{ senderId: from }, { recieverId: from }],
  //       })
  //       .populate("senderId recieverId");

  //     // Update message statuses to "delivered" in bulk
  //     const messageStatusChange = messages
  //       .filter((msg) => msg.messageStatus === "sent")
  //       .map((msg) => msg._id);
  //     if (messageStatusChange.length > 0) {
  //       await _Message.updateMany(
  //         { _id: { $in: messageStatusChange } },
  //         { $set: { messageStatus: "delivered" } }
  //       );
  //     }

  //     const users = new Map();
  //     const onlineUsers = new Set(); // Define onlineUsers if needed

  //     messages.forEach((msg) => {
  //       const userId = from;
  //       const isSender = String(msg.senderId) === userId;
  //       const otherUserId = isSender ? msg.recieverId : msg.senderId;

  //       if (!users.has(otherUserId)) {
  //         const unreadCount = msg.messageStatus !== "read" && !isSender ? 1 : 0;
  //         const user = {
  //           messageId: msg._id,
  //           type: msg.type,
  //           message: msg.message,
  //           messageStatus: msg.messageStatus,
  //           createdAt: msg.createdAt,
  //           senderId: msg.senderId,
  //           recieverId: msg.recieverId,
  //           totalUnreadMessages: unreadCount,
  //           ...(!isSender ? msg.senderId : msg.recieverId),
  //         };
  //         users.set(otherUserId, user);
  //       } else if (msg.messageStatus !== "read" && !isSender) {
  //         const user = users.get(otherUserId);
  //         if (user) {
  //           user.totalUnreadMessages += 1;
  //         }
  //       }
  //     });

  //     return res.status(200).json({
  //       users: Array.from(users.values()),
  //       onlineUsers: Array.from(onlineUsers), // Include onlineUsers if needed
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};

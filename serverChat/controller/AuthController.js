const _User = require("../models/user.model");

module.exports = {
  checkUser: async (req, res, next) => {
    try {
      const user = await _User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(200)
          .json({ message: "User found", status: true, user });
      } else {
        return res
          .status(200)
          .json({ message: "User not found", status: false });
      }
    } catch (error) {
      next(error);
    }
  },
  registerUser: async (req, res, next) => {
    try {
      const { name, email, image: profilePicture, about } = req.body;
      const user = await _User.create({ name, email, profilePicture, about });
      return res.status(200).json({ message: "Success", status: true, user });
    } catch (error) {
      next(error);
    }
  },
  getAllUser: async (req, res, next) => {
    try {
      const users = await _User.find({});
      if (users) {
        const userGroup = {};
        users.forEach((user) => {
          const initialLetter = user.name.charAt(0).toUpperCase();
          if (!userGroup[initialLetter]) {
            userGroup[initialLetter] = [];
          }
          userGroup[initialLetter].push(user);
        });

        return res.status(200).json({
          message: "List User",
          userGroup,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

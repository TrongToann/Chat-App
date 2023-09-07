import userModel from "../models/user.model";

module.exports = {
  checkUser: async (req, res, next) => {
    try {
      const user = await _User.find;
    } catch (error) {
      next(error);
    }
  },
};

const userManage = require("../database/repository/user_manage");
const messageReader = require("../utils/i18n/message_reader");
const { SUCCESS, SERVER_ERROR } =
  require("../utils/constants/appconstants").STATUS_CODES;

module.exports = {
  /**
   * @route POST /auth/register
   * @desc Register user
   * @access Private
   */
  register(req, res) {
    const userObj = req.body;
    // req.header('Access-Control-Allow-Origin','*');
    return userManage.add(userObj, res);
  },
  /**
   * @route POST /auth/signin
   * @desc Signin user
   * @access Private
   */
  signin(req, res) {
    const userObj = req.body;
    const result = userManage.find(userObj, res);
    return result;
  },
  /**
   * 
   * @route PUT /account/profile/change-password 
   * @desc Update password 
   * @access Private
   */
  changePassword(req, res) {
    const userObj = req.body;
    userObj.email = req.decode.email;
    return userManage.updatePassword(userObj, res);
  },
};

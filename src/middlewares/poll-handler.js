const { v4: uuidv4 } = require("uuid");
const pollController = require("../controllers/poll");

const pollHandler = {
  create(req, res, next) {
    let pollObj = req.body;
    const { id } = req.decode;
    pollObj.user = id;
    pollObj.uid = uuidv4();
    next();
  },
  edit(req, res, next) {
    let pollObj = req.body;
    const { id } = req.decode;
    pollObj.user = id;
    next();
  },
};

module.exports = pollHandler;

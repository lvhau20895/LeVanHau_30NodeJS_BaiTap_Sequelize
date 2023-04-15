const express = require("express");
const resRouter = require("./resRouter");

const router = express.Router();

router.use("/res", resRouter);

module.exports = router;

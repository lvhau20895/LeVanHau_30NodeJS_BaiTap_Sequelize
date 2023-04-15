const express = require("express");
const {
	userLikeRes,
	getListLikeByRes,
	getListLikeByUser,
	addRate,
	getListRateByRes,
	getListRateByUser,
	addOrder
} = require("../Controllers/resController");

const resRouter = express.Router();

resRouter.post("/UserLikeRes", userLikeRes);
resRouter.get("/GetListLikeByRes/:res_id", getListLikeByRes);
resRouter.get("/GetListLikeByUser/:user_id", getListLikeByUser);
resRouter.post("/AddRate", addRate);
resRouter.get("/GetListRateByRes/:res_id", getListRateByRes);
resRouter.get("/GetListRateByUser/:user_id", getListRateByUser);
resRouter.post("/AddOrder", addOrder);

module.exports = resRouter;

const initModel = require("../Models/init-models");
const sequelize = require("../Models/index");
const { successCode, errorCode, failCode } = require("../Utils/response");

const models = initModel(sequelize);

// 1. Xử lý like & unlike nhà hàng
const userLikeRes = async (req, res) => {
	const { user_id, res_id } = req.body;
	const date_like = new Date(Date.now() + 7 * 60 * 60 * 1000);
	const newLike = { user_id, res_id, date_like };
	try {
		const user = await models.user.findByPk(user_id);
		const restaurant = await models.restaurant.findByPk(res_id);

		if (!user || !restaurant) return failCode(res, "not found");

		const data = await models.like_res.findOne({
			where: { user_id, res_id }
		});

		if (data) {
			await models.like_res.destroy({
				where: { user_id, res_id }
			});
			successCode(res, "unlike success");
		} else {
			await models.like_res.create(newLike);
			successCode(res, "like success");
		}
	} catch (error) {
		errorCode(res, "error server - " + error);
	}
};

// 2. Lấy danh sách like theo nhà hàng
const getListLikeByRes = async (req, res) => {
	const { res_id } = req.params;
	try {
		const data = await models.restaurant.findOne({
			where: { res_id },
			include: [
				{
					model: models.user,
					as: "users_like_res",
					through: { attributes: [] } // ẩn bảng phụ
				}
			]
		});

		if (!data) {
			return failCode(res, "not found");
		}
		successCode(res, "get list success", data);
	} catch (error) {
		errorCode(res, "error server - " + error);
	}
};

// 3. Lấy danh sách like theo user
const getListLikeByUser = async (req, res) => {
	const { user_id } = req.params;
	try {
		const data = await models.user.findOne({
			where: { user_id },
			include: [
				{
					model: models.restaurant,
					as: "res_like_by_user",
					through: { attributes: [] }
				}
			]
		});

		if (!data) {
			return failCode(res, "not found");
		}
		successCode(res, "get list success", data);
	} catch (error) {
		errorCode(res, "error server - " + error);
	}
};

// 4. Thêm đánh giá
const addRate = async (req, res) => {
	const { user_id, res_id, amount } = req.body;
	const date_rate = new Date(Date.now() + 7 * 60 * 60 * 1000);
	const newRate = { user_id, res_id, amount, date_rate };
	try {
		const user = await models.user.findByPk(user_id);
		const restaurant = await models.restaurant.findByPk(res_id);

		if (!user || !restaurant) return failCode(res, "not found");

		const data = await models.rate_res.findOne({
			where: { user_id, res_id }
		});

		if (data) return failCode(res, "rating exists");

		await models.rate_res.create(newRate);
		successCode(res, "add rate success");
	} catch (error) {
		errorCode(res, "error server - " + error);
	}
};

// 5. Lấy danh sách đánh giá theo nhà hàng
const getListRateByRes = async (req, res) => {
	const { res_id } = req.params;
	try {
		const data = await models.restaurant.findOne({
			where: { res_id },
			include: {
				model: models.user,
				as: "users_rate_res",
				through: { attributes: ["amount", "date_rate"] }
			}
		});

		if (!data) {
			return failCode(res, "not found");
		}
		successCode(res, "get success", data);
	} catch (error) {
		errorCode(res, "error server - " + error);
	}
};

// 6. Lấy danh sách đánh giá theo user
const getListRateByUser = async (req, res) => {
	const { user_id } = req.params;
	try {
		const data = await models.user.findOne({
			where: { user_id },
			include: {
				model: models.restaurant,
				as: "res_rate_by_user",
				through: { attributes: ["amount", "date_rate"] }
			}
		});

		if (!data) {
			return failCode(res, "not found");
		}
		successCode(res, "get success", data);
	} catch (error) {
		errorCode("error server - " + error);
	}
};

// 7. Thêm order
const addOrder = async (req, res) => {
	const { user_id, food_id, amount, arr_sub_id } = req.body;
	const code = Math.random().toString(36).substring(2);
	const newOrder = { user_id, food_id, amount, code, arr_sub_id };
	try {
		const user = await models.user.findByPk(user_id);
		const food = await models.food.findByPk(food_id);

		if (!user || !food) return failCode(res, "not found");

		if (arr_sub_id !== "") {
			const arrSubId = JSON.parse(arr_sub_id);
			const subFood = await models.sub_food.findAll({
				where: { sub_id: arrSubId }
			});
			if (subFood.length !== arrSubId.length)
				return failCode(res, "sub food doesn't exist");
		}

		const data = await models.order.findOne({
			where: { user_id, food_id }
		});

		if (!data) {
			await models.order.create(newOrder);
			successCode(res, "add order success");
		} else {
			failCode(res, "order exists");
		}
	} catch (error) {
		errorCode(res, "error server - " + error);
	}
};

module.exports = {
	userLikeRes,
	getListLikeByRes,
	getListLikeByUser,
	addRate,
	getListRateByRes,
	getListRateByUser,
	addOrder
};

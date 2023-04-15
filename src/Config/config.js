require("dotenv").config();

module.exports = {
	db_database: process.env.DATABASE,
	db_user: process.env.USER,
	db_password: process.env.PASSWORD,
	db_host: process.env.HOST,
	db_port: process.env.PORT,
	db_dialect: process.env.DIALECT
};

const { Sequelize } = require("sequelize");
const config = require("../Config/config");

const sequelize = new Sequelize(
	config.db_database,
	config.db_user,
	config.db_password,
	{
		host: config.db_host,
		port: config.db_port,
		dialect: config.db_dialect
	}
);

module.exports = sequelize;

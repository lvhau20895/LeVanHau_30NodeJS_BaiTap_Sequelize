const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	return user.init(sequelize, DataTypes);
};

class user extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				user_id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true
				},
				full_name: {
					type: DataTypes.STRING(255),
					allowNull: true
				},
				email: {
					type: DataTypes.STRING(255),
					allowNull: true
				},
				pass_word: {
					type: DataTypes.STRING(255),
					allowNull: true
				}
			},
			{
				sequelize,
				tableName: "user",
				timestamps: false,
				indexes: [
					{
						name: "PRIMARY",
						unique: true,
						using: "BTREE",
						fields: [{ name: "user_id" }]
					}
				]
			}
		);
	}
}

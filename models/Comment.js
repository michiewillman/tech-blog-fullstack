const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post: {
      // foreign key to Post(id)
    },
    author: {
      // foreign key to User(username) of User(id)
    },
    dateCreated: {
      // automated date 
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post",
                key: "post_id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "user_id",
                allowNull: false,
            },
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },  
    {
        sequelize,
        freezeTableName: true,
        modelName: 'comment',
        underscored: true,
    }
);

module.exports = Comment;

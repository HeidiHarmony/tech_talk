const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'deleted'),
      defaultValue: 'draft',
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_published: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_modified: {
    type: DataTypes.ARRAY(DataTypes.DATE),
    allowNull: true,
  }, 
  {
    hooks: {
      beforeValidate: (post, options) => {
        const minWords = 100;
        const maxWords = 1500; // Example maximum word count
        const wordCount = post.content.split(/\s+/).length;
  
        if (wordCount < minWords || wordCount > maxWords) {
          throw new Error(`Blog post must be between ${minWords} and ${maxWords} words.`);
        }
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;

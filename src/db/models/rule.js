"use strict";
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define(
    "Rule",
    {
      description: DataTypes.STRING,
      topicId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Topic",
          key: "id",
          as: "topicId"
        }
      }
    },
    {}
  );
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(model.Topic, {
      foreignkey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Rule;
};

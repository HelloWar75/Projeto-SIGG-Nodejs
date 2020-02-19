'use strict';
module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    user_id: DataTypes.INTEGER,
    vote_type: DataTypes.INTEGER
  }, {});
  Votes.associate = function(models) {
    // associations can be defined here
  };
  return Votes;
};
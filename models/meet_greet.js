'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_Greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meet_Greet.init({
    meet_greet_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    event_id: {
      type:DataTypes.SMALLINT,
      allowNull:false
    },
    band_id: {
      type:DataTypes.SMALLINT,
      allowNull:false
    },
    meet_start_time: {
      type:DataTypes.DATE,
      allowNull:false

    },
    meet_end_time: {
      type:DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Meet_Greet',
    tableName: 'meet_greets',
    timestamps:false
  });
  return Meet_Greet;
};
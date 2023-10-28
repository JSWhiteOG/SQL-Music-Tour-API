'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, Stage_Event, Set_Time }) {
      // events 
      Stage.belongsToMany(Event, {
        foreignKey: "stage_id",
        as: "events",
        through: Stage_Event
      })

      // set times 
      Stage.hasMany(Set_Time, {
        foreignKey: "stage_id",
        as: "set_times"
      })
    }
  }
  Stage.init({
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },
    stage_name: {
      type: DataTypes.STRING,
      allowNull:false
  }
  }, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stages',
    timestamps:false
  });
  return Stage;
};
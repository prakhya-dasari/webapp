const { DataTypes } = require('sequelize');



console.log('inside user model');
function model(sequelize){
  const options = {
    defaultScope: {
        // exclude hash by default
        attributes: { exclude: ['hash'] }
    },
    scopes: {
        // include hash with this scope
        withHash: { attributes: {}, }
    }
  };
  const  attributes={
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    create_time:{
      type: DataTypes.STRING,
      allowNull: false
    },
    update_time:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  return sequelize.define('User',attributes,options);
}

module.exports = model;
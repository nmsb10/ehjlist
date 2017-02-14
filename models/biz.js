module.exports = function(sequelize, DataTypes) {
  var Biz = sequelize.define("Biz",
  {
    biz_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    biz_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        //changed this so validation checks that there are minimum 2 characters
        len: [2]
      }
    },
    biz_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    biz_street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    biz_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biz_state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    biz_lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    biz_long: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
  return Biz;
};

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category",
  {
    cat_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Category;
};

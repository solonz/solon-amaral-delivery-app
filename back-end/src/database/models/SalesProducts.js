module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'sales',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'salesProducts',
    underscored: true,
  });

  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Sale, {
      foreignKey: 'sale_id'
    });
    SalesProduct.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
  };
  return SalesProduct;
};

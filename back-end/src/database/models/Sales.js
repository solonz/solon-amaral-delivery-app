module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total_price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false
    },
    delivery_address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delivery_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.hasMany(models.SalesProduct, {
      foreignKey: 'sale_id',
      as: 'sales_to_sales_product'
    });
  };

  return Sale;
};

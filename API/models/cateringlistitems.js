import { Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  class CateringListItems extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      // eslint-disable-next-line no-restricted-syntax
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CateringListItems.init({
    catering_list_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    item_name: DataTypes.STRING,
    image_name: DataTypes.STRING,
    category_list_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CateringListItems',
  });
  return CateringListItems;
};
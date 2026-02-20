import { Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  class CateringListItemsTypes extends Model {
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
  CateringListItemsTypes.init({
    catering_list_item_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type_name: DataTypes.STRING,
    image_name: DataTypes.STRING,
    catering_list_item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CateringListItemsTypes',
  });
  return CateringListItemsTypes;
};
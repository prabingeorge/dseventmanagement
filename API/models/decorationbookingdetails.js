
import { DATE, Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  class DecorationBookingDetails extends Model {
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
  DecorationBookingDetails.init({
    purchase_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    category_list_id: DataTypes.INTEGER,
    category_list_item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.BIGINT,
    venue_id: DataTypes.BIGINT
    // last_login_at: DataTypes.DATE,
    // last_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DecorationBookingDetails',
  });
  return DecorationBookingDetails;
};
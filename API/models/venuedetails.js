import { Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  class VenueDetails extends Model {
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
  VenueDetails.init({
    venue_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    location: DataTypes.STRING,
    event_date: DataTypes.DATE,
    event_time: DataTypes.STRING,
    gender: DataTypes.STRING,
    guest_count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'VenueDetails',
  });
  return VenueDetails;
};
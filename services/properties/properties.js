const model = require('../../models/index');
const { fromDb, toDb } = require('./converter');
const { validateAirbnbId, statuses } = require('../airbnb/airbnb');

const errors = {
  OK: 'OK',
  AIRBNB_NOT_FOUND: 'AIRBNB_NOT_FOUND',
  AIRBNB_TOO_MANY_REQUESTS: 'AIRBNB_TOO_MANY_REQUESTS',
};

async function getAll() {
  const properties = await model.Property.findAll({});
  const converted = properties.map(fromDb);

  return converted;
}

async function get(id) {
  const property = await model.Property.findById(id);
  const converted = fromDb(property);

  return converted;
}

async function getVersions(id) {
  const properties = await model.VersionProperty.findAll({ where: { id } });
  const converted = properties.map(fromDb);

  return converted;
}

async function create(property) {
  const converted = toDb(property);

  const isAirbnbIdValid = await validateAirbnbId(converted.airbnbId);

  if (isAirbnbIdValid === statuses.OK) {
    const property = await model.Property.create(converted);
    return { property, error: false, message: 'Created a new property' };
  } if (isAirbnbIdValid === statuses.NOT_VALID) {
    return { property, error: true, message: 'airbnbId not valid' };
  }
  return { property, error: true, message: 'unknown error' };
}

async function update(id, property) {
  const converted = toDb(property);

  const found = await model.Property.findById(id);

  if (found) {
    Object.keys(converted).forEach((key) => {
      found.set(key, converted[key]);
    });
    await found.save();
    return true;
  } else {
    return false;
  }
}

async function remove(id) {
  const found = await model.Property.findById(id);

  if (found) {
    await found.destroy();
    return true;
  } else {
    return false;
  }
}

module.exports = {
  get,
  getVersions,
  getAll,
  create,
  update,
  remove,
  errors,
};

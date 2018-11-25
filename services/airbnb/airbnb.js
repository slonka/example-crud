const goodGuy = require('good-guy-http')({
  followRedirect: false,
});
const LRU = require('lru-cache');

const options = { max: 100000, maxAge: 1000 * 60 * 60 }; // max age - 60 minutes
const cache = LRU(options);

const AIRBNB_URL = process.env.AIRBNB_URL || 'https://www.airbnb.pl';

const statuses = {
  OK: 'OK',
  NOT_VALID: 'NOT_VALID',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
};

async function validateAirbnbId(id) {
  if (cache.has(id)) {
    return cache.get(id);
  }

  try {
    const resp = await goodGuy({
      url: `${AIRBNB_URL}/rooms/${id}`,
      method: 'HEAD',
      headers: {
        'User-Agent': 'request',
      },
    });

    if (resp.statusCode === 200) {
      cache.set(id, statuses.OK);
      return statuses.OK;
    }
  } catch (error) {
    // if we ever wanted to add the property even if airbnb check fails then we could use this
    if (error.statusCode === 429) {
      cache.set(id, statuses.TOO_MANY_REQUESTS);
      return statuses.TOO_MANY_REQUESTS;
    }
  }

  cache.set(id, statuses.NOT_VALID);
  return statuses.NOT_VALID;
}

module.exports = {
  validateAirbnbId,
  statuses,
};

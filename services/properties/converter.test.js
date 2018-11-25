const expect = require('chai').expect;

const { fromDb, toDb } = require('./converter');

const api = {
  owner: 'carlos',
  address: {
    line1: 'Flat 5',
    line4: '7 Westbourne Terrace',
    postCode: 'W2 3UL',
    city: 'London',
    country: 'U.K.',
  },
  airbnbId: 242424242424,
  numberOfBedrooms: 1,
  numberOfBathrooms: 1,
  incomeGenerated: 2000.34,
};

const db = {
  owner: 'carlos',
  line1: 'Flat 5',
  line4: '7 Westbourne Terrace',
  postCode: 'W2 3UL',
  city: 'London',
  country: 'U.K.',
  airbnbId: 242424242424,
  numberOfBedrooms: 1,
  numberOfBathrooms: 1,
  incomeGenerated: 2000.34,
};

describe('converter', () => {
  it('should convert from api format to db format', () => {
    const converted = toDb(api);
    expect(converted).to.deep.equal(db);
  });

  it('should convert from db format to api', () => {
    const converted = fromDb(db);
    expect(converted).to.deep.equal(api);
  });
});

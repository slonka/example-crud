const { expect } = require('chai');
const nock = require('nock');

const { validateAirbnbId, statuses } = require('./airbnb');

describe('airbnb service', () => {
  const AIRBNB_URL = 'https://www.airbnb.pl';

  it('should check if airbnb id is valid', async () => {
    const id = 1;
    const path = `/rooms/${id}`;
    nock(AIRBNB_URL)
      .head(path)
      .reply(200, '');

    const isValid = await validateAirbnbId(id);

    expect(isValid).to.equal(statuses.OK);
  });

  it('should check if airbnb id is not valid', async () => {
    const id = 2;
    const path = `/rooms/${id}`;

    nock(AIRBNB_URL)
      .head(path)
      .reply(302, '');

    const isValid = await validateAirbnbId(id);

    expect(isValid).to.equal(statuses.NOT_VALID);
  });

  it('should not make repeated request to airbnb', async () => {
    const id = 3;
    const path = `/rooms/${id}`;

    const mock = nock(AIRBNB_URL)
      .head(path)
      .times(2)
      .reply(200, '');

    await validateAirbnbId(id);
    await validateAirbnbId(id);

    expect(mock.interceptors[0].counter).to.equal(1);
  });
});

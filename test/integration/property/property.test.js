const request = require('supertest');
const nock = require('nock');
const path = require('path');
const { expect } = require('chai');
const sqlite3 = require('sqlite3').verbose();
const app = require('../../../app');

let db;
const validProperty = require('./valid_property.json');
const validProperty2 = require('./valid_property2.json');
const invalidProperty = require('./invalid_property.json');

const AIRBNB_URL = 'https://www.airbnb.pl';

describe('property integration test', () => {
  before((done) => {
    const databasePath = path.resolve(__dirname, '..', 'db', 'database.sqlite');
    db = new sqlite3.Database(databasePath, done);
  });

  after(() => {
    db.close();
  });

  it('should add valid property', async () => {
    const id = validProperty.airbnbId;
    nock(AIRBNB_URL)
      .head(`/rooms/${id}`)
      .reply(200, '');

    await request(app)
      .post('/api/properties')
      .send(validProperty)
      .expect(201);
  });

  it('should not add invalid property', async () => {
    const id = invalidProperty.airbnbId;
    nock(AIRBNB_URL)
      .head(`/rooms/${id}`)
      .reply(200, '');

    await request(app)
      .post('/api/properties')
      .send(invalidProperty)
      .expect(400);
  });

  it('should get property versions', async () => {
    const id = validProperty2.airbnbId;
    nock(AIRBNB_URL)
      .head(`/rooms/${id}`)
      .reply(200, '');

    const response = await request(app)
      .post('/api/properties')
      .send(validProperty2)
      .expect(201);

    const propertyId = response.body.data.id;

    const newOwnerName = 'chris';
    await request(app)
      .put(`/api/properties/${propertyId}`)
      .send({
        ...validProperty2, owner: newOwnerName,
      })
      .expect(200);

    const response2 = await request(app)
      .get(`/api/properties/${propertyId}/versions`)
      .expect(200);

    const versions = response2.body.data;

    expect(versions[0].owner).to.equal(validProperty2.owner);
    expect(versions[1].owner).to.equal(newOwnerName);

    expect(versions[0].versionType).to.equal('CREATED');
    expect(versions[1].versionType).to.equal('UPDATED');
  });
});

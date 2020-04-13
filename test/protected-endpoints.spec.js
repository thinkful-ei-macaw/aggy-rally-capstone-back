const app = require('../src/app');
const { API_TOKEN } = require('../src/config');

// set up variables used throughout these tests
const endpoint = '/protected';

describe('Protected endpoints', () => {

  it(`GET ${endpoint} responds with 200 when given correct authorization header and token`, () => {
    return supertest(app)
      .get(endpoint)
      .set('Authorization', 'bearer ' + API_TOKEN)
      .expect(200);
  });

  it(`GET ${endpoint} responds with 401 if auth header is not provided`, () => {
    return supertest(app)
      .get(endpoint)
      .expect(401);
  });

  it(`GET ${endpoint} responds with 401 if token is incorrect`, () => {
    return supertest(app)
      .get(endpoint)
      .set('Authorization', 'bearer ' + 'not-the-token-you-want')
      .expect(401);
  });
  
});
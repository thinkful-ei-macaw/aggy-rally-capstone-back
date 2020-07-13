const knex = require('knex');
const app = require('../src/app');

const { TEST_DATABASE_URL } = require('../src/config');
const { makeUsersArray } = require('./users.fixtures');
const { makeProfileArray, randomProfile, makeProfileRes } = require('./profiles.fixtures');
const auth = require('../src/services/auth-service')
const profilesRouter = require('../src/routers/profile-router');

// set up variables used throughout these tests
const table_name = 'profiles';
const endpoint = '/profiles';

describe('Profiles endpoints', () => {
  let db;
  before('set up db instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL
    });

    app.set('db', db);
  });

const cleanData = () => db.raw('truncate users restart identity cascade');
  before('clean the table', cleanData);
  afterEach('clean the table', cleanData);
  after('disconnect from db', () => db.destroy());

  // GET requests (READ)
  context(`Given there are items in the '${table_name}' table`, () => {
    const testProfile = makeProfileArray();
    const testProfileRes = makeProfileRes();
    const testUsers = makeUsersArray();
    const authToken = auth.createJwt(testUsers[0].user_name, {user_id: testUsers[0].id});

    beforeEach(() => {
      return db
        .into('users')
        .insert(testUsers)
    })

    beforeEach(() => {
      return db
        .into(table_name)
        .insert(testProfile);
    });

    it(`GET '${endpoint}' responds with 200 with an object`, () => {
      return supertest(app)
        .get(endpoint)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200, testProfile[0]);
    });

    it(`GET ${endpoint}/:id responds with 200 with the requested item`, () => {
      const expected = randomProfile();
      const { userid } = expected;
      return supertest(app)
        .get(endpoint + '/' + userid)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200, expected);
    });

  });

  context(`Given no items in the '${table_name}' table`, () => {
    const testUsers = makeUsersArray();
    const authToken = auth.createJwt(testUsers[0].user_name, {user_id: testUsers[0].id});

    beforeEach(() => {
      return db
        .into('users')
        .insert(testUsers)
    })

    it(`GET ${endpoint} responds with 200 with an empty object`, () => {
      return supertest(app)
        .get(endpoint)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200, {});
    });

    it(`GET ${endpoint}/:id responds with 404`, () => {
      const userid = 2;
      return supertest(app)
        .get(endpoint + '/' + userid)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
  
});
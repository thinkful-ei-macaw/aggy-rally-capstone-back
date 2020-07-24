const knex = require('knex');
const app = require('../src/app');

const { TEST_DATABASE_URL } = require('../src/config');
const { makeUsersArray } = require('./users.fixtures');
const { makeProfileArray, randomProfile, makeProfileRes } = require('./profiles.fixtures');
const auth = require('../src/services/auth-service')
const profilesRouter = require('../src/routers/profile-router');
const supertest = require('supertest');

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

  describe(`POST ${endpoint}/`, () => {
    const required = ['gamemaster', 'genre', 'romance', 'frequency', 'duration', 'alignment', 'groupsize', 'pvp', 'experience', 'gmexp', 'playexp']

    const testUsers = makeUsersArray();
    const authToken = auth.createJwt(testUsers[0].user_name, {userid: testUsers[0].id});
    const newProfile = {
      userid: 1, 
      gamemaster: false, 
      genre: 'sci-fi', 
      romance: true, 
      frequency: 'Weekly', 
      duration: 'Short 2 to 3 Hours', 
      alignment: 'Evil', 
      groupsize: 4, 
      pvp: true, 
      experience: 1, 
      gmexp: false, 
      playexp: true
    }
    
    beforeEach(() => {
      return db
        .into('users')
        .insert(testUsers)
    });

    required.forEach((field) => {
      it(`Responds with 404 required error when '${field}' is missing`, () => {
          return supertest(app)
              .post('/')
              .send()
              .expect(404);
      });
  });

    it(`Creates and sesponds with 201 when '${table_name}' is provided`, () => {
      
      
      return supertest(app)
        .post(endpoint + '/')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newProfile)
        .expect(201);
    });
  });

  context(`Given there are items in the '${table_name}' table`, () => {
    const testProfile = makeProfileArray();
    const testProfileRes = makeProfileRes();
    const testUsers = makeUsersArray();
    const authToken = auth.createJwt(testUsers[0].user_name, {userid: testUsers[0].id});

    beforeEach(() => {
      return db
        .into('users')
        .insert(testUsers)
    });

    beforeEach(() => {
      return db
        .into(table_name)
        .insert(testProfile);
    });

    it(`DELETE ${endpoint}/:id responds with 204`, () => {
      const id = 2
      const expected = testProfile[0]
      return supertest(app)
        .delete(endpoint + '/' + id)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204)
        .then(res => {
          return supertest(app)
            .get(endpoint)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(expected)
        });
    });

    it(`DELETE ${endpoint}/:id responds with 404`, () => {
      const id = 12
      return supertest(app)
        .delete(endpoint + '/' + id)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404)
    });
  });

  // GET requests (READ)
  context(`Given there are items in the '${table_name}' table`, () => {
    const testProfile = makeProfileArray();
    const testProfileRes = makeProfileRes();
    const testUsers = makeUsersArray();
    const authToken = auth.createJwt(testUsers[0].user_name, {userid: testUsers[0].id});

    beforeEach(() => {
      return db
        .into('users')
        .insert(testUsers)
    });

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

    it(`GET ${endpoint}/:userid responds with 200 with the requested item`, () => {
      const expected = randomProfile();
      const { userid } = expected;
      return supertest(app)
        .get(endpoint + '/' + userid)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200, expected);
    });

    it(`GET '${endpoint}/match' responds with 200 with an object`, () => {
      return supertest(app)
        .get(endpoint + '/match?genre=fantasy&romance=true&pvp=true')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200, [testProfile[0], testProfile[2]]);
    }); 

    
  });

  context(`Given no items in the '${table_name}' table`, () => {
    const testUsers = makeUsersArray();
    const authToken = auth.createJwt(testUsers[0].user_name, {userid: testUsers[0].id});

    beforeEach(() => {
      return db
        .into('users')
        .insert(testUsers)
    });

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
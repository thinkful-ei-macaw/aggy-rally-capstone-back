const knex = require('knex');
const app = require('../src/app');

const { TEST_DATABASE_URL } = require('../src/config');
const { makeUsersArray, randomUser, makeUsersRes } = require('./users.fixtures');
const usersRouter = require('../src/routers/users-router');

// set up variables used throughout these tests
const table_name = 'users';
const endpoint = '/users';

describe('Users endpoints', () => {
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

  describe('POST /', () => {
    const testUsers = makeUsersArray();
    beforeEach('insert users', () => (db, testUsers));
    const required = ['user_name', 'password'];

    required.forEach((field) => {
        it(`Responds with 404 required error when '${field}' is missing`, () => {

            return supertest(app)
                .post('/')
                .send()
                .expect(404);
        });
    });
    it(`Responds 200 and JWT auth Token and user ID when valid`, done => {
        done();
        const userValid = {
            user_name: testUsers.user_name,
            password: testUsers.password,
        };
        const expectedToken = jwt.sign(
            { id: testUsers.id },
            process.env.JWT_SECRET,
            {
                subject: testUsers.user_name,
                algorithm: 'HS256',
            }
        );
        const expectedID = testUsers.id;

        return supertest(app)
          .post('/')
          .send(userValid)
          .expect(200, {
            authToken: expectedToken,
            id: expectedID,
          });
    });
});

  // GET requests (READ)
  context(`Given there are items in the '${table_name}' table`, () => {
    const testUsers = makeUsersArray();
    const testUsersRes = makeUsersRes();

    beforeEach(() => {
      return db
        .into(table_name)
        .insert(testUsers);
    });

    it(`GET '${endpoint}' responds with 200 with an array of items`, () => {
      return supertest(app)
        .get(endpoint)
        .expect(200, testUsersRes);
    });

    it(`GET ${endpoint}/:id responds with 200 with the requested item`, () => {
      const expected = randomUser();
      const { id } = expected;
      return supertest(app)
        .get(endpoint + '/' + id)
        .expect(200, expected);
    });
  });

  context(`Given no items in the '${table_name}' table`, () => {
    it(`GET ${endpoint} responds with 200 with an empty array`, () => {
      return supertest(app)
        .get(endpoint)
        .expect(200, []);
    });

    it(`GET ${endpoint}/:id responds with 404`, () => {
      const id = 2;
      return supertest(app)
        .get(endpoint + '/' + id)
        .expect(404);
    });
  });
});
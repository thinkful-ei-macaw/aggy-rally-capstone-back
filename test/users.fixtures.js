function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'John Doe',
      password: '$2a$10$Spfx9c1ArG4SW1YIYAJRl.BED9K1evwcmV3BDSGs6zNtpxs9aFcf2'
    },
    {
      id: 2,
      user_name: 'Jane Doe',
      password: '$2a$10$Spfx9c1ArG4SW1YIYAJRl.BED9K1evwcmV3BDSGs6zNtpxs9aFcf2'
    },
    {
      id: 3,
      user_name: 'James Doe',
      password: '$2a$10$Spfx9c1ArG4SW1YIYAJRl.BED9K1evwcmV3BDSGs6zNtpxs9aFcf2'
    },
    {
      id: 4,
      user_name: 'Jemma Doe',
      password: '$2a$10$Spfx9c1ArG4SW1YIYAJRl.BED9K1evwcmV3BDSGs6zNtpxs9aFcf2'
    },
    {
      id: 5,
      user_name: 'Jillian Doe',
      password: '$2a$10$Spfx9c1ArG4SW1YIYAJRl.BED9K1evwcmV3BDSGs6zNtpxs9aFcf2'
    },
    {
      id: 6,
      user_name: 'Jack Doe',
      password: '$2a$10$Spfx9c1ArG4SW1YIYAJRl.BED9K1evwcmV3BDSGs6zNtpxs9aFcf2'
    }
  ];
}

function makeUsersRes() {
  const testUsersRes = makeUsersArray()
  testUsersRes.forEach(user => delete user.password)
  return testUsersRes
}

function randomUser() {
  const index = Math.floor(Math.random() * makeUsersRes().length);
  return makeUsersRes()[index];
}

module.exports = {
  makeUsersArray,
  randomUser,
  makeUsersRes
};
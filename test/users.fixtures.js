/**
 * returns a list of employees for testing
 */
function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'Ariana Grande',
      password: 'God'
    },
    {
      id: 2,
      user_name: 'Nicki Minaj',
      password: 'The Generous Queen'
    },
    {
      id: 3,
      user_name: 'Jessie J',
      password: 'Bang Specialist'
    }
  ];
}

/**
 * returns a random item from the employees array
 */
function randomUser() {
  const index = Math.floor(Math.random() * makeUsersArray().length);
  return makeUsersArray()[index];
}

module.exports = {
  makeUsersArray,
  randomUser
};
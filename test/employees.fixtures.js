/**
 * returns a list of employees for testing
 */
function makeEmployeesArray() {
  return [
    {
      id: 1,
      emp_name: 'Ariana Grande',
      job_title: 'God'
    },
    {
      id: 2,
      emp_name: 'Nicki Minaj',
      job_title: 'The Generous Queen'
    },
    {
      id: 3,
      emp_name: 'Jessie J',
      job_title: 'Bang Specialist'
    }
  ];
}

/**
 * returns a random item from the employees array
 */
function randomEmployee() {
  const index = Math.floor(Math.random() * makeEmployeesArray().length);
  return makeEmployeesArray()[index];
}

module.exports = {
  makeEmployeesArray,
  randomEmployee
};
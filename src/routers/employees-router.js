const express = require('express');
const xss = require('xss');

/**
 * Router to handle all requests to /employees
 */
const employeesRouter = express.Router();
employeesRouter.use(express.json());

const Service = require('../services/service');
const EmployeesService = new Service('employees');

/**
 * Removes any possible XSS attack content
 * @param {{}} employee the object to remove XSS data from
 */
const sanitize = employee => {
  return {
    id: employee.id,
    emp_name: xss(employee.emp_name),
    job_title: xss(employee.job_title)
  };
};

// respond with all records on the base route
employeesRouter.get('/', (req, res, next) => {
  const db = req.app.get('db');

  EmployeesService.getAllItems(db)
    .then(employees => {
      return res
        .status(200)
        .json(employees.map(sanitize));
    })
    .catch(next);

});

// respond with matching record when ID is provided
// otherwise, respond with 404
employeesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get('db');

  EmployeesService.getItemById(db, id)
    .then(employee => {
      if (employee) {
        return res
          .status(200)
          .json(sanitize(employee));
          
      } else {
        return res
          .status(404)
          .json({
            error: { message: 'Employee not found' }
          });
      }
      
    })
    .catch(next);
});

module.exports = employeesRouter;
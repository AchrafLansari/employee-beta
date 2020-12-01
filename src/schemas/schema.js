const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    employees(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): EmployeeConnection!
    employee(id: ID!): Employee
  }

  type Mutation {
    # if false, signup failed -- check errors
    createEmployee(employeeId: ID!): EmployeeUpdateResponse!

    # if false, cancellation failed -- check errors
    removeEmployee(employeeId: ID!): EmployeeUpdateResponse!

    login(email: String): String
  }

  type EmployeeUpdateResponse {
    success: Boolean!
    message: String
    employees: [Employee]
  }

  """
  Simple wrapper around our list of employees that contains a cursor to the
  last item in the list. Pass this cursor to the employees query to fetch results
  after these.
  """
  type EmployeeConnection {
    cursor: String!
    hasMore: Boolean!
    employees: [Employee]!
  }

  type Employee {
    id: ID!
    fullName: String!
    email: String!
    mobile: String!
    gender: String!
    department: String!
    entryDate: Date!
  }
`;

module.exports = typeDefs;

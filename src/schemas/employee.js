const { composeMongoose } = require('graphql-compose-mongoose')
const { schemaComposer } = require('graphql-compose')

const Employee = require('./../models/employee')


// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const EmployeeTC = composeMongoose(Employee, customizationOptions);

// STEP 3: Add needed CRUD Employee operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  employeeById: EmployeeTC.mongooseResolvers.findById(),
  employeeByIds: EmployeeTC.mongooseResolvers.findByIds(),
  employeeOne: EmployeeTC.mongooseResolvers.findOne(),
  employeeMany: EmployeeTC.mongooseResolvers.findMany(),
  employeeDataLoader: EmployeeTC.mongooseResolvers.dataLoader(),
  employeeDataLoaderMany: EmployeeTC.mongooseResolvers.dataLoaderMany(),
  employeeCount: EmployeeTC.mongooseResolvers.count(),
  employeeConnection: EmployeeTC.mongooseResolvers.connection(),
  employeePagination: EmployeeTC.mongooseResolvers.pagination(),
});

schemaComposer.Mutation.addFields({
  employeeCreateOne: EmployeeTC.mongooseResolvers.createOne(),
  employeeCreateMany: EmployeeTC.mongooseResolvers.createMany(),
  employeeUpdateById: EmployeeTC.mongooseResolvers.updateById(),
  employeeUpdateOne: EmployeeTC.mongooseResolvers.updateOne(),
  employeeUpdateMany: EmployeeTC.mongooseResolvers.updateMany(),
  employeeRemoveById: EmployeeTC.mongooseResolvers.removeById(),
  employeeRemoveOne: EmployeeTC.mongooseResolvers.removeOne(),
  employeeRemoveMany: EmployeeTC.mongooseResolvers.removeMany(),
});

module.exports = schemaComposer.buildSchema();

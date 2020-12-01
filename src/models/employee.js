const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    tolowercase: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other',
    required: true,
  },
  department: {
    type: String,
    enum: ['Development', 'Marketing', 'Accounting', 'Human Ressources'],
    required: true,
  },
  hireDate: {
    type: Date,
    required: true,
  },
  isPermanent: {
    type: Boolean,
    required: true,
    default: false
  }
})

const Employee = mongoose.model("Employee", EmployeeSchema)

module.exports = Employee;

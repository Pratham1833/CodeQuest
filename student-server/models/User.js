// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const studentSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: (email) => email.endsWith('@pccoepune.org'),
//       message: 'Email must end with @pccoepune.org',
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   rollNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });

// const Student = mongoose.model('Student', studentSchema, 'Student');

// module.exports = Student;



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => email.endsWith('@pccoepune.org'),
      message: 'Email must end with @pccoepune.org',
    },
  },
  password: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: { 
    type: String,
    default: "",
  },
  profilePic: { 
    type: String,
    default: "",
  },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema, 'Student');

module.exports = Student;

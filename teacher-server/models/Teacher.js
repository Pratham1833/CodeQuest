const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Specify collection name explicitly as 'teacher_new'
const Teacher = mongoose.model('Teacher', teacherSchema, 'teacherNew');

module.exports = Teacher;

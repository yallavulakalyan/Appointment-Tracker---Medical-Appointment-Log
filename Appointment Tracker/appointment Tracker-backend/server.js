const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('./users');
const appointments = require('./appointments');

const app = express();
app.use(bodyParser.json());

// Register route
app.post('/register', users.register);

// Login route
app.post('/login', users.login);

// Appointment routes (create, view, delete, update)
app.get('/appointments', appointments.getAppointments);
app.post('/appointments', appointments.createAppointment);
app.put('/appointments/:id', appointments.updateAppointment);
app.delete('/appointments/:id', appointments.deleteAppointment);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

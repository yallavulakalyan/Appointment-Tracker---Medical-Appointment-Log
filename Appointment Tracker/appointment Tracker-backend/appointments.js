let appointments = [];  // In-memory appointment store (for simplicity)

const getAppointments = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Not authorized' });
    res.json(appointments);
  });
};

const createAppointment = (req, res) => {
  const { provider, dateTime, reason } = req.body;
  const newAppointment = { provider, dateTime, reason };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
};

const updateAppointment = (req, res) => {
  const { id } = req.params;
  const { provider, dateTime, reason } = req.body;
  const appointment = appointments[id];
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  appointment.provider = provider;
  appointment.dateTime = dateTime;
  appointment.reason = reason;
  res.json(appointment);
};

const deleteAppointment = (req, res) => {
  const { id } = req.params;
  appointments = appointments.filter((_, index) => index != id);
  res.status(204).end();
};

module.exports = { getAppointments, createAppointment, updateAppointment, deleteAppointment };

const API_URL = "http://localhost:5000";

// Handle user registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
      alert('Registration successful');
      localStorage.setItem('token', result.token);
      window.location.href = 'appointments.html';
    } else {
      alert('Registration failed');
    }
  });
}

// Handle user login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.token);
      window.location.href = 'appointments.html';
    } else {
      alert('Login failed');
    }
  });
}

// Fetch and display appointments for the logged-in user
if (document.getElementById('appointmentsList')) {
  window.onload = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html'; // Redirect to login if no token is found
      return;
    }

    const response = await fetch(`${API_URL}/appointments`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });

    const appointments = await response.json();
    const appointmentsListDiv = document.getElementById('appointmentsList');
    
    if (appointments.length > 0) {
      appointmentsListDiv.innerHTML = appointments.map((appointment, index) => {
        return `
          <div class="appointment-card">
            <p><strong>Provider:</strong> ${appointment.provider}</p>
            <p><strong>Date & Time:</strong> ${new Date(appointment.dateTime).toLocaleString()}</p>
            <p><strong>Reason:</strong> ${appointment.reason}</p>
            <button onclick="editAppointment(${index})">Edit</button>
            <button onclick="deleteAppointment(${index})">Delete</button>
          </div>
        `;
      }).join('');
    } else {
      appointmentsListDiv.innerHTML = '<p>No appointments found.</p>';
    }
  };
}

// Handle appointment creation
const createAppointmentForm = document.getElementById('createAppointmentForm');
if (createAppointmentForm) {
  createAppointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const provider = document.getElementById('provider').value;
    const dateTime = document.getElementById('dateTime').value;
    const reason = document.getElementById('reason').value;
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ provider, dateTime, reason })
    });

    if (response.ok) {
      alert('Appointment created successfully');
      window.location.href = 'appointments.html';
    } else {
      alert('Failed to create appointment');
    }
  });
}

// Delete appointment
async function deleteAppointment(index) {
  const token = localStorage.getItem("token");
  if (!token) return alert('Please log in to delete an appointment');
  
  const appointmentId = index; // Use actual ID
  const response = await fetch(`${API_URL}/appointments/${appointmentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });

  if (response.ok) {
    alert('Appointment deleted successfully');
    window.location.reload();
  } else {
    alert('Failed to delete appointment');
  }
}

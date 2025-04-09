// Base API URL
const API_BASE_URL = "http://localhost:5000/api";

// DOM Elements
const welcomeMessage = document.getElementById("welcomeMessage");
const appointmentsTableBody = document.getElementById("appointmentsTableBody");
const noAppointments = document.getElementById("noAppointments");
const statusFilter = document.getElementById("statusFilter");
const refreshAppointments = document.getElementById("refreshAppointments");
const patientRegistrationForm = document.getElementById(
  "patientRegistrationForm"
);
const doctorsTableBody = document.getElementById("doctorsTableBody");
const noDoctors = document.getElementById("noDoctors");
const addDoctorBtn = document.getElementById("addDoctorBtn");
const addDoctorModal = document.getElementById("addDoctorModal");
const closeModal = document.querySelector(".close-modal");
const addDoctorForm = document.getElementById("addDoctorForm");

// Current user data
let currentUser = {
  id: null,
  name: "Receptionist",
  email: null,
};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  // In a real app, you would get user data from authentication
  // For now, we'll use a mock user
  currentUser = {
    id: "rec123",
    name: "Sarah Johnson",
    email: "sarah@medelite.com",
  };

  welcomeMessage.textContent = `Welcome, ${currentUser.name}`;

  // Load initial data
  loadAppointments();
  loadDoctors();

  // Setup navigation
  setupNavigation();

  // Setup event listeners
  statusFilter.addEventListener("change", loadAppointments);
  refreshAppointments.addEventListener("click", loadAppointments);

  // Patient registration form
  patientRegistrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    registerPatient();
  });

  // Doctor management
  addDoctorBtn.addEventListener("click", function () {
    addDoctorModal.style.display = "block";
  });

  closeModal.addEventListener("click", function () {
    addDoctorModal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === addDoctorModal) {
      addDoctorModal.style.display = "none";
    }
  });

  addDoctorForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addDoctor();
  });

  // Logout button
  document.querySelector(".logout-btn").addEventListener("click", function () {
    // In a real app, you would clear the session/token
    alert("Logged out successfully");
    window.location.href = "login.html";
  });
});

// Setup navigation between sections
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll(".card");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active link
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding section
      const targetId = this.getAttribute("href");
      sections.forEach((section) => {
        if (section.id === targetId.substring(1)) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
}

// Load appointments
async function loadAppointments() {
  try {
    // In a real app, you would fetch from API with the status filter
    // const response = await fetch(`${API_BASE_URL}/appointments?status=${statusFilter.value}`);
    // const appointments = await response.json();

    // Mock data for demonstration
    const mockAppointments = [
      {
        id: "app1",
        patient: { name: "John Doe" },
        doctor: { name: "Dr. Smith" },
        time: "10:00 AM",
        reason: "Annual Checkup",
        status: "confirmed",
      },
      {
        id: "app2",
        patient: { name: "Jane Smith" },
        doctor: { name: "Dr. Johnson" },
        time: "11:30 AM",
        reason: "Back Pain",
        status: "checked-in",
      },
      {
        id: "app3",
        patient: { name: "Robert Brown" },
        doctor: { name: "Dr. Lee" },
        time: "2:15 PM",
        reason: "Flu Symptoms",
        status: "completed",
      },
    ];

    // Filter appointments based on status filter
    let filteredAppointments = mockAppointments;
    if (statusFilter.value !== "all") {
      filteredAppointments = mockAppointments.filter(
        (app) => app.status === statusFilter.value
      );
    }

    // Clear table
    appointmentsTableBody.innerHTML = "";

    if (filteredAppointments.length > 0) {
      noAppointments.style.display = "none";

      // Populate table
      filteredAppointments.forEach((app) => {
        const row = document.createElement("tr");

        // Patient
        const patientCell = document.createElement("td");
        patientCell.textContent = app.patient.name;

        // Doctor
        const doctorCell = document.createElement("td");
        doctorCell.textContent = app.doctor.name;

        // Time
        const timeCell = document.createElement("td");
        timeCell.textContent = app.time;

        // Reason
        const reasonCell = document.createElement("td");
        reasonCell.textContent = app.reason;

        // Status
        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");
        statusBadge.className = `status-badge status-${app.status}`;
        statusBadge.textContent = app.status.replace("-", " ");
        statusCell.appendChild(statusBadge);

        // Actions
        const actionsCell = document.createElement("td");

        if (app.status === "confirmed") {
          const checkinBtn = document.createElement("button");
          checkinBtn.className = "action-btn checkin-btn";
          checkinBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Check In';
          checkinBtn.addEventListener("click", () => checkInPatient(app.id));
          actionsCell.appendChild(checkinBtn);
        } else if (app.status === "checked-in") {
          const checkoutBtn = document.createElement("button");
          checkoutBtn.className = "action-btn checkout-btn";
          checkoutBtn.innerHTML =
            '<i class="fas fa-sign-out-alt"></i> Check Out';
          checkoutBtn.addEventListener("click", () => checkOutPatient(app.id));
          actionsCell.appendChild(checkoutBtn);
        }

        const viewBtn = document.createElement("button");
        viewBtn.className = "action-btn view-btn";
        viewBtn.innerHTML = '<i class="fas fa-eye"></i> View';
        viewBtn.addEventListener("click", () => viewAppointment(app.id));
        actionsCell.appendChild(viewBtn);

        // Append all cells to row
        row.appendChild(patientCell);
        row.appendChild(doctorCell);
        row.appendChild(timeCell);
        row.appendChild(reasonCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        // Add row to table
        appointmentsTableBody.appendChild(row);
      });
    } else {
      noAppointments.style.display = "block";
    }
  } catch (error) {
    console.error("Error loading appointments:", error);
    alert("Failed to load appointments. Please try again.");
  }
}

// Check in patient
function checkInPatient(appointmentId) {
  // In a real app, you would make an API call
  console.log(`Checking in appointment ${appointmentId}`);
  alert(`Appointment ${appointmentId} checked in successfully`);
  loadAppointments(); // Refresh the list
}

// Check out patient
function checkOutPatient(appointmentId) {
  // In a real app, you would make an API call
  console.log(`Checking out appointment ${appointmentId}`);
  alert(`Appointment ${appointmentId} checked out successfully`);
  loadAppointments(); // Refresh the list
}

// View appointment details
function viewAppointment(appointmentId) {
  // In a real app, you would show more details
  console.log(`Viewing appointment ${appointmentId}`);
  alert(`Viewing details for appointment ${appointmentId}`);
}

// Register new patient
async function registerPatient() {
  const patientData = {
    name: document.getElementById("patientName").value,
    email: document.getElementById("patientEmail").value,
    phone: document.getElementById("patientPhone").value,
    dob: document.getElementById("patientDob").value,
    gender: document.getElementById("patientGender").value,
    bloodGroup: document.getElementById("patientBloodGroup").value,
    address: document.getElementById("patientAddress").value,
  };

  try {
    // In a real app, you would make an API call
    // const response = await fetch(`${API_BASE_URL}/patients`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(patientData)
    // });

    console.log("Registering patient:", patientData);
    alert("Patient registered successfully!");
    patientRegistrationForm.reset();
  } catch (error) {
    console.error("Error registering patient:", error);
    alert("Failed to register patient. Please try again.");
  }
}

// Load doctors
async function loadDoctors() {
  try {
    // In a real app, you would fetch from API
    // const response = await fetch(`${API_BASE_URL}/doctors`);
    // const doctors = await response.json();

    // Mock data for demonstration
    const mockDoctors = [
      {
        id: "doc1",
        name: "Dr. Smith",
        specialization: "Cardiology",
        email: "smith@medelite.com",
        status: "Active",
      },
      {
        id: "doc2",
        name: "Dr. Johnson",
        specialization: "Pediatrics",
        email: "johnson@medelite.com",
        status: "Active",
      },
      {
        id: "doc3",
        name: "Dr. Lee",
        specialization: "Neurology",
        email: "lee@medelite.com",
        status: "On Leave",
      },
    ];

    // Clear table
    doctorsTableBody.innerHTML = "";

    if (mockDoctors.length > 0) {
      noDoctors.style.display = "none";

      // Populate table
      mockDoctors.forEach((doc) => {
        const row = document.createElement("tr");

        // Name
        const nameCell = document.createElement("td");
        nameCell.textContent = doc.name;

        // Specialization
        const specCell = document.createElement("td");
        specCell.textContent = doc.specialization;

        // Email
        const emailCell = document.createElement("td");
        emailCell.textContent = doc.email;

        // Status
        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");
        statusBadge.className =
          doc.status === "Active"
            ? "status-badge status-confirmed"
            : "status-badge status-completed";
        statusBadge.textContent = doc.status;
        statusCell.appendChild(statusBadge);

        // Actions
        const actionsCell = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.className = "action-btn view-btn";
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editBtn.addEventListener("click", () => editDoctor(doc.id));
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "action-btn checkout-btn";
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
        deleteBtn.addEventListener("click", () => deleteDoctor(doc.id));
        actionsCell.appendChild(deleteBtn);

        // Append all cells to row
        row.appendChild(nameCell);
        row.appendChild(specCell);
        row.appendChild(emailCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        // Add row to table
        doctorsTableBody.appendChild(row);
      });
    } else {
      noDoctors.style.display = "block";
    }
  } catch (error) {
    console.error("Error loading doctors:", error);
    alert("Failed to load doctors. Please try again.");
  }
}

// Add new doctor
async function addDoctor() {
  const doctorData = {
    name: document.getElementById("doctorName").value,
    email: document.getElementById("doctorEmail").value,
    specialization: document.getElementById("doctorSpecialization").value,
    phone: document.getElementById("doctorPhone").value,
    password: document.getElementById("doctorPassword").value,
  };

  try {
    // In a real app, you would make an API call
    // const response = await fetch(`${API_BASE_URL}/doctors`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(doctorData)
    // });

    console.log("Adding doctor:", doctorData);
    alert("Doctor added successfully!");
    addDoctorForm.reset();
    addDoctorModal.style.display = "none";
    loadDoctors(); // Refresh the list
  } catch (error) {
    console.error("Error adding doctor:", error);
    alert("Failed to add doctor. Please try again.");
  }
}

// Edit doctor
function editDoctor(doctorId) {
  console.log(`Editing doctor ${doctorId}`);
  alert(`Edit functionality for doctor ${doctorId} would open a form`);
}

// Delete doctor
function deleteDoctor(doctorId) {
  if (confirm("Are you sure you want to delete this doctor?")) {
    // In a real app, you would make an API call
    console.log(`Deleting doctor ${doctorId}`);
    alert(`Doctor ${doctorId} deleted successfully`);
    loadDoctors(); // Refresh the list
  }
}

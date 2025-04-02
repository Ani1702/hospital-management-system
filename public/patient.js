// // Mock data - In a real app, this would come from API calls
// const medicalFields = [
//   {
//     id: "general",
//     name: "General Practitioner",
//     doctors: [
//       {
//         id: "gp1",
//         name: "Dr. Sarah Miller",
//         qualification: "MD, Family Medicine",
//         experience: "12 years",
//       },
//       {
//         id: "gp2",
//         name: "Dr. James Wilson",
//         qualification: "MD, General Practice",
//         experience: "8 years",
//       },
//     ],
//   },
//   {
//     id: "cardiology",
//     name: "Cardiology",
//     doctors: [
//       {
//         id: "card1",
//         name: "Dr. Smith Johnson",
//         qualification: "MD, Cardiology",
//         experience: "15 years",
//       },
//       {
//         id: "card2",
//         name: "Dr. Lisa Wong",
//         qualification: "PhD, Cardiovascular",
//         experience: "10 years",
//       },
//     ],
//   },
//   {
//     id: "neurology",
//     name: "Neurology",
//     doctors: [
//       {
//         id: "neuro1",
//         name: "Dr. Emily Chen",
//         qualification: "MD, Neurology",
//         experience: "10 years",
//       },
//       {
//         id: "neuro2",
//         name: "Dr. Robert Kim",
//         qualification: "PhD, Neuroscience",
//         experience: "7 years",
//       },
//     ],
//   },
//   {
//     id: "orthopedics",
//     name: "Orthopedics",
//     doctors: [
//       {
//         id: "ortho1",
//         name: "Dr. Michael Rodriguez",
//         qualification: "MD, Orthopedics",
//         experience: "8 years",
//       },
//       {
//         id: "ortho2",
//         name: "Dr. Priya Patel",
//         qualification: "MD, Sports Medicine",
//         experience: "6 years",
//       },
//     ],
//   },
// ];

// // Available time slots (10AM to 5PM in 30-minute increments)
// const allTimeSlots = [
//   "10:00",
//   "10:30",
//   "11:00",
//   "11:30",
//   "12:00",
//   "12:30",
//   "13:00",
//   "13:30",
//   "14:00",
//   "14:30",
//   "15:00",
//   "15:30",
//   "16:00",
//   "16:30",
//   "17:00",
// ];

// // Mock function to fetch booked slots for a doctor on a specific date
// async function fetchBookedSlots(doctorId, date) {
//   // In a real app, this would be an API call
//   console.log(`Fetching booked slots for doctor ${doctorId} on ${date}`);

//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 300));

//   // Return some random booked slots for demonstration
//   const randomBookedSlots = [];
//   const totalSlots = allTimeSlots.length;
//   const bookedCount = Math.floor(Math.random() * 4); // 0-3 booked slots

//   for (let i = 0; i < bookedCount; i++) {
//     const randomIndex = Math.floor(Math.random() * totalSlots);
//     randomBookedSlots.push(allTimeSlots[randomIndex]);
//   }

//   return randomBookedSlots;
// }

// // Initialize the application when DOM is loaded
// document.addEventListener("DOMContentLoaded", function () {
//   // Initialize form elements
//   const medicalFieldSelect = document.getElementById("medicalField");
//   const doctorSelection = document.getElementById("doctorSelection");
//   const doctorOptionsContainer = document.getElementById(
//     "doctorOptionsContainer"
//   );
//   const appointmentDate = document.getElementById("appointmentDate");
//   const timeSlotGroup = document.getElementById("timeSlotGroup");
//   const appointmentTime = document.getElementById("appointmentTime");
//   const submitButton = document.getElementById("submitAppointment");

//   // Set minimum date (today) and maximum date (7 days from today)
//   const today = new Date();
//   const maxDate = new Date();
//   maxDate.setDate(today.getDate() + 7);

//   appointmentDate.min = formatDateForInput(today);
//   appointmentDate.max = formatDateForInput(maxDate);

//   // Populate medical fields dropdown
//   medicalFields.forEach((field) => {
//     const option = document.createElement("option");
//     option.value = field.id;
//     option.textContent = field.name;
//     medicalFieldSelect.appendChild(option);
//   });

//   // Handle medical field selection change
//   medicalFieldSelect.addEventListener("change", async function () {
//     const selectedFieldId = this.value;

//     if (selectedFieldId) {
//       // Find the selected medical field
//       const selectedField = medicalFields.find(
//         (field) => field.id === selectedFieldId
//       );

//       // Clear previous doctor options
//       doctorOptionsContainer.innerHTML = "";

//       // Add new doctor options
//       selectedField.doctors.forEach((doctor) => {
//         const doctorOption = document.createElement("div");
//         doctorOption.className = "doctor-option";

//         const radioInput = document.createElement("input");
//         radioInput.type = "radio";
//         radioInput.name = "doctor";
//         radioInput.id = doctor.id;
//         radioInput.value = doctor.id;

//         const label = document.createElement("label");
//         label.htmlFor = doctor.id;
//         label.className = "doctor-info";

//         const nameDiv = document.createElement("div");
//         nameDiv.className = "doctor-name";
//         nameDiv.textContent = doctor.name;

//         const detailsDiv = document.createElement("div");
//         detailsDiv.className = "doctor-specialty";
//         detailsDiv.textContent = `${doctor.qualification}, ${doctor.experience} experience`;

//         label.appendChild(nameDiv);
//         label.appendChild(detailsDiv);

//         doctorOption.appendChild(radioInput);
//         doctorOption.appendChild(label);

//         doctorOptionsContainer.appendChild(doctorOption);
//       });

//       // Show doctor selection
//       doctorSelection.style.display = "block";
//     } else {
//       doctorSelection.style.display = "none";
//       timeSlotGroup.style.display = "none";
//     }
//   });

//   // Handle doctor selection change
//   doctorOptionsContainer.addEventListener("change", function (e) {
//     if (e.target.name === "doctor") {
//       // Enable date selection
//       appointmentDate.disabled = false;
//     }
//   });

//   // Handle date selection change
//   appointmentDate.addEventListener("change", async function () {
//     if (!this.value) return;

//     const selectedDoctor = document.querySelector(
//       'input[name="doctor"]:checked'
//     );
//     if (!selectedDoctor) {
//       alert("Please select a doctor first");
//       this.value = "";
//       return;
//     }

//     // Fetch available time slots for selected doctor and date
//     const bookedSlots = await fetchBookedSlots(
//       selectedDoctor.value,
//       this.value
//     );
//     const availableSlots = allTimeSlots.filter(
//       (slot) => !bookedSlots.includes(slot)
//     );

//     // Clear previous time slots
//     appointmentTime.innerHTML = '<option value="">Select a time slot</option>';

//     // Add available time slots
//     availableSlots.forEach((slot) => {
//       const option = document.createElement("option");
//       option.value = slot;
//       option.textContent = slot;
//       appointmentTime.appendChild(option);
//     });

//     // Show time slot selection
//     timeSlotGroup.style.display = "block";
//   });

//   // Handle form submission
//   submitButton.addEventListener("click", handleFormSubmit);

//   // Initialize billing section
//   initializeBillingSection();

//   // Initialize logout button
//   document.querySelector(".logout-btn").addEventListener("click", function () {
//     alert("Logged out successfully!");
//     // In a real app, you would redirect to login page
//   });

//   // Initialize upload button
//   document.querySelector(".upload-btn").addEventListener("click", function () {
//     const fileInput = document.getElementById("reportFile");
//     if (fileInput.files.length > 0) {
//       alert("File uploaded successfully!");
//       fileInput.value = "";
//     } else {
//       alert("Please select a file to upload.");
//     }
//   });
// });

// // Helper function to format date as YYYY-MM-DD for input element
// function formatDateForInput(date) {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }

// // Handle form submission
// async function handleFormSubmit() {
//   // Get form elements
//   const medicalField = document.getElementById("medicalField");
//   const doctor = document.querySelector('input[name="doctor"]:checked');
//   const appointmentDate = document.getElementById("appointmentDate");
//   const appointmentTime = document.getElementById("appointmentTime");
//   const fullName = document.getElementById("fullName");
//   const email = document.getElementById("email");
//   const phone = document.getElementById("phone");
//   const address = document.getElementById("address");
//   const reason = document.getElementById("reason");

//   // Validate form
//   if (
//     !validateForm(
//       medicalField,
//       doctor,
//       appointmentDate,
//       appointmentTime,
//       fullName,
//       email,
//       phone,
//       address,
//       reason
//     )
//   ) {
//     return false;
//   }

//   // Prepare data to send to the server
//   const formData = {
//     medicalField: medicalField.value,
//     medicalFieldName: medicalField.options[medicalField.selectedIndex].text,
//     doctorId: doctor.value,
//     doctorName: document.querySelector(`label[for="${doctor.id}"] .doctor-name`)
//       .textContent,
//     appointmentDate: appointmentDate.value,
//     appointmentTime: appointmentTime.value,
//     fullName: fullName.value,
//     email: email.value,
//     phone: phone.value,
//     address: address.value,
//     reason: reason.value,
//   };

//   // Send data to the backend server
//   await sendFormDataToServer(formData);
// }

// // Validate form fields
// function validateForm(
//   medicalField,
//   doctor,
//   appointmentDate,
//   appointmentTime,
//   fullName,
//   email,
//   phone,
//   address,
//   reason
// ) {
//   // Validate medical field
//   if (!medicalField.value) {
//     alert("Please select a medical field");
//     medicalField.focus();
//     return false;
//   }

//   // Validate doctor selection
//   if (!doctor) {
//     alert("Please select a doctor");
//     return false;
//   }

//   // Validate appointment date
//   if (!appointmentDate.value) {
//     alert("Please select an appointment date");
//     appointmentDate.focus();
//     return false;
//   }

//   // Validate appointment time
//   if (!appointmentTime.value) {
//     alert("Please select an appointment time");
//     appointmentTime.focus();
//     return false;
//   }

//   // Validate full name
//   if (!fullName.value || !/^[A-Za-z ]+$/.test(fullName.value)) {
//     alert("Please enter a valid name (letters and spaces only)");
//     fullName.focus();
//     return false;
//   }

//   // Validate email
//   if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
//     alert("Please enter a valid email address");
//     email.focus();
//     return false;
//   }

//   // Validate phone
//   if (!phone.value || !/^[0-9]{10}$/.test(phone.value)) {
//     alert("Please enter a valid 10-digit phone number");
//     phone.focus();
//     return false;
//   }

//   // Validate address
//   if (!address.value) {
//     alert("Please enter your address");
//     address.focus();
//     return false;
//   }

//   // Validate reason
//   if (!reason.value) {
//     alert("Please describe the reason for your appointment");
//     reason.focus();
//     return false;
//   }

//   return true;
// }

// // Simulate sending data to server
// async function sendFormDataToServer(formData) {
//   console.log("Sending form data to server:", formData);

//   // Simulate API call delay
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   // In a real app, you would use fetch:
//   /*
//   try {
//     const response = await fetch('https://your-api-endpoint.com/appointments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData)
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     console.log('Success:', data);
//     alert("Appointment booked successfully!");
//     resetForm();
//   } catch (error) {
//     console.error('Error:', error);
//     alert("There was an error booking your appointment. Please try again.");
//   }
//   */

//   // For demo purposes:
//   alert(
//     `Appointment booked successfully with ${formData.doctorName} on ${formData.appointmentDate} at ${formData.appointmentTime}`
//   );
//   resetForm();
// }

// // Reset form after submission
// function resetForm() {
//   document.getElementById("appointmentForm").reset();
//   document.getElementById("doctorSelection").style.display = "none";
//   document.getElementById("timeSlotGroup").style.display = "none";
//   document.getElementById("appointmentDate").disabled = true;
// }

// // Initialize billing section with mock data
// function initializeBillingSection() {
//   const billingData = [
//     {
//       date: "Feb 15, 2025",
//       amount: "$50.00",
//       status: "paid",
//       medicines: ["Medicine A - $20.00", "Medicine B - $15.00"],
//       tests: ["Blood Test - $10.00"],
//       other: ["Consultation Fee - $5.00"],
//     },
//     {
//       date: "Jan 10, 2025",
//       amount: "$30.00",
//       status: "pending",
//       medicines: ["Medicine C - $15.00"],
//       tests: [],
//       other: ["Consultation Fee - $15.00"],
//     },
//     {
//       date: "Dec 5, 2024",
//       amount: "$40.00",
//       status: "paid",
//       medicines: ["Medicine D - $25.00"],
//       tests: ["Urine Test - $10.00"],
//       other: ["Service Fee - $5.00"],
//     },
//   ];

//   const billingTableBody = document.getElementById("billingTableBody");
//   const billDetails = document.getElementById("billDetails");

//   // Populate billing table
//   billingData.forEach((bill) => {
//     const row = document.createElement("tr");

//     const dateCell = document.createElement("td");
//     dateCell.textContent = bill.date;

//     const amountCell = document.createElement("td");
//     amountCell.textContent = bill.amount;

//     const statusCell = document.createElement("td");
//     statusCell.textContent =
//       bill.status.charAt(0).toUpperCase() + bill.status.slice(1);
//     statusCell.className = bill.status;

//     const actionCell = document.createElement("td");
//     actionCell.className = "action-cell";

//     const viewButton = document.createElement("button");
//     viewButton.className = "viewBillBtn";
//     viewButton.textContent = "View Bill";
//     viewButton.addEventListener("click", () => showBillDetails(bill));

//     actionCell.appendChild(viewButton);

//     row.appendChild(dateCell);
//     row.appendChild(amountCell);
//     row.appendChild(statusCell);
//     row.appendChild(actionCell);

//     billingTableBody.appendChild(row);
//   });
// }

// // Show bill details
// function showBillDetails(bill) {
//   const billDetails = document.getElementById("billDetails");

//   billDetails.innerHTML = `
//     <h3>Invoice Details - ${bill.date}</h3>
//     <p class="bill-description">Billing Breakdown:</p>
//     <div class="bill-items">
//       <h4>Medicines</h4>
//       <ul id="billMedicines">
//         ${bill.medicines.map((item) => `<li>${item}</li>`).join("")}
//       </ul>
//       <h4>Tests</h4>
//       <ul id="billTests">
//         ${bill.tests.map((item) => `<li>${item}</li>`).join("")}
//       </ul>
//       <h4>Other Charges</h4>
//       <ul id="billOther">
//         ${bill.other.map((item) => `<li>${item}</li>`).join("")}
//       </ul>
//       <h4>Total Amount:</h4>
//       <p id="billTotal">${bill.amount}</p>
//     </div>
//   `;

//   billDetails.style.display = "block";
// }

// Base API URL
const API_BASE_URL = "http://localhost:5000/api";

// DOM Elements
const medicalFieldSelect = document.getElementById("medicalField");
const doctorSelection = document.getElementById("doctorSelection");
const doctorOptionsContainer = document.getElementById(
  "doctorOptionsContainer"
);
const appointmentDate = document.getElementById("appointmentDate");
const timeSlotGroup = document.getElementById("timeSlotGroup");
const appointmentTime = document.getElementById("appointmentTime");
const submitButton = document.getElementById("submitAppointment");
const appointmentsSection = document.getElementById("appointments");
const historySection = document.getElementById("history");
const billingSection = document.getElementById("billing");

// Current user data (would be set after login)
let currentUser = {
  id: null,
  name: "Patient",
  role: "patient",
};

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Try to get user data from session (simplified)
  const userData = sessionStorage.getItem("userData");
  if (userData) {
    currentUser = JSON.parse(userData);
    document.querySelector(
      ".welcome span"
    ).textContent = `Welcome, ${currentUser.name}`;
  }

  // Set minimum date (today) and maximum date (7 days from today)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  appointmentDate.min = formatDateForInput(today);
  appointmentDate.max = formatDateForInput(maxDate);

  // Populate medical fields dropdown (hardcoded for simplicity)
  const medicalFields = [
    "General Practitioner",
    "Cardiology",
    "Neurology",
    "Orthopedics",
  ];
  medicalFields.forEach((field) => {
    const option = document.createElement("option");
    option.value = field;
    option.textContent = field;
    medicalFieldSelect.appendChild(option);
  });

  // Handle medical field selection change
  medicalFieldSelect.addEventListener("change", async function () {
    const selectedField = this.value;
    doctorOptionsContainer.innerHTML = "";

    if (selectedField) {
      try {
        // Fetch doctors by specialization from our API
        const response = await fetch(
          `${API_BASE_URL}/patient/doctors/${encodeURIComponent(selectedField)}`
        );
        const doctors = await response.json();

        if (doctors.length === 0) {
          doctorOptionsContainer.innerHTML =
            "<p>No doctors available in this specialty</p>";
          return;
        }

        // Add doctor options
        doctors.forEach((doctor) => {
          const doctorOption = document.createElement("div");
          doctorOption.className = "doctor-option";

          const radioInput = document.createElement("input");
          radioInput.type = "radio";
          radioInput.name = "doctor";
          radioInput.id = doctor._id;
          radioInput.value = doctor._id;

          const label = document.createElement("label");
          label.htmlFor = doctor._id;
          label.className = "doctor-info";

          const nameDiv = document.createElement("div");
          nameDiv.className = "doctor-name";
          nameDiv.textContent = doctor.userId.name;

          const detailsDiv = document.createElement("div");
          detailsDiv.className = "doctor-specialty";
          detailsDiv.textContent = `${doctor.specialization}`;

          label.appendChild(nameDiv);
          label.appendChild(detailsDiv);

          doctorOption.appendChild(radioInput);
          doctorOption.appendChild(label);

          doctorOptionsContainer.appendChild(doctorOption);
        });

        doctorSelection.style.display = "block";
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to load doctors. Please try again.");
      }
    } else {
      doctorSelection.style.display = "none";
      timeSlotGroup.style.display = "none";
    }
  });

  // Handle doctor selection change
  doctorOptionsContainer.addEventListener("change", function (e) {
    if (e.target.name === "doctor") {
      appointmentDate.disabled = false;
    }
  });

  // Handle date selection change
  appointmentDate.addEventListener("change", async function () {
    if (!this.value) return;

    const selectedDoctor = document.querySelector(
      'input[name="doctor"]:checked'
    );
    if (!selectedDoctor) {
      alert("Please select a doctor first");
      this.value = "";
      return;
    }

    try {
      // Fetch available slots for selected doctor and date
      const response = await fetch(
        `${API_BASE_URL}/patient/slots/${selectedDoctor.value}`
      );
      const availableSlots = await response.json();

      // Clear previous time slots
      appointmentTime.innerHTML =
        '<option value="">Select a time slot</option>';

      // Add available time slots
      availableSlots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = slot.time;
        option.textContent = slot.time;
        appointmentTime.appendChild(option);
      });

      // Show time slot selection
      timeSlotGroup.style.display = "block";
    } catch (error) {
      console.error("Error fetching time slots:", error);
      alert("Failed to load available time slots. Please try again.");
    }
  });

  // Handle form submission
  submitButton.addEventListener("click", handleFormSubmit);

  // Initialize billing section
  initializeBillingSection();

  // Load patient data
  if (currentUser.id) {
    loadPatientAppointments();
    loadPatientPrescriptions();
  }

  // Initialize logout button
  document.querySelector(".logout-btn").addEventListener("click", function () {
    sessionStorage.removeItem("userData");
    window.location.href = "login.html"; // Redirect to login page
  });

  // Initialize upload button (simplified)
  document.querySelector(".upload-btn").addEventListener("click", function () {
    const fileInput = document.getElementById("reportFile");
    if (fileInput.files.length > 0) {
      alert(
        "File uploaded successfully! (This would be sent to the backend in a real app)"
      );
      fileInput.value = "";
    } else {
      alert("Please select a file to upload.");
    }
  });
});

// Load patient appointments
async function loadPatientAppointments() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/patient/appointments/${currentUser.id}`
    );
    const appointments = await response.json();

    const appointmentsInfo =
      appointmentsSection.querySelector(".appointment-info");
    if (appointments.length > 0) {
      const nextAppointment = appointments.find(
        (a) => a.status !== "completed"
      );
      if (nextAppointment) {
        const apptDate = new Date(nextAppointment.date).toLocaleDateString();
        appointmentsInfo.textContent = `Upcoming Appointment: ${apptDate} at ${nextAppointment.time} with Dr. ${nextAppointment.doctorId.userId.name}`;
      } else {
        appointmentsInfo.textContent = "No upcoming appointments";
      }
    } else {
      appointmentsInfo.textContent = "No appointments scheduled";
    }
  } catch (error) {
    console.error("Error loading appointments:", error);
  }
}

// Load patient prescriptions
async function loadPatientPrescriptions() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/patient/prescriptions/${currentUser.id}`
    );
    const prescriptions = await response.json();

    const historySection = document.getElementById("history");
    const noRecordsMsg = historySection.querySelector(".no-records");

    if (prescriptions.length > 0) {
      noRecordsMsg.style.display = "none";

      prescriptions.forEach((prescription) => {
        const prescriptionDiv = document.createElement("div");
        prescriptionDiv.className = "prescription-card";

        const date = new Date(prescription.createdAt).toLocaleDateString();
        const doctorName = prescription.doctorId.userId.name;

        prescriptionDiv.innerHTML = `
          <h3>Prescription from Dr. ${doctorName} - ${date}</h3>
          ${
            prescription.medicines.length > 0
              ? `
            <h4>Medicines:</h4>
            <ul>
              ${prescription.medicines
                .map(
                  (med) =>
                    `<li>${med.name} - ${med.dosage} for ${med.duration}</li>`
                )
                .join("")}
            </ul>
          `
              : ""
          }
          ${
            prescription.tests.length > 0
              ? `
            <h4>Tests:</h4>
            <ul>
              ${prescription.tests
                .map((test) => `<li>${test.name}</li>`)
                .join("")}
            </ul>
          `
              : ""
          }
          ${
            prescription.notes
              ? `<p><strong>Notes:</strong> ${prescription.notes}</p>`
              : ""
          }
        `;

        historySection.appendChild(prescriptionDiv);
      });
    } else {
      noRecordsMsg.style.display = "block";
    }
  } catch (error) {
    console.error("Error loading prescriptions:", error);
  }
}

// Handle form submission
async function handleFormSubmit() {
  // Get form elements
  const medicalField = document.getElementById("medicalField");
  const doctor = document.querySelector('input[name="doctor"]:checked');
  const appointmentDate = document.getElementById("appointmentDate");
  const appointmentTime = document.getElementById("appointmentTime");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const reason = document.getElementById("reason");

  // Validate form
  if (
    !validateForm(
      medicalField,
      doctor,
      appointmentDate,
      appointmentTime,
      fullName,
      email,
      phone,
      address,
      reason
    )
  ) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/patient/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientId: currentUser.id,
        doctorId: doctor.value,
        date: appointmentDate.value,
        time: appointmentTime.value,
        reason: reason.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to book appointment");
    }

    const appointment = await response.json();
    alert(
      `Appointment booked successfully for ${appointmentDate.value} at ${appointmentTime.value}`
    );
    resetForm();
    loadPatientAppointments(); // Refresh appointments list
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("Failed to book appointment. Please try again.");
  }
}

// Initialize billing section with data from backend
async function initializeBillingSection() {
  try {
    // In a real app, we would fetch bills from the backend
    // For now, we'll use mock data that matches our backend structure
    const billingTableBody = document.getElementById("billingTableBody");
    const billDetails = document.getElementById("billDetails");

    // Mock data that matches what the backend would return
    const billingData = [
      {
        date: new Date("2025-02-15").toLocaleDateString(),
        amount: "$50.00",
        status: "paid",
        bill: {
          medicines: ["Medicine A - $20.00", "Medicine B - $15.00"],
          tests: ["Blood Test - $10.00"],
          otherCharges: ["Consultation Fee - $5.00"],
        },
      },
      {
        date: new Date("2025-01-10").toLocaleDateString(),
        amount: "$30.00",
        status: "pending",
        bill: {
          medicines: ["Medicine C - $15.00"],
          tests: [],
          otherCharges: ["Consultation Fee - $15.00"],
        },
      },
    ];

    // Populate billing table
    billingData.forEach((bill) => {
      const row = document.createElement("tr");

      const dateCell = document.createElement("td");
      dateCell.textContent = bill.date;

      const amountCell = document.createElement("td");
      amountCell.textContent = bill.amount;

      const statusCell = document.createElement("td");
      statusCell.textContent =
        bill.status.charAt(0).toUpperCase() + bill.status.slice(1);
      statusCell.className = bill.status;

      const actionCell = document.createElement("td");
      actionCell.className = "action-cell";

      const viewButton = document.createElement("button");
      viewButton.className = "viewBillBtn";
      viewButton.textContent = "View Bill";
      viewButton.addEventListener("click", () => showBillDetails(bill));

      actionCell.appendChild(viewButton);
      row.appendChild(dateCell);
      row.appendChild(amountCell);
      row.appendChild(statusCell);
      row.appendChild(actionCell);

      billingTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error initializing billing section:", error);
  }
}

// Helper functions (unchanged from original)
function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateForm(
  medicalField,
  doctor,
  appointmentDate,
  appointmentTime,
  fullName,
  email,
  phone,
  address,
  reason
) {
  // Same validation as before
  if (!medicalField.value) {
    alert("Please select a medical field");
    medicalField.focus();
    return false;
  }

  if (!doctor) {
    alert("Please select a doctor");
    return false;
  }

  if (!appointmentDate.value) {
    alert("Please select an appointment date");
    appointmentDate.focus();
    return false;
  }

  if (!appointmentTime.value) {
    alert("Please select an appointment time");
    appointmentTime.focus();
    return false;
  }

  if (!fullName.value || !/^[A-Za-z ]+$/.test(fullName.value)) {
    alert("Please enter a valid name (letters and spaces only)");
    fullName.focus();
    return false;
  }

  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    alert("Please enter a valid email address");
    email.focus();
    return false;
  }

  if (!phone.value || !/^[0-9]{10}$/.test(phone.value)) {
    alert("Please enter a valid 10-digit phone number");
    phone.focus();
    return false;
  }

  if (!address.value) {
    alert("Please enter your address");
    address.focus();
    return false;
  }

  if (!reason.value) {
    alert("Please describe the reason for your appointment");
    reason.focus();
    return false;
  }

  return true;
}

function resetForm() {
  document.getElementById("appointmentForm").reset();
  document.getElementById("doctorSelection").style.display = "none";
  document.getElementById("timeSlotGroup").style.display = "none";
  document.getElementById("appointmentDate").disabled = true;
}

function showBillDetails(bill) {
  const billDetails = document.getElementById("billDetails");

  billDetails.innerHTML = `
    <h3>Invoice Details - ${bill.date}</h3>
    <p class="bill-description">Billing Breakdown:</p>
    <div class="bill-items">
      ${
        bill.bill.medicines.length > 0
          ? `
        <h4>Medicines</h4>
        <ul>
          ${bill.bill.medicines.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `
          : ""
      }
      ${
        bill.bill.tests.length > 0
          ? `
        <h4>Tests</h4>
        <ul>
          ${bill.bill.tests.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `
          : ""
      }
      ${
        bill.bill.otherCharges.length > 0
          ? `
        <h4>Other Charges</h4>
        <ul>
          ${bill.bill.otherCharges.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `
          : ""
      }
      <h4>Total Amount:</h4>
      <p id="billTotal">${bill.amount}</p>
    </div>
  `;

  billDetails.style.display = "block";
}

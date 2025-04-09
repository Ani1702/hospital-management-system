// const mongoose = require("mongoose");
// const User = require("./models/User");
// const Doctor = require("./models/Doctor");

// async function seedDoctors() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");

//     // Clear existing data (optional)
//     await User.deleteMany({ role: "doctor" });
//     await Doctor.deleteMany({});
//     console.log("Cleared existing doctor data");

//     // Insert doctor users
//     const userDocs = await User.insertMany([
//       {
//         username: "drsharma",
//         password: "password123",
//         role: "doctor",
//         name: "Dr. Rajesh Sharma",
//         email: "dr.sharma@example.com",
//         phone: "9876543210",
//       },
//       {
//         username: "drpatel",
//         password: "password123",
//         role: "doctor",
//         name: "Dr. Priya Patel",
//         email: "dr.patel@example.com",
//         phone: "9876543211",
//       },
//       {
//         username: "drverma",
//         password: "password123",
//         role: "doctor",
//         name: "Dr. Anil Verma",
//         email: "dr.verma@example.com",
//         phone: "9876543212",
//       },
//       {
//         username: "drreddy",
//         password: "password123",
//         role: "doctor",
//         name: "Dr. Sunita Reddy",
//         email: "dr.reddy@example.com",
//         phone: "9876543213",
//       },
//       {
//         username: "drkumar",
//         password: "password123",
//         role: "doctor",
//         name: "Dr. Vijay Kumar",
//         email: "dr.kumar@example.com",
//         phone: "9876543214",
//       },
//       {
//         username: "drgupta",
//         password: "password123",
//         role: "doctor",
//         name: "Dr. Arun Gupta",
//         email: "dr.gupta@example.com",
//         phone: "9876543215",
//       },
//       {
//         username: "drnaidu",
//         password: "password123",
//         role: "doctor",
//         name: "Dr. Meera Naidu",
//         email: "dr.naidu@example.com",
//         phone: "9876543216",
//       },
//     ]);
//     console.log("Inserted doctor users");

//     // Insert doctor profiles with available slots
//     await Doctor.insertMany([
//       {
//         userId: userDocs[0]._id, // Dr. Rajesh Sharma
//         specialization: "Cardiology",
//         approved: true,
//         availableSlots: [
//           { date: new Date("2023-12-15"), time: "10:00", isBooked: false },
//           { date: new Date("2023-12-15"), time: "11:00", isBooked: false },
//           { date: new Date("2023-12-16"), time: "14:00", isBooked: false },
//           { date: new Date("2023-12-17"), time: "09:30", isBooked: false },
//         ],
//       },
//       {
//         userId: userDocs[1]._id, // Dr. Priya Patel
//         specialization: "Neurology",
//         approved: true,
//         availableSlots: [
//           { date: new Date("2023-12-15"), time: "09:00", isBooked: false },
//           { date: new Date("2023-12-16"), time: "10:30", isBooked: false },
//           { date: new Date("2023-12-17"), time: "15:00", isBooked: false },
//           { date: new Date("2023-12-18"), time: "11:00", isBooked: false },
//         ],
//       },
//       {
//         userId: userDocs[2]._id, // Dr. Anil Verma
//         specialization: "General Practitioner",
//         approved: true,
//         availableSlots: [
//           { date: new Date("2023-12-15"), time: "08:00", isBooked: false },
//           { date: new Date("2023-12-15"), time: "12:00", isBooked: false },
//           { date: new Date("2023-12-16"), time: "09:30", isBooked: false },
//           { date: new Date("2023-12-17"), time: "16:00", isBooked: false },
//         ],
//       },
//       {
//         userId: userDocs[3]._id, // Dr. Sunita Reddy
//         specialization: "Orthopedics",
//         approved: true,
//         availableSlots: [
//           { date: new Date("2023-12-16"), time: "11:00", isBooked: false },
//           { date: new Date("2023-12-17"), time: "10:00", isBooked: false },
//           { date: new Date("2023-12-17"), time: "16:00", isBooked: false },
//           { date: new Date("2023-12-18"), time: "14:30", isBooked: false },
//         ],
//       },
//       {
//         userId: userDocs[4]._id, // Dr. Vijay Kumar
//         specialization: "Pediatrics",
//         approved: true,
//         availableSlots: [
//           { date: new Date("2023-12-15"), time: "13:00", isBooked: false },
//           { date: new Date("2023-12-16"), time: "10:00", isBooked: false },
//           { date: new Date("2023-12-18"), time: "14:30", isBooked: false },
//           { date: new Date("2023-12-19"), time: "09:00", isBooked: false },
//         ],
//       },
//       {
//         userId: userDocs[5]._id, // Dr. Arun Gupta
//         specialization: "Dermatology",
//         approved: true,
//         availableSlots: [
//           { date: new Date("2023-12-15"), time: "14:00", isBooked: false },
//           { date: new Date("2023-12-16"), time: "15:30", isBooked: false },
//           { date: new Date("2023-12-17"), time: "11:30", isBooked: false },
//           { date: new Date("2023-12-18"), time: "10:00", isBooked: false },
//         ],
//       },
//       {
//         userId: userDocs[6]._id, // Dr. Meera Naidu
//         specialization: "Gynecology",
//         approved: true,
//         availableSlots: [
//           { date: new Date("2023-12-15"), time: "16:00", isBooked: false },
//           { date: new Date("2023-12-16"), time: "13:00", isBooked: false },
//           { date: new Date("2023-12-17"), time: "10:30", isBooked: false },
//           { date: new Date("2023-12-18"), time: "15:00", isBooked: false },
//         ],
//       },
//     ]);
//     console.log("Inserted doctor profiles with available slots");

//     console.log("Database seeded successfully!");
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// // Run the seed function
// seedDoctors();

const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust path to your User model
const Doctor = require("./models/Doctor"); // Adjust path to your Doctor model

// List of random Indian names
const indianNames = [
  "Aarav Patel",
  "Vihaan Sharma",
  "Aditya Singh",
  "Arjun Kumar",
  "Reyansh Gupta",
  "Mohammed Khan",
  "Sai Reddy",
  "Ishaan Mishra",
  "Kabir Joshi",
  "Dhruv Desai",
  "Ananya Iyer",
  "Diya Choudhary",
  "Aadhya Nair",
  "Ishita Malhotra",
  "Myra Chatterjee",
  "Kiara Saxena",
  "Pari Mehra",
  "Avni Banerjee",
  "Riya Kapoor",
  "Anika Trivedi",
];

async function createUsersForDoctors() {
  try {
    // Connect to your MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get all doctors with userId references
    const doctors = await Doctor.find({ userId: { $exists: true } });

    for (const doctor of doctors) {
      // Check if user already exists
      const existingUser = await User.findById(doctor.userId);

      if (!existingUser) {
        // Create a new user
        const randomName =
          indianNames[Math.floor(Math.random() * indianNames.length)];
        const email = `${randomName.split(" ")[0].toLowerCase()}@example.com`;

        const newUser = new User({
          _id: doctor.userId, // Use the same ID as referenced in Doctor
          name: randomName,
          email: email,
          password: "Doctor@123", // Default password, doctors should change this
          role: "doctor",
        });

        await newUser.save();
        console.log(
          `Created user ${randomName} for doctor ${doctor.specialization}`
        );
      }
    }

    console.log("Finished creating users for doctors");
    process.exit(0);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  }
}

createUsersForDoctors();

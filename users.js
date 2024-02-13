// Import express and morgan modules
const express = require("express");
const morgan = require("morgan");

// Create an express app
const app = express();

// Use morgan to log requests
app.use(morgan("dev"));

// Define the users array
const users = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Smith",
  },
  {
    id: 3,
    name: "Bob",
  },
];

// Define the GET /users endpoint
app.get("/users", (req, res) => {
  // Send the users array as a JSON response
  res.json(users);
});

// Define the GET /users/:name endpoint
app.get("/users/:name", (req, res) => {
  // Get the name parameter from the request
  const name = req.params.name;

  // Find the user with the matching name (case insensitive)
  const user = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );

  // If the user is found, send it as a JSON response
  if (user) {
    res.json(user);
  } else {
    // If the user is not found, send an error message as a JSON response
    res.status(404).json({
      message: "data user tidak di temukan",
    });
  }
});

// Define a middleware to handle 404 errors
app.use((req, res, next) => {
  // Send a 404 error message as a JSON response
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Define an error handling middleware
app.use((err, req, res, next) => {
  // Log the error
  console.error(err);

  // Send a 500 error message as a JSON response
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
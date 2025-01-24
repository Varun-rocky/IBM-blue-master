import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import Navbar from "../main_page/Navbar";

function Booking({
  isAuthenticated,
  onLogout,
  handleBookSeats,
}) {
  const [bookedSeats, setBookedSeats] = useState([]); // Dynamic state for booked seats
  const [selectedSeats, setSelectedSeats] = useState([]); // User-selected seats
  const [selectedDate, setSelectedDate] = useState(""); // Selected date
  const [selectedTime, setSelectedTime] = useState(""); // Selected time

  // Fetch booked seats dynamically based on the date and time
  const fetchBookedSeats = async (date, time) => {
    if (!date || !time) return; // Ensure date and time are selected
    try {
      const response = await fetch(
        `http://localhost:8082/api/v1/seats?date=${date}&time=${time}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer <YourTokenHere>", // Replace with valid token
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBookedSeats(data); // Update booked seats
      } else {
        console.error("Failed to fetch booked seats:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  // Handle date and time change from Navbar
  const handleDateTimeChange = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    fetchBookedSeats(date, time); // Update booked seats for the new date and time
  };

  // Handle seat selection
  const handleSeatClick = (seatIndex) => {
    // Check if the seat is already booked
    if (bookedSeats.includes(seatIndex + 1)) {
      console.warn("This seat is already booked.");
      return;
    }

    // Toggle the seat selection
    setSelectedSeats((prev) =>
      prev.includes(seatIndex + 1)
        ? prev.filter((seat) => seat !== seatIndex + 1) // Deselect if already selected
        : [...prev, seatIndex + 1] // Select the seat if not already selected
    );
  };

  return (
    <div>
      <Navbar
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onDateChange={(date) => handleDateTimeChange(date, selectedTime)}
        onTimeChange={(time) => handleDateTimeChange(selectedDate, time)}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          margin: "20px 0",
          fontWeight: "bold",
          color: "#424242",
        }}
      >
        Select Your Seats
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)", // 10 seats per row
          gap: 2,
          justifyContent: "center",
          padding: "20px",
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: 50 }).map((_, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              width: 50,
              height: 50,
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: bookedSeats.includes(index + 1)
                ? "#b0bec5" // Booked seats
                : selectedSeats.includes(index + 1)
                ? "#ffcc80" // Selected by the user
                : "#81c784", // Available
              color: bookedSeats.includes(index + 1) ? "white" : "black",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: bookedSeats.includes(index + 1)
                  ? "#b0bec5"
                  : "#66bb6a",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              },
              cursor: bookedSeats.includes(index + 1)
                ? "not-allowed" // Disable if seat is already booked
                : "pointer", // Enable if available
            }}
            onClick={() => handleSeatClick(index)}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor:
              selectedSeats.length > 0 ? "#1e88e5" : "#b0bec5",
            cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed",
          }}
          disabled={selectedSeats.length === 0}
          onClick={() => handleBookSeats(selectedSeats)}
        >
          Book
        </Button>
      </Box>
    </div>
  );
}

export default Booking;

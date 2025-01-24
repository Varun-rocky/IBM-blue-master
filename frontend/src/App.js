import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Booking from "./components/booking/Booking"; // Booking page component
import dayjs from "dayjs";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [bookedSeats, setBookedSeats] = useState([]); // Dynamic booked seats
  const [selectedSeats, setSelectedSeats] = useState([]); // Seats selected by the user
  const [jwtToken, setJwtToken] = useState(""); // JWT token state
  const [userId, setUserId] = useState(null); // User ID state

  // Handle seat click logic
  const handleSeatClick = (index) => {
    if (selectedSeats.includes(index + 1)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== index + 1));
    } else {
      setSelectedSeats([...selectedSeats, index + 1]);
    }
  };

  // Fetch booked seats dynamically
  const fetchBookedSeats = async (date, time) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/v1/seats?date=${date}&time=${time}`,
        {
          method: "GET",
          headers: {
            Authorization: jwtToken, // Pass dynamic JWT token
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookedSeats(data); // Update booked seats dynamically
      } else {
        console.error("Failed to fetch booked seats:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  // Handle booking logic
  const handleBookSeats = async () => {
    const date = dayjs().format("DD-MM-YYYY"); // Replace with the selected date
    const time = dayjs().format("HH:mm"); // Replace with the selected time

    try {
      for (const seat of selectedSeats) {
        const response = await fetch(
          "http://localhost:8082/api/v1/seats", // Replace with your API endpoint
          {
            method: "POST",
            headers: {
              Authorization: jwtToken, // Pass the token dynamically
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              date,
              time,
              seatNo: seat,
            }),
          }
        );

        if (response.ok) {
          console.log(`Seat ${seat} booked successfully`);
        } else {
          console.error(`Failed to book seat ${seat}`);
        }
      }

      // Update booked seats and clear selected seats
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setSelectedSeats([]);
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Signup Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/booking" />
            ) : (
              <Signup
                setIsAuthenticated={setIsAuthenticated}
                setJwtToken={setJwtToken} // Update JWT dynamically
                setUserId={setUserId} // Update User ID dynamically
              />
            )
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/booking" />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setJwtToken={setJwtToken} // Update JWT dynamically
                setUserId={setUserId} // Update User ID dynamically
              />
            )
          }
        />

        {/* Booking Route */}
        <Route
          path="/booking"
          element={
            isAuthenticated ? (
              <Booking
                isAuthenticated={isAuthenticated}
                bookedSeats={bookedSeats}
                selectedSeats={selectedSeats}
                handleSeatClick={handleSeatClick}
                handleBookSeats={handleBookSeats}
                fetchBookedSeats={fetchBookedSeats} // Fetch booked seats dynamically
                jwtToken={jwtToken}
                userId={userId}
                onLogout={() => {
                  setIsAuthenticated(false);
                  setJwtToken("");
                  setUserId(null);
                }}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all Route for Unknown Paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Booking from "./components/booking/Booking"; // Booking page component
import dayjs from "dayjs";
// import axios from "axios"; // Uncomment when ready to use API calls

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [bookedSeats, setBookedSeats] = useState([3, 4]); // Mimicked booked seats
  const [selectedSeats, setSelectedSeats] = useState([]); // Seats selected by the user

  const jwtToken = "Bearer lmdfkmakldnklanvkandkgvands"; // Mimicked token
  const userId = 1; // Mimicked userId for now

  const handleSeatClick = (index) => {
    if (selectedSeats.includes(index + 1)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== index + 1));
    } else {
      setSelectedSeats([...selectedSeats, index + 1]);
    }
  };

  const handleBookSeats = () => {
    const date = dayjs().format("DD-MM-YYYY"); // Replace with the selected date
    const time = dayjs().format("HH:mm"); // Replace with the selected time

    console.log("Mimicked Booking Request:");
    selectedSeats.forEach((seat) => {
      console.log({
        userId,
        date,
        time,
        seatNo: seat,
      });
    });

    // Mimicked booking logic
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]);

    /*
    // API Booking Logic
    const handleBookSeats = async () => {
      const date = dayjs().format("DD-MM-YYYY"); // Replace with the selected date
      const time = dayjs().format("HH:mm"); // Replace with the selected time

      try {
        for (const seat of selectedSeats) {
          const response = await axios.post(
            "http://localhost:8082/api/v1/seats", // Replace with your API endpoint
            {
              userId,
              date,
              time,
              seatNo: seat,
            },
            {
              headers: {
                Authorization: jwtToken, // Pass the token in the headers
              },
            }
          );
          console.log("Booking Successful:", response.data);
        }
        setBookedSeats([...bookedSeats, ...selectedSeats]); // Mark seats as booked after API response
        setSelectedSeats([]); // Clear selected seats after booking
      } catch (error) {
        console.error("Error booking seats:", error);
      }
    };
    */
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
              <Signup setIsAuthenticated={setIsAuthenticated} />
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
              <Login setIsAuthenticated={setIsAuthenticated} />
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
                onLogout={() => setIsAuthenticated(false)}
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

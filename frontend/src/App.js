import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navbar from "./components/main_page/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
              <Navigate to="/main" />
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
              <Navigate to="/main" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Main Page Route */}
        <Route
          path="/main"
          element={
            // isAuthenticated ? 
            (
              <div>
                <Navbar
                  onDateTimeChange={(date, time) => {
                    console.log("DateTime changed:", date, time);
                  }}
                  isAuthenticated={isAuthenticated}
                  onLogout={() => setIsAuthenticated(false)}
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
                          ? "#b0bec5"
                          : selectedSeats.includes(index + 1)
                          ? "#ffcc80"
                          : "#81c784",
                        color: bookedSeats.includes(index + 1)
                          ? "white"
                          : "black",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                          backgroundColor: bookedSeats.includes(index + 1)
                            ? "#b0bec5"
                            : "#66bb6a",
                          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                        },
                        cursor: bookedSeats.includes(index + 1)
                          ? "not-allowed"
                          : "pointer",
                      }}
                      onClick={() =>
                        !bookedSeats.includes(index + 1) &&
                        handleSeatClick(index)
                      }
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
                    onClick={handleBookSeats}
                  >
                    Book
                  </Button>
                </Box>
              </div>
            ) 
            // : (
            //   <Navigate to="/login" />
            // )
          }
        />

        {/* Catch-all Route for Unknown Paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

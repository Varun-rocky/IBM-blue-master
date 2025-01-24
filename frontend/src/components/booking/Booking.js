import React from "react";
import { Button, Typography, Box } from "@mui/material";
import Navbar from "../main_page/Navbar";
function Booking({
  isAuthenticated,
  bookedSeats = [],
  selectedSeats = [],
  handleSeatClick,
  handleBookSeats,
  onDateTimeChange,
  onLogout,
}) {
  return (
    <div>
      <Navbar
        onDateTimeChange={(date, time) => {
          console.log("DateTime changed:", date, time);
          if (onDateTimeChange) onDateTimeChange(date, time);
        }}
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
                ? "#b0bec5"
                : selectedSeats.includes(index + 1)
                ? "#ffcc80"
                : "#81c784",
              color: bookedSeats.includes(index + 1) ? "white" : "black",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: bookedSeats.includes(index + 1)
                  ? "#b0bec5"
                  : "#66bb6a",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              },
              cursor: bookedSeats.includes(index + 1) ? "not-allowed" : "pointer",
            }}
            onClick={() =>
              !bookedSeats.includes(index + 1) && handleSeatClick(index)
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
  );
}

export default Booking;

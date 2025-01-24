import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker, DatePicker } from "@mui/x-date-pickers"; // Date and Time pickers
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const Navbar = ({ selectedDate, selectedTime, onDateChange, onTimeChange }) => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1e88e5", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Time Picker */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Time"
              value={selectedTime || dayjs()} // Use passed prop or default to current time
              onChange={onTimeChange} // Pass the change handler
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Seat Reservation System
        </Typography>

        {/* Date Picker */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate || dayjs()} // Use passed prop or default to current date
              onChange={onDateChange} // Pass the change handler
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

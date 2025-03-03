import { TextField } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DropDownFilter from "./DropDownFilter";

function Filters({ filterButtons, handleFilterChange, filterQuery, setfilterQuery, handleSearchChange, searchQuery }) {
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      {filterButtons.map((filterObj) => (
        <div key={filterObj.name}>
          <DropDownFilter
            filterObj={filterObj}
            handleFilterChange={handleFilterChange}
            filterQuery={filterQuery}
            setfilterQuery={setfilterQuery}
          />
        </div>
      ))}
      <TextField
        placeholder="Search by Document Name"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          marginLeft: "auto",
          width: "20%",
          marginTop: "2px",
          "& .MuiOutlinedInput-root": {
            boxShadow: "0px 9px 13px -px rgba(0,0,0,0.55)", // Add box shadow here
            "& fieldset": {
              borderColor: "#e1e1e1", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#6e3cbe", // Border color on hover
              borderWidth: "2px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6e3cbe", // Border color on focus (purple)
            },
          },
        }}
      />
    </div>
  );
}

export default Filters;
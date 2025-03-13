import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DropDownFilter from "./DropDownFilter";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SearchModal from "../../../components/SearchModal/SearchModal";
import React from "react";

function Filters({
  filterButtons,
  handleFilterChange,
  filterQuery,
  setfilterQuery,
  handleSearchChange,
  searchQuery,
  documents,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Box sx={{ marginLeft: "auto" }}>
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{
            marginRight: "1em",
            borderWidth: "2px",
            marginTop: "3px",
            borderColor: "#6e3cbe",
            color: "#6e3cbe",
               fontWeight:"bold"
          }}
        >
          Search by Content
          <ManageSearchIcon sx={{ marginLeft: "7px" }} />{" "}
        </Button>
        <SearchModal
          open={open}
          handleClose={handleClose}
          documents={documents}
        />
        <TextField
          placeholder="Search by Title"
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
            marginRight: "1em",
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
      </Box>
    </div>
  );
}

export default Filters;

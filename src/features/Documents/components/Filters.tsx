import { Box, Button, TextField, Paper, alpha } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DropDownFilter from "./DropDownFilter";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ExpandIcon from "@mui/icons-material/OpenInFull";
import SearchModal from "../../../components/SearchModal/SearchModal";
import React from "react";
import { useTheme } from "@mui/material/styles";

function Filters({
  filterButtons,
  handleFilterChange,
  filterQuery,
  setfilterQuery,
  handleSearchChange,
  searchQuery,
  documents,
  expandButton,
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 2,
        backgroundColor: alpha("#f8f9fa", 0.8),
        borderRadius: "16px",
        border: `1px solid ${alpha("#e0e0e0", 0.6)}`,
        backdropFilter: "blur(10px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          backgroundColor: alpha("#f8f9fa", 1),
          border: `1px solid ${alpha(theme.palette.kyoPurple?.main || "#6e3cbe", 0.2)}`,
          boxShadow: `0 4px 20px ${alpha(theme.palette.kyoPurple?.main || "#6e3cbe", 0.08)}`,
        },
      }}
    >
      {/* Left Section - Filters */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flex: "0 0 auto",
        }}
      >
        {filterButtons.map((filterObj) => (
          <Box key={filterObj.name}>
            <DropDownFilter
              filterObj={filterObj}
              handleFilterChange={handleFilterChange}
              filterQuery={filterQuery}
              setFilterQuery={setfilterQuery}
            />
          </Box>
        ))}
      </Box>

      {/* Right Section - Search & Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flex: "0 0 auto",
        }}
      >
        {/* Content Search Button */}
        <Button
          variant="outlined"
          onClick={handleOpen}
          startIcon={<ManageSearchIcon />}
          sx={{
            borderRadius: "12px",
            borderWidth: "2px",
            borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
            color: theme.palette.kyoPurple?.main || "#6e3cbe",
            background: "white",
            fontWeight: 600,
            fontSize: "0.875rem",
            textTransform: "none",
            px: 2.5,
            py: 1,
            minHeight: "44px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
              backgroundColor: alpha(
                theme.palette.kyoPurple?.main || "#6e3cbe",
                0.08
              ),
              transform: "translateY(-1px)",
              boxShadow: `0 4px 12px ${alpha(theme.palette.kyoPurple?.main || "#6e3cbe", 0.2)}`,
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          Search Content
        </Button>

        {/* Expand Button */}
        {expandButton && (
          <Box
            sx={{
              "& > button": {
                borderRadius: "12px !important",
                minHeight: "44px",
                background: "white",
                px: "20px !important",
                fontSize: "0.875rem !important",
                textTransform: "none !important",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: `0 4px 12px ${alpha(theme.palette.kyoPurple?.main || "#6e3cbe", 0.2)} !important`,
                },
                "&:active": {
                  transform: "translateY(0) !important",
                },
              },
            }}
          >
            {expandButton}
          </Box>
        )}

        {/* Title Search Field */}
        <TextField
          placeholder="Search documents..."
          variant="outlined"
          size="medium"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: alpha("#666", 0.7),
                    fontSize: "1.2rem",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: "280px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "white",
              fontSize: "0.875rem",
              height: "44px",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: `0 2px 8px ${alpha("#000", 0.04)}`,
              "& fieldset": {
                borderColor: alpha("#e0e0e0", 0.8),
                borderWidth: "1px",
              },
              "&:hover": {
                backgroundColor: alpha("#fff", 1),
                transform: "translateY(-1px)",
                boxShadow: `0 4px 16px ${alpha("#000", 0.08)}`,
                "& fieldset": {
                  borderColor: alpha(
                    theme.palette.kyoPurple?.main || "#6e3cbe",
                    0.4
                  ),
                  borderWidth: "2px",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                transform: "translateY(-1px)",
                boxShadow: `0 4px 20px ${alpha(theme.palette.kyoPurple?.main || "#6e3cbe", 0.12)}`,
                "& fieldset": {
                  borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
                  borderWidth: "2px",
                },
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "0.875rem",
              fontWeight: 500,
              "&::placeholder": {
                color: alpha("#666", 0.6),
                opacity: 1,
                fontSize: "0.875rem",
              },
            },
          }}
        />

        {/* Search Modal */}
        <SearchModal
          open={open}
          handleClose={handleClose}
          documents={documents}
        />
      </Box>
    </Paper>
  );
}

export default Filters;

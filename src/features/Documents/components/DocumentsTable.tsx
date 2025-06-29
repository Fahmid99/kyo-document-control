import React, { useState } from "react";
import { Document } from "../../../Types/types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@mui/material";

interface DocumentsTableProps {
  filteredDocuments: Document[];
  handleRowClick: (doc: Document) => void;
}

// Utility function to format the date as dd-mm-yyyy
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits for day
  const month = date.toLocaleString("default", { month: "short" }); // Get short month name (e.g., Oct)
  const year = date.getFullYear(); // Get full year
  return `${day}-${month}-${year}`; // Format as DD-MMM-YYYY
};

function DocumentsTable({
  filteredDocuments,
  handleRowClick,
}: DocumentsTableProps) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Document["data"]>("name");

  // Handle sorting
  const handleSort = (property: keyof Document["data"]) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort documents
  const sortedDocuments = filteredDocuments.sort((a, b) => {
    if (order === "asc") {
      return a.data[orderBy] > b.data[orderBy] ? 1 : -1;
    } else {
      return a.data[orderBy] < b.data[orderBy] ? 1 : -1;
    }
  });

  return (
    <TableContainer
      sx={{
        boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
        flex: 1, // Take remaining space after filters
        minHeight: 0, // Important for overflow
      }}
    >
      <Table stickyHeader>
        <TableHead
          sx={{ background: "#6e3cbe", color: "white"}}
        >
          <TableRow>
            {/* Name Column */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                position: "sticky",
                top: 0,
                backgroundColor: "#6e3cbe",
                zIndex: 100,
              }}
            >
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
                sx={{
                  color: "white",
                  "&.Mui-active": { color: "white" },
                  "&:hover": { color: "white" },
                  "& .MuiTableSortLabel-icon": { color: "white !important" },
                }}
              >
                Name
              </TableSortLabel>
            </TableCell>

            {/* Type Column */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                position: "sticky", // Add this
                top: 0, // Add this
                backgroundColor: "#6e3cbe", // Add this
                zIndex: 100, // Add this
              }}
            >
              <TableSortLabel
                active={orderBy === "type"}
                direction={orderBy === "type" ? order : "asc"}
                onClick={() => handleSort("type")}
                sx={{
                  color: "white",
                  "&.Mui-active": { color: "white" },
                  "&:hover": { color: "white" },
                  "& .MuiTableSortLabel-icon": { color: "white !important" },
                }}
              >
                Type
              </TableSortLabel>
            </TableCell>

            {/* Function Column */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                position: "sticky", // Add this
                top: 0, // Add this
                backgroundColor: "#6e3cbe", // Add this
                zIndex: 100, // Add this
              }}
            >
              Function
            </TableCell>

            {/* Category Column */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                position: "sticky", // Add this
                top: 0, // Add this
                backgroundColor: "#6e3cbe", // Add this
                zIndex: 100, // Add this
              }}
            >
              Category
            </TableCell>

            {/* Release Date Column */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                position: "sticky", // Add this
                top: 0, // Add this
                backgroundColor: "#6e3cbe", // Add this
                zIndex: 100, // Add this
              }}
            >
              <TableSortLabel
                active={orderBy === "releasedate"}
                direction={orderBy === "releasedate" ? order : "asc"}
                onClick={() => handleSort("releasedate")}
                sx={{
                  color: "white",
                  "&.Mui-active": { color: "white" },
                  "&:hover": { color: "white" },
                  "& .MuiTableSortLabel-icon": { color: "white !important" },
                }}
              >
                Release Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedDocuments.map((doc) => (
            <TableRow
              key={doc.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                },
              }}
              onClick={() => handleRowClick(doc)}
            >
              {/* Name */}
              <TableCell>{doc.data.name}</TableCell>

              {/* Type */}
              <TableCell>{doc.data.type}</TableCell>

              {/* Function */}
              <TableCell>{(doc.data.functionsubfn ?? []).join(", ")}</TableCell>

              {/* Category */}
              <TableCell>{(doc.data.category ?? []).join(", ")}</TableCell>

              {/* Release Date */}
              <TableCell>{formatDate(doc.data.releasedate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DocumentsTable;

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

function DocumentsTable({ filteredDocuments, handleRowClick }: DocumentsTableProps) {
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
    <TableContainer>
      <Table>
        <TableHead sx={{ background: "#6e3cbe", color: "white" }}>
          <TableRow>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
                sx={{
                  color: "white", // Ensure text stays white
                  "&.Mui-active": {
                    color: "white", // Ensure text stays white when active
                  },
                  "&:hover": {
                    color: "white", // Ensure text stays white on hover
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "white !important", // Ensure the arrow is white
                  },
                }}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              <TableSortLabel
                active={orderBy === "type"}
                direction={orderBy === "type" ? order : "asc"}
                onClick={() => handleSort("type")}
                sx={{
                  color: "white", // Ensure text stays white
                  "&.Mui-active": {
                    color: "white", // Ensure text stays white when active
                  },
                  "&:hover": {
                    color: "white", // Ensure text stays white on hover
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "white !important", // Ensure the arrow is white
                  },
                }}
              >
                Type
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              <TableSortLabel
                active={orderBy === "publishdate"}
                direction={orderBy === "publishdate" ? order : "asc"}
                onClick={() => handleSort("publishdate")}
                sx={{
                  color: "white", // Ensure text stays white
                  "&.Mui-active": {
                    color: "white", // Ensure text stays white when active
                  },
                  "&:hover": {
                    color: "white", // Ensure text stays white on hover
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "white !important", // Ensure the arrow is white
                  },
                }}
              >
                Publish Date
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              <TableSortLabel
                active={orderBy === "releasedate"}
                direction={orderBy === "releasedate" ? order : "asc"}
                onClick={() => handleSort("releasedate")}
                sx={{
                  color: "white", // Ensure text stays white
                  "&.Mui-active": {
                    color: "white", // Ensure text stays white when active
                  },
                  "&:hover": {
                    color: "white", // Ensure text stays white on hover
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "white !important", // Ensure the arrow is white
                  },
                }}
              >
                Release Date
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              <TableSortLabel
                active={orderBy === "reviewdate"}
                direction={orderBy === "reviewdate" ? order : "asc"}
                onClick={() => handleSort("reviewdate")}
                sx={{
                  color: "white", // Ensure text stays white
                  "&.Mui-active": {
                    color: "white", // Ensure text stays white when active
                  },
                  "&:hover": {
                    color: "white", // Ensure text stays white on hover
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "white !important", // Ensure the arrow is white
                  },
                }}
              >
                Review Date
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Categories
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Functionsubfn
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
              <TableCell>{doc.data.name}</TableCell>
              <TableCell>{doc.data.type}</TableCell>
              <TableCell>{doc.data.publishdate}</TableCell>
              <TableCell>{doc.data.releasedate}</TableCell>
              <TableCell>{doc.data.reviewdate}</TableCell>
              <TableCell>{doc.data.category.join(", ")}</TableCell>
              <TableCell>{doc.data.functionsubfn.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DocumentsTable;
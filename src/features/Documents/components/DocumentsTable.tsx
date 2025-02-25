import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// Define the Document type
interface Document {
  id: string;
  data: {
    name: string;
    type: string;
    publishdate: string;
    releasedate: string;
    reviewdate: string;
    classification: string;
  };
}

// Define the props for DocumentsTable
interface DocumentsTableProps {
  filteredDocuments: Document[];
  handleRowClick: (doc: Document) => void;
}

function DocumentsTable({ filteredDocuments, handleRowClick }: DocumentsTableProps) {
  return (
    <TableContainer sx={{ borderLeft: "none", borderRight: "none" }}>
      <Table>
        <TableHead sx={{ background: "#0A9BCD", color: "white" }}>
          <TableRow>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Type
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Publish Date
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Release Date
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Review Date
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Classification
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDocuments.map((doc) => (
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
              <TableCell>{doc.data.classification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DocumentsTable;
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
  Chip,
  Typography,
  Box,
  IconButton,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Description as DocumentIcon,
  Policy as PolicyIcon,
  Assignment as FormIcon,
  Article as ProcedureIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Functions as FunctionIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface DocumentsTableProps {
  filteredDocuments: Document[];
  handleRowClick: (doc: Document) => void;
}

// Utility function to format the date as dd-mm-yyyy
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Function to get appropriate icon for document type
const getDocumentIcon = (type: string) => {
  const iconProps = { fontSize: "small" as const };
  
  switch (type.toLowerCase()) {
    case 'policy':
      return <PolicyIcon {...iconProps} />;
    case 'form':
      return <FormIcon {...iconProps} />;
    case 'procedure':
      return <ProcedureIcon {...iconProps} />;
    case 'business':
      return <BusinessIcon {...iconProps} />;
    default:
      return <DocumentIcon {...iconProps} />;
  }
};

// Function to get color for document type
const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'policy':
      return '#1976d2'; // Blue
    case 'form':
      return '#388e3c'; // Green
    case 'procedure':
      return '#f57c00'; // Orange
    case 'business':
      return '#7b1fa2'; // Purple
    default:
      return '#616161'; // Gray
  }
};

function DocumentsTable({
  filteredDocuments,
  handleRowClick,
}: DocumentsTableProps) {
  const theme = useTheme();
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

  const headerCellStyle = {
    backgroundColor: theme.palette.kyoPurple?.main || '#6e3cbe',
    color: "white",
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "0.5px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    height: "44px",
    borderBottom: `2px solid ${alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.3)}`,
    textTransform: "uppercase" as const,
    py: 1,
  };

  const sortLabelStyle = {
    color: "white !important",
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "0.5px",
    "&.Mui-active": { 
      color: "white !important",
      "& .MuiTableSortLabel-icon": { 
        color: "white !important",
        opacity: 1,
      },
    },
    "&:hover": { 
      color: "white !important",
      "& .MuiTableSortLabel-icon": { 
        color: "white !important",
        opacity: 0.8,
      },
    },
    "& .MuiTableSortLabel-icon": { 
      color: "white !important",
      fontSize: "1.2rem",
    },
  };

  return (
    <TableContainer
      sx={{
        borderRadius: "12px",
        overflow: "auto",
        boxShadow: `0 8px 32px ${alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.12)}`,
        border: `1px solid ${alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.08)}`,
        flex: 1,
        minHeight: 0,
        background: "white",
        "& .MuiTableContainer-root": {
          borderRadius: "12px",
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {/* Name Column */}
            <TableCell sx={headerCellStyle}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
                sx={sortLabelStyle}
              >
                Document Name
              </TableSortLabel>
            </TableCell>

            {/* Type Column */}
            <TableCell sx={headerCellStyle}>
              <TableSortLabel
                active={orderBy === "type"}
                direction={orderBy === "type" ? order : "asc"}
                onClick={() => handleSort("type")}
                sx={sortLabelStyle}
              >
                Type
              </TableSortLabel>
            </TableCell>

            {/* Function Column */}
            <TableCell sx={headerCellStyle}>
              Function
            </TableCell>

            {/* Category Column */}
            <TableCell sx={headerCellStyle}>
              Category
            </TableCell>

            {/* Release Date Column */}
            <TableCell sx={headerCellStyle}>
              <TableSortLabel
                active={orderBy === "releasedate"}
                direction={orderBy === "releasedate" ? order : "asc"}
                onClick={() => handleSort("releasedate")}
                sx={sortLabelStyle}
              >
                Release Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedDocuments.map((doc, index) => (
            <TableRow
              key={doc.id}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                borderBottom: `1px solid ${alpha('#000', 0.06)}`,
                backgroundColor: index % 2 === 0 ? "white" : alpha('#f8f9fa', 0.3),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.04),
                  transform: "translateY(-1px)",
                  boxShadow: `0 4px 12px ${alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.08)}`,
                  "& .document-name": {
                    color: theme.palette.kyoPurple?.main || '#6e3cbe',
                    fontWeight: 600,
                  },
                },
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
              onClick={() => handleRowClick(doc)}
            >
              {/* Name */}
              <TableCell sx={{ py: 2, px: 3 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "8px",
                      backgroundColor: alpha(getTypeColor(doc.data.type), 0.1),
                      color: getTypeColor(doc.data.type),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getDocumentIcon(doc.data.type)}
                  </Box>
                  <Typography
                    variant="body2"
                    className="document-name"
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      lineHeight: 1.4,
                      transition: "all 0.2s ease",
                      color: "#1a1a1a",
                    }}
                  >
                    {doc.data.name}
                  </Typography>
                </Box>
              </TableCell>

              {/* Type */}
              <TableCell sx={{ py: 2, px: 3 }}>
                <Chip
                  label={doc.data.type}
                  size="small"
                  sx={{
                    backgroundColor: alpha(getTypeColor(doc.data.type), 0.1),
                    color: getTypeColor(doc.data.type),
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    height: "28px",
                    borderRadius: "6px",
                    border: `1px solid ${alpha(getTypeColor(doc.data.type), 0.2)}`,
                  }}
                />
              </TableCell>

              {/* Function */}
              <TableCell sx={{ py: 2, px: 3 }}>
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {(doc.data.functionsubfn ?? []).slice(0, 2).map((fn, index) => (
                    <Chip
                      key={index}
                      label={fn}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: "0.7rem",
                        height: "24px",
                        borderRadius: "4px",
                        borderColor: alpha('#666', 0.3),
                        color: '#666',
                        backgroundColor: alpha('#f5f5f5', 0.5),
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.08),
                          borderColor: alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.3),
                        },
                      }}
                    />
                  ))}
                  {(doc.data.functionsubfn ?? []).length > 2 && (
                    <Tooltip title={(doc.data.functionsubfn ?? []).slice(2).join(", ")}>
                      <Chip
                        label={`+${(doc.data.functionsubfn ?? []).length - 2}`}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: "24px",
                          borderRadius: "4px",
                          backgroundColor: alpha('#999', 0.1),
                          color: '#666',
                          fontWeight: 600,
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </TableCell>

              {/* Category */}
              <TableCell sx={{ py: 2, px: 3 }}>
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {(doc.data.category ?? []).slice(0, 2).map((cat, index) => (
                    <Chip
                      key={index}
                      label={cat}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: "0.7rem",
                        height: "24px",
                        borderRadius: "4px",
                        borderColor: alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.3),
                        color: theme.palette.kyoPurple?.main || '#6e3cbe',
                        backgroundColor: alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.05),
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.1),
                        },
                      }}
                    />
                  ))}
                  {(doc.data.category ?? []).length > 2 && (
                    <Tooltip title={(doc.data.category ?? []).slice(2).join(", ")}>
                      <Chip
                        label={`+${(doc.data.category ?? []).length - 2}`}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: "24px",
                          borderRadius: "4px",
                          backgroundColor: alpha(theme.palette.kyoPurple?.main || '#6e3cbe', 0.1),
                          color: theme.palette.kyoPurple?.main || '#6e3cbe',
                          fontWeight: 600,
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </TableCell>

              {/* Release Date */}
              <TableCell sx={{ py: 2, px: 3 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarIcon sx={{ fontSize: "1rem", color: "#999", opacity: 0.7 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: "#666",
                      fontWeight: 500,
                    }}
                  >
                    {formatDate(doc.data.releasedate)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DocumentsTable;
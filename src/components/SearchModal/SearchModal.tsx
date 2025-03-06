import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import docService from "../../features/Documents/services/docService";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import { useTheme } from "@mui/material/styles";

interface SearchModalProps {
  open: boolean;
  handleClose: () => void;
}

interface SearchResult {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    created: string;
    creatortitle: string;
    id: string;
    modified: string;
    modifiertitle: string;
    "published.name"?: string;
    "published.audience"?: string[];
    "published.category"?: string[];
    "published.classification"?: string;
    "published.docstatus"?: string;
    "published.external"?: boolean;
    "published.functionsubfn"?: string[];
    "published.publishdate"?: string;
    "published.related"?: string[];
    "published.releasedate"?: string;
    "published.reviewdate"?: string;
    "published.type"?: string;
    "published.version"?: number;
    "published.verstatus"?: string;
  };
}

function SearchModal({ open, handleClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await docService.getSearchResults(searchTerm);
      console.log("Search response:", response);

      if (response.hits && response.hits.hits) {
        setSearchResults(response.hits.hits);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const handleRowClick = (type: string | undefined, id: string) => {
    if (type) {
      navigate(`/documents/${type}/${id}`);
      handleClose();
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A"; // Handle undefined or null dates
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "800px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Search in file contents of documents
        </Typography>
        <Divider />
        <Box sx={{ padding: "1em 1em 1em 0em" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HelpIcon sx={{ color: theme.palette.kyoPurple.main, mr: 1 }} />
            <Typography variant="body1" component="span">
              Will search for exact word matches in file contents of all documents
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Enter search term"
            value={searchTerm}
            onChange={handleSearchTermChange}
            fullWidth
            color="secondary"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.kyoPurple.main,
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ background: theme.palette.kyoPurple.main }}
          >
            Begin Search <SearchIcon sx={{ ml: "0.3em" }} />
          </Button>
        </Box>
        {searchResults.length > 0 && (
          <>
            <Typography sx={{ mt: 2 }}>
              There were{" "}
              <span style={{ color: theme.palette.kyoPurple.main, fontWeight: "bold" }}>
                {searchResults.length} matches found
              </span>
            </Typography>
            <TableContainer sx={{ mt: 4, boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)" }}>
              <Table>
                <TableHead sx={{ background: theme.palette.kyoPurple.main, color: "white" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Document Name</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Release Date</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Categories</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Functionsubfn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((result) => (
                    <TableRow
                      key={result._id}
                      hover
                      onClick={() => handleRowClick(result._source["published.type"], result._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{result._source["published.name"] || "N/A"}</TableCell>
                      <TableCell>{result._source["published.type"] || "N/A"}</TableCell>
                      <TableCell>{formatDate(result._source["published.releasedate"])}</TableCell>
                      <TableCell>{result._source["published.category"]?.join(", ") || "N/A"}</TableCell>
                      <TableCell>{result._source["published.functionsubfn"]?.join(", ") || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {searchResults.length === 0 && searchTerm && (
          <Typography sx={{ mt: 2 }}>No results found.</Typography>
        )}
      </Box>
    </Modal>
  );
}

export default SearchModal;
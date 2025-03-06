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
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import docService from "../../features/Documents/services/docService";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import { useTheme } from "@mui/material/styles";

interface SearchModalProps {
  open: boolean; // Properly type the `open` prop as a boolean
  handleClose: () => void; // Properly type the `handleClose` prop as a function
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
    "published.name"?: string; // Flattened key
    "published.audience"?: string[]; // Flattened key
    "published.category"?: string[]; // Flattened key
    "published.classification"?: string; // Flattened key
    "published.docstatus"?: string; // Flattened key
    "published.external"?: boolean; // Flattened key
    "published.functionsubfn"?: string[]; // Flattened key
    "published.publishdate"?: string; // Flattened key
    "published.related"?: string[]; // Flattened key
    "published.releasedate"?: string; // Flattened key
    "published.reviewdate"?: string; // Flattened key
    "published.type"?: string; // Flattened key
    "published.version"?: number; // Flattened key
    "published.verstatus"?: string; // Flattened key
  };
}

function SearchModal({ open, handleClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // State to store search results
  const navigate = useNavigate(); // Hook for navigation
  const theme = useTheme(); 

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await docService.getSearchResults(searchTerm);
      console.log("Search response:", response);

      // Assuming the response structure is { hits: { hits: [...] } }
      if (response.hits && response.hits.hits) {
        setSearchResults(response.hits.hits); // Update state with search results
      } else {
        setSearchResults([]); // Clear results if no matches found
      }
    } catch (error) {
      console.error("There was an error fetching search results:", error);
      setSearchResults([]); // Clear results on error
    }
  };

  // Handle row click to navigate to the document details page
  const handleRowClick = (type: string, id: string) => {
    navigate(`/documents/${type}/${id}`); // Navigate to the dynamic route
    handleClose(); // Close the modal after navigation
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
          width: "auto", // Increased width to accommodate the table
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
            <HelpIcon sx={{ color: theme.palette.kyoPurple.main, mr: 1 }} />{" "}
            {/* Add margin-right to the icon */}
            <Typography variant="body1" component="span">
              Will search for exact word matches in file contents of all documents
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
          <TextField
            label="Enter search term"
            value={searchTerm}
            onChange={handleSearchTermChange}
            fullWidth
            color="secondary"
            sx={{
              color: theme.palette.kyoPurple.main,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.kyoPurple.main, // Change the border color when focused
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
        {searchResults.length > 1 && (
           <Typography sx={{ mt: 2 }}>
           There were{" "}
           <span style={{ color: theme.palette.kyoPurple.main, fontWeight:"bold" }}>
             {searchResults.length} matches found
           </span>
         </Typography>
        )}
        {/* Display search results in a table */}
        {searchResults.length > 0 && (
          <TableContainer
            sx={{ mt: 4, boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)" , }}
          >
            <Table>
              <TableHead sx={{background:theme.palette.kyoPurple.main, color:'white'}}>
                <TableRow>
                  <TableCell   sx={{ color: "white", fontWeight: "bold",  }}>Document Name</TableCell>
                  <TableCell   sx={{ color: "white", fontWeight: "bold",  }}>Document Name</TableCell>
                  <TableCell   sx={{ color: "white", fontWeight: "bold",  }}>Release Date</TableCell>
                  <TableCell   sx={{ color: "white", fontWeight: "bold",  }}>Categories</TableCell>
                  <TableCell   sx={{ color: "white", fontWeight: "bold", }}>Functionsubfn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result) => (
                  <TableRow
                    key={result._id}
                    hover // Add hover effect
                    onClick={() =>
                      handleRowClick(result._source.type, result._id)
                    }
                    style={{ cursor: "pointer" }} // Change cursor to pointer
                  >
                    <TableCell>{result._source["published.name"]}</TableCell>
                    <TableCell>{result._source["published.type"]}</TableCell>
                    <TableCell>
                      {result._source["published.releasedate"]}
                    </TableCell>
                    <TableCell>
                      {result._source["published.category"]}
                    </TableCell>
                    <TableCell>
                      {result._source["published.functionsubfn"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Show a message if no results are found */}
        {searchResults.length === 0 && searchTerm && (
          <Typography sx={{ mt: 2 }}>No results found.</Typography>
        )}
      </Box>
    </Modal>
  );
}

export default SearchModal;

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
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import docService from "../../features/Documents/services/docService";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import ExpandIcon from "@mui/icons-material/OpenInFull";
import BackIcon from "@mui/icons-material/ArrowBack";
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
  const [showNoResults, setShowNoResults] = useState<boolean>(false);
  const [showEmptyFieldError, setShowEmptyFieldError] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setShowEmptyFieldError(false); // Reset error message when user types
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setShowEmptyFieldError(true); // Show error if search term is empty
      setSearchResults([]); // Clear results
      setShowNoResults(false); // Hide "No results found" message
      return; // Exit the function early
    }

    try {
      const response = await docService.getSearchResults(searchTerm);
      console.log("Search response:", response);

      if (
        response.hits &&
        response.hits.hits &&
        response.hits.hits.length > 0
      ) {
        setSearchResults(response.hits.hits); // Update search results
        setShowNoResults(false); // Hide "No results found" message
      } else {
        setSearchResults([]); // Clear results
        setShowNoResults(true); // Show "No results found" message
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]); // Clear results on error
      setShowNoResults(true); // Show "No results found" message
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  const handleRowClick = (type: string | undefined, id: string) => {
    if (type) {
      navigate(`/documents/${type}/${id}`);
      handleClose();
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleBack = () => {
    setIsExpanded(false);
  };

  const handleModalClose = () => {
    setIsExpanded(false); // Reset expanded state when modal closes
    handleClose();
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
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isExpanded ? "95%" : "80%",
          maxWidth: isExpanded ? "none" : "800px",
          height: isExpanded ? "90%" : "auto",
          maxHeight: isExpanded ? "none" : "70%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: isExpanded ? 2 : 4,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Expanded View - Table Only */}
        {isExpanded ? (
          <>
            {/* Back Button Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                pb: 1,
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <IconButton
                onClick={handleBack}
                sx={{
                  mr: 2,
                  color: theme.palette.kyoPurple.main,
                }}
              >
                <BackIcon />
              </IconButton>
              <Typography variant="h6" component="h2">
                Search Results - {searchResults.length} matches found for "{searchTerm}"
              </Typography>
            </Box>

            {/* Full Screen Table */}
            <TableContainer
              sx={{
                flex: 1,
                boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)",
                overflow: "auto",
              }}
            >
              <Table stickyHeader>
                <TableHead
                  sx={{
                    background: theme.palette.kyoPurple.main,
                    color: "white",
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: theme.palette.kyoPurple.main,
                      }}
                    >
                      Document Name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: theme.palette.kyoPurple.main,
                      }}
                    >
                      Type
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: theme.palette.kyoPurple.main,
                      }}
                    >
                      Release Date
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: theme.palette.kyoPurple.main,
                      }}
                    >
                      Categories
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: theme.palette.kyoPurple.main,
                      }}
                    >
                      Functionsubfn
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((result) => (
                    <TableRow
                      key={result._id}
                      hover
                      onClick={() =>
                        handleRowClick(
                          result._source["published.type"],
                          result._id
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        {result._source["published.name"] || "N/A"}
                      </TableCell>
                      <TableCell>
                        {result._source["published.type"] || "N/A"}
                      </TableCell>
                      <TableCell>
                        {formatDate(result._source["published.releasedate"])}
                      </TableCell>
                      <TableCell>
                        {result._source["published.category"]?.join(", ") ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        {result._source["published.functionsubfn"]?.join(
                          ", "
                        ) || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          /* Normal View - Search Form + Results */
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Search in the content of documents
            </Typography>
            <Divider />
            <Box sx={{ padding: "1em 1em 1em 0em" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HelpIcon sx={{ color: theme.palette.kyoPurple.main, mr: 1 }} />
                <Typography variant="body1" component="span">
                  Will search for exact word matches in file contents of all
                  documents
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                label="Enter search term"
                value={searchTerm}
                onChange={handleSearchTermChange}
                onKeyDown={handleKeyDown}
                fullWidth
                color="secondary"
                error={showEmptyFieldError}
                helperText={showEmptyFieldError ? "Please enter a word" : ""}
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
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    mt: 2 
                  }}
                >
                  <Typography>
                    There were{" "}
                    <span
                      style={{
                        color: theme.palette.kyoPurple.main,
                        fontWeight: "bold",
                      }}
                    >
                      {searchResults.length} matches found
                    </span>
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleExpand}
                    startIcon={<ExpandIcon />}
                    sx={{
                      color: theme.palette.kyoPurple.main,
                      borderColor: theme.palette.kyoPurple.main,
                      "&:hover": {
                        borderColor: theme.palette.kyoPurple.main,
                        backgroundColor: `${theme.palette.kyoPurple.main}10`,
                      },
                    }}
                  >
                    Expand Results
                  </Button>
                </Box>
                
                <TableContainer
                  sx={{
                    mt: 2,
                    boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)",
                    height: "calc(100% - 280px)",
                    overflow: "auto",
                  }}
                >
                  <Table stickyHeader>
                    <TableHead
                      sx={{
                        background: theme.palette.kyoPurple.main,
                        color: "white",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: theme.palette.kyoPurple.main,
                          }}
                        >
                          Document Name
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: theme.palette.kyoPurple.main,
                          }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: theme.palette.kyoPurple.main,
                          }}
                        >
                          Release Date
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: theme.palette.kyoPurple.main,
                          }}
                        >
                          Categories
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: theme.palette.kyoPurple.main,
                          }}
                        >
                          Functionsubfn
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResults.map((result) => (
                        <TableRow
                          key={result._id}
                          hover
                          onClick={() =>
                            handleRowClick(
                              result._source["published.type"],
                              result._id
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            {result._source["published.name"] || "N/A"}
                          </TableCell>
                          <TableCell>
                            {result._source["published.type"] || "N/A"}
                          </TableCell>
                          <TableCell>
                            {formatDate(result._source["published.releasedate"])}
                          </TableCell>
                          <TableCell>
                            {result._source["published.category"]?.join(", ") ||
                              "N/A"}
                          </TableCell>
                          <TableCell>
                            {result._source["published.functionsubfn"]?.join(
                              ", "
                            ) || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            
            {showNoResults && searchResults.length === 0 && (
              <Typography sx={{ mt: 2 }}>No results found.</Typography>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
}

export default SearchModal;
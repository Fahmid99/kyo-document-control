import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Document } from "../../Types/types";
import docService from "../../features/Documents/services/docService";
import {
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TableHead,
  TableContainer,
  Box,
  Button,
  Breadcrumbs,
  Link,
  Chip,
} from "@mui/material";
import {
  DocumentScanner,
  Download,
  OpenInNew,
  Home,
  Folder,
  Description,
  Article,
  Policy,
  Assignment,
  Category,
  Functions,
  CalendarToday,
} from "@mui/icons-material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function ContentViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<Document | null>(null);
  const [downloadType, setDownloadType] = useState<string>("");

  useEffect(() => {
    const getDocumentContent = async () => {
      try {
        if (!id) {
          console.error("No ID found in the URL");
          return;
        }

        // Fetch the Base64-encoded document content
        const response = await docService.getDocumentContent(id);

        // Decode the Base64 content and create a Blob URL
        const byteCharacters = atob(response.content); // Decode Base64
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" }); // Create Blob
        const url = URL.createObjectURL(blob); // Create Blob URL
        setPdfUrl(url); // Set the URL for the iframe
      } catch (error) {
        console.error(
          "There was an error fetching the document content:",
          error
        );
      }
    };

    const getDocumentById = async () => {
      try {
        if (!id) {
          console.error("No ID found in the URL");
          return;
        }

        const response = await docService.getDocumentById(id);
        console.log(response);
        if (response.data.downloadoriginalfiletype !== true) {
          setDownloadType("PDF");
        } else {
          setDownloadType("");
        }
        setDocumentData(response);
        console.log(response);
        console.log(downloadType);
      } catch (error) {
        console.log(error);
      }
    };

    getDocumentContent();
    getDocumentById();
  }, [id]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDownloadClick = async () => {
    try {
      if (!id) {
        console.error("No ID found in the URL");
        return;
      }

      const response = await docService.getDocumentDownload(id, downloadType);
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      const fileName = documentData?.name ? documentData.name : "document";
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the document:", error);
    }
  };

  const handleOpenInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  // Get appropriate icon based on document type
  const getDocumentIcon = () => {
    const type = documentData?.data.type?.toLowerCase();
    const iconProps = {
      sx: {
        fontSize: "2rem",
        padding: "8px",
        borderRadius: "8px",
        backgroundColor: "#6e3cbe",
        color: "white",
        boxShadow: "0 2px 8px rgba(110, 60, 190, 0.3)",
      },
    };

    switch (type) {
      case "policy":
        return <Policy {...iconProps} />;
      case "procedure":
        return <Assignment {...iconProps} />;
      case "form":
        return <Article {...iconProps} />;
      default:
        return <Description {...iconProps} />;
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 140px)",
        display: "flex",
        flexDirection: "row", // Changed to row layout
        gap: 2,
        padding: "8px",
      }}
    >
      {/* Left Sidebar - Header Component */}
      <Paper
        elevation={2}
        sx={{
          background:
            "linear-gradient(135deg, rgba(110, 60, 190, 0.05) 0%, rgba(110, 60, 190, 0.02) 100%)",
          borderRadius: "12px",
          padding: "16px",
          border: "1px solid rgba(110, 60, 190, 0.1)",
          width: "380px", // Fixed width for sidebar
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "auto", // Allow scrolling if content overflows
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 1 }}
        >
          <Link
            color="inherit"
            href="#"
            onClick={() => navigate("/dashboard")}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              fontSize: "0.9rem",
              "&:hover": { color: "#6e3cbe" },
            }}
          >
            <Home sx={{ mr: 0.5, fontSize: "0.9rem" }} />
            Dashboard
          </Link>
          <Link
            color="inherit"
            href="#"
            onClick={() => navigate("/documents")}
            sx={{
              textDecoration: "none",
              fontSize: "0.9rem",
              "&:hover": { color: "#6e3cbe" },
            }}
          >
            Documents
          </Link>
          <Link
            color="inherit"
            href="#"
            onClick={() =>
              navigate(`/documents/${documentData?.data.type?.toLowerCase()}`)
            }
            sx={{
              textDecoration: "none",
              fontSize: "0.9rem",
              "&:hover": { color: "#6e3cbe" },
            }}
          >
            {documentData?.data.type || "Document Type"}
          </Link>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 500,
              fontSize: "0.9rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "150px",
            }}
          >
            {documentData?.name || "Document"}
          </Typography>
        </Breadcrumbs>

        {/* Document Header */}
        <Box display="flex" alignItems="flex-start" gap={2}>
          {/* Icon */}
          <Box flexShrink={0}>{getDocumentIcon()}</Box>

          {/* Title and Type */}
          <Box flex={1} minWidth={0}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#212121",
                fontSize: "1.4rem",
                lineHeight: 1.3,
                wordBreak: "break-word",
                mb: 1.5,
              }}
            >
              {documentData?.name || "Loading..."}
            </Typography>

            {/* Document Type Badge */}
            {documentData?.data.type && (
              <Chip
                label={documentData.data.type}
                variant="outlined"
                size="medium"
                sx={{
                  backgroundColor: "rgba(110, 60, 190, 0.1)",
                  borderColor: "#6e3cbe",
                  color: "#6e3cbe",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  height: "28px",
                  mb: 2,
                }}
              />
            )}
          </Box>
        </Box>

        {/* Document Information Section */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#212121",
              fontSize: "1.1rem",
              mb: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Description sx={{ fontSize: "1.2rem", color: "#6e3cbe" }} />
            Document Information
          </Typography>

          {/* Document Details Table */}
          {documentData && (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(110, 60, 190, 0.15)",
                borderRadius: "8px",
                mb: 3,
              }}
            >
              <Table size="small">
                <TableBody>
                  {/* Categories Row */}
                  {documentData.data.category &&
                    documentData.data.category.length > 0 && (
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: "#6e3cbe",
                            backgroundColor: "rgba(110, 60, 190, 0.05)",
                            border: "none",
                            py: 1.2,
                            width: "110px",
                            fontSize: "0.9rem",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={0.7}>
                            <Category fontSize="medium" />
                            Categories
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            py: 1.2,
                          }}
                        >
                          <Box display="flex" gap={0.7} flexWrap="wrap">
                            {documentData.data.category.map((category, index) => (
                              <Chip
                                key={index}
                                label={category}
                                size="small"
                                variant="outlined"
                                sx={{
                                  height: "26px",
                                  fontSize: "0.8rem",
                                  borderColor: "rgba(110, 60, 190, 0.3)",
                                  color: "#6e3cbe",
                                  backgroundColor: "rgba(110, 60, 190, 0.05)",
                                  fontWeight: 500,
                                }}
                              />
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}

                  {/* Functions Row */}
                  {documentData.data.functionsubfn &&
                    documentData.data.functionsubfn.length > 0 && (
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: "#6e3cbe",
                            backgroundColor: "rgba(110, 60, 190, 0.05)",
                            border: "none",
                            py: 1.2,
                            width: "110px",
                            fontSize: "0.9rem",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={0.7}>
                            <Functions fontSize="medium" />
                            Functions
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            py: 1.2,
                          }}
                        >
                          <Box display="flex" gap={0.7} flexWrap="wrap">
                            {documentData.data.functionsubfn.map((func, index) => (
                              <Chip
                                key={index}
                                label={func}
                                size="small"
                                variant="outlined"
                                sx={{
                                  height: "26px",
                                  fontSize: "0.8rem",
                                  borderColor: "rgba(156, 39, 176, 0.3)",
                                  color: "#9c27b0",
                                  backgroundColor: "rgba(156, 39, 176, 0.05)",
                                  fontWeight: 500,
                                }}
                              />
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}

                  {/* Release Date Row */}
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6e3cbe",
                        backgroundColor: "rgba(110, 60, 190, 0.05)",
                        border: "none",
                        py: 1.2,
                        width: "110px",
                        fontSize: "0.9rem",
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={0.7}>
                        <CalendarToday fontSize="medium" />
                        Released
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        py: 1.2,
                      }}
                    >
                      <Chip
                        label={formatDate(documentData.data.releasedate)}
                        size="small"
                        sx={{
                          height: "26px",
                          fontSize: "0.8rem",
                          backgroundColor: "rgba(110, 60, 190, 0.1)",
                          color: "#6e3cbe",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {/* Quick Actions Section */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#212121",
              fontSize: "1.1rem",
              mb: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Download sx={{ fontSize: "1.2rem", color: "#6e3cbe" }} />
            Quick Actions
          </Typography>

          {/* Action Buttons */}
          <Box display="flex" flexDirection="column" gap={1.5}>
            <Button
              onClick={handleDownloadClick}
              variant="contained"
              startIcon={<Download />}
              fullWidth
              sx={{
                backgroundColor: "#6e3cbe",
                color: "white",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                height: "46px",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#5a2d9f",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(110, 60, 190, 0.3)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Download Document
            </Button>
            <Button
              onClick={handleOpenInNewTab}
              variant="outlined"
              startIcon={<OpenInNew />}
              fullWidth
              sx={{
                borderColor: "#6e3cbe",
                color: "#6e3cbe",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                height: "46px",
                fontSize: "1rem",
                borderWidth: "1.5px",
                "&:hover": {
                  borderColor: "#5a2d9f",
                  backgroundColor: "rgba(110, 60, 190, 0.05)",
                  borderWidth: "1.5px",
                },
              }}
            >
              Open in New Tab
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Right Side - PDF Viewer (Full Space) */}
      {pdfUrl && (
        <Box
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            flex: 1, // Takes all remaining space
            minWidth: 0, // Important for flex child
            backgroundColor: "#fff",
          }}
        >
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            title="Document Content"
            style={{ border: "none" }}
          />
        </Box>
      )}
    </Box>
  );
}

export default ContentViewPage;
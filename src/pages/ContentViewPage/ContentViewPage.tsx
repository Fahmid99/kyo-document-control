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
        fontSize: "2rem", // Slightly smaller
        padding: "8px", // Reduced padding
        borderRadius: "8px", // Smaller radius
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
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Compact Header Section */}
      <Paper
        elevation={0}
        sx={{
          background:
            "linear-gradient(135deg, rgba(110, 60, 190, 0.05) 0%, rgba(110, 60, 190, 0.02) 100%)",
          borderRadius: "12px",
          padding: "12px 20px", // Further reduced padding
          marginBottom: "8px", // Reduced margin
          border: "1px solid rgba(110, 60, 190, 0.1)",
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 1.5 }} // Removed right margin
        >
          <Link
            color="inherit"
            href="#"
            onClick={() => navigate("/dashboard")}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              fontSize: "0.875rem",
              "&:hover": { color: "#6e3cbe" },
            }}
          >
            <Home sx={{ mr: 0.5, fontSize: "0.875rem" }} />
            Dashboard
          </Link>
          <Link
            color="inherit"
            href="#"
            onClick={() => navigate("/documents")}
            sx={{
              textDecoration: "none",
              fontSize: "0.875rem",
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
              fontSize: "0.875rem",
              "&:hover": { color: "#6e3cbe" },
            }}
          >
            {documentData?.data.type || "Document Type"}
          </Link>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "200px",
            }}
          >
            {documentData?.name || "Document"}
          </Typography>
        </Breadcrumbs>

        {/* Main Header Content */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Left Side - Icon, Title and Document Details */}
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            {/* Icon */}
            <Box>{getDocumentIcon()}</Box>

            {/* Title and Document Details */}
            <Box flex={1}>
              <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                mb={1}
                flexWrap="wrap"
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#212121",
                    fontSize: "1.4rem",
                    lineHeight: 1.2,
                    wordBreak: "break-word",
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
                      fontSize: "0.875rem",
                      height: "32px",
                    }}
                  />
                )}
              </Box>

              {/* Document Details Chips + Action Buttons Row */}
              {documentData && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  {/* Left side - Document detail chips */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                  >
                    {documentData.data.category &&
                      documentData.data.category.length > 0 && (
                        <Chip
                          label={`Categories: ${documentData.data.category.join(", ")}`}
                          size="medium"
                          variant="outlined"
                          sx={{
                            color: "#6e3cbe",
                            borderColor: "#6e3cbe",
                            fontWeight: "600",
                            height: "28px",
                            fontSize: "0.8rem",
                            "& .MuiChip-label": {
                              px: 1.5,
                            },
                          }}
                        />
                      )}
                    {documentData.data.functionsubfn &&
                      documentData.data.functionsubfn.length > 0 && (
                        <Chip
                          label={`Functions: ${documentData.data.functionsubfn.join(", ")}`}
                          size="medium"
                          variant="outlined"
                          color="secondary"
                          sx={{
                            fontWeight: "600",
                            height: "28px",
                            fontSize: "0.8rem",
                            "& .MuiChip-label": {
                              px: 1.5,
                            },
                          }}
                        />
                      )}
                    <Chip
                      label={`Release Date: ${formatDate(documentData.data.releasedate)}`}
                      size="medium"
                      variant="filled"
                      sx={{
                        backgroundColor: "rgba(110, 60, 190, 0.1)",
                        color: "#6e3cbe",
                        fontWeight: "500",
                        height: "28px",
                        fontSize: "0.8rem",
                        "& .MuiChip-label": {
                          px: 1.5,
                        },
                      }}
                    />
                  </Box>

                  {/* Right side - Action Buttons */}
                  <Box display="flex" gap={1}>
                    <Button
                      onClick={handleDownloadClick}
                      variant="contained"
                      startIcon={<Download />}
                      size="small"
                      sx={{
                        backgroundColor: "#6e3cbe",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "6px",
                        textTransform: "none",
                        height: "32px",
                        fontSize: "0.875rem",
                        minWidth: "100px",
                        "&:hover": {
                          backgroundColor: "#5a2d9f",
                          transform: "translateY(-1px)",
                          boxShadow: "0 4px 12px rgba(110, 60, 190, 0.3)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      Download
                    </Button>
                    <Button
                      onClick={handleOpenInNewTab}
                      variant="outlined"
                      startIcon={<OpenInNew />}
                      size="small"
                      sx={{
                        borderColor: "#6e3cbe",
                        color: "#6e3cbe",
                        fontWeight: 600,
                        borderRadius: "6px",
                        textTransform: "none",
                        height: "32px",
                        fontSize: "0.875rem",
                        minWidth: "100px",
                        borderWidth: "1.5px",
                        "&:hover": {
                          borderColor: "#5a2d9f",
                          backgroundColor: "rgba(110, 60, 190, 0.05)",
                          borderWidth: "1.5px",
                        },
                      }}
                    >
                      New Tab
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* PDF Viewer - Takes Remaining Space */}
      {pdfUrl && (
        <Box
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            flex: 1, // Takes all remaining space
            minHeight: 0, // Important for flex child
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

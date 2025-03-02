import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";

function ContentViewPage() {
  const { id } = useParams<{ id: string }>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<Document | null>(null);
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
        setDocumentData(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getDocumentContent();
    getDocumentById();
  }, [id]);

  const handleDownloadClick = async () => {
    try {
      if (!id) {
        console.error("No ID found in the URL");
        return;
      }

      // Fetch the file from the backend
      const response = await docService.getDocumentDownload(id);

      // Create a Blob URL for the file
      const blobUrl = window.URL.createObjectURL(response.data);

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;

      // Set the filename for the download
      const fileName = documentData?.name ? documentData.name : "document";
      link.setAttribute("download", fileName);

      // Append the link to the document body (required for Firefox)
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up by removing the link and revoking the Blob URL
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

  return (
    <div>
      {/* Heading */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {documentData?.name || "No Name Available"}
        </Typography>
        <Box>
          <Button
            onClick={handleDownloadClick}
            variant="outlined"
            color="secondary"
            sx={{ borderWidth: "2px", borderColor: "#282828", marginRight: 2 }}
          >
            Download Original File
          </Button>
          <Button
            onClick={handleOpenInNewTab}
            variant="outlined"
            color="secondary"
            sx={{ borderWidth: "2px", borderColor: "#282828" }}
          >
            Open in New Tab
          </Button>
        </Box>
      </Box>
      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Table with Headers and Info */}
      <TableContainer
        sx={{
          borderBottom: "none",
          borderBottomLeftRadius: "0", // Remove bottom-left radius
          borderBottomRightRadius: "0",
        }}
      >
        <Table>
          <TableHead sx={{ background: "#6e3cbe" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Document Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Published Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Release Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Review Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Categories
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Functionsubfn
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{documentData?.name}</TableCell>
              <TableCell>{documentData?.data.type}</TableCell>
              <TableCell>{documentData?.data.publishdate}</TableCell>
              <TableCell>{documentData?.data.releasedate}</TableCell>
              <TableCell>{documentData?.data.reviewdate}</TableCell>
              <TableCell>{documentData?.data.category.join(", ")}</TableCell>
              <TableCell>
                {documentData?.data.functionsubfn.join(", ")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* PDF Viewer */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="Document Content"
        />
      )}
    </div>
  );
}

export default ContentViewPage;
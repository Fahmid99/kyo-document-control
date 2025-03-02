import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import docService from "../../features/Documents/services/docService";
import { Box, Button, Divider, Typography } from "@mui/material";
import DocumentsTable from "../../features/Documents/components/DocumentsTable"; // Import the DocumentsTable component
import Filters from "../../features/Documents/components/Filters";

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

// Mapping object to convert URL categories to document types
const categoryToTypeMap: Record<string, string> = {
  policies: "Policy", // URL category "policies" maps to document type "Policy"
  forms: "Form", // URL category "forms" maps to document type "Form"
};

function DocumentsPage() {
  const { category } = useParams<{ category?: string }>(); // Extract category from URL
  const [documents, setDocuments] = useState<Document[]>([]);
  const navigate = useNavigate();

  // Fetch documents on component mount
  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await docService.getDocuments();

        setDocuments(response); // Update the documents state
      } catch (error) {
        console.error("There was an error fetching documents:", error);
      }
    };

    const getFilterData = async () => {
      try {
        const response = await docService.getFilterData();
        console.log(response);
      } catch (error) {
        console.error("There was an error fetching filter data:", error);
      }
    };

    getDocuments();
    getFilterData();
  }, []);

  // Get the corresponding type from the mapping object
  const type = category ? categoryToTypeMap[category] : null;

  // Filter documents based on the type
  const filteredDocuments = type
    ? documents.filter((doc) => doc.data.type === type)
    : documents;

  const handleRowClick = (doc: Document) => {
    console.log("Row clicked:", doc);
    const type = doc.data.type;
    const id = doc.id;

    navigate(`/documents/${type}/${id}`);
    // Add your custom logic here
  };

  return (
    <div>
      <Box display={"flex"}>
        <Typography variant="h4" gutterBottom>
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Documents"}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ padding: "1em", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)" }}>
        <Filters />
        <DocumentsTable
          filteredDocuments={filteredDocuments}
          handleRowClick={handleRowClick}
        />
      </Box>
    </div>
  );
}

export default DocumentsPage;

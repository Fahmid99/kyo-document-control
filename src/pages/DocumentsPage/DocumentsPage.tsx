import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import docService from "../../features/Documents/services/docService";
import { Box, Divider, Typography } from "@mui/material";
import DocumentsTable from "../../features/Documents/components/DocumentsTable";
import Filters from "../../features/Documents/components/Filters";
import PolicyIcon from "@mui/icons-material/Policy";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description"; // For "All Documents"
import FolderIcon from "@mui/icons-material/Folder";

interface DocType {
  id: string;
  name: string;
}

interface DocumentsPageProps {
  docTypes: DocType[];
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ docTypes = [] }) => {
  const { category } = useParams<{ category?: string }>();
  const [documents, setDocuments] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterQuery, setFilterQuery] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to get document type(s) from URL category
  const getDocTypeFromCategory = (
    category: string
  ): string | string[] | null => {
    if (!category) return null;

    // Handle special cases first
    if (category === "policies-and-procedures") {
      return ["Policy", "Procedure"];
    }

    // Convert URL format to proper case (e.g., "work-instruction" -> "Work Instruction")
    const formattedCategory = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Find matching docType by name
    const matchingDocType = docTypes.find(
      (docType) =>
        docType.name.toLowerCase() === formattedCategory.toLowerCase()
    );

    return matchingDocType ? matchingDocType.name : null;
  };

  // Fetch documents and filter data on component mount
  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await docService.getDocuments();
        setDocuments(response);
      } catch (error) {
        console.error("There was an error fetching documents:", error);
      }
    };

    const getFilterData = async () => {
      try {
        const response = await docService.getFilterData();
        setFilterData(response);
      } catch (error) {
        console.error("There was an error fetching filter data:", error);
      }
    };

    getDocuments();
    getFilterData();
  }, []);

  const filterButtons = [
    {
      name: "Functions",
      data:
        filterData
          .find((item) => item.name === "functionsubfn")
          ?.entries.map((entry) => entry.data) || [],
      keyName: "functionsubfn",
    },
    {
      name: "Categories",
      data:
        filterData
          .find((item) => item.name === "category")
          ?.entries.map((entry) => entry.data) || [],
      keyName: "category",
    },
  ];

  const handleFilterChange = (query) => {
    setFilterQuery(query);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Get the corresponding type from docTypes array
  const type = category ? getDocTypeFromCategory(category) : null;

  console.log("Category:", category);
  console.log("Resolved type:", type);
  console.log("Available docTypes:", docTypes);

  // Filter documents based on type, category, function, and search query
  const filteredDocuments = documents.filter((doc) => {
    const matchesType = type
      ? Array.isArray(type)
        ? type.includes(doc.data.type) // Check if the document type is in the array
        : doc.data.type === type // Check if the document type matches the single type
      : true;

    // Exclude "Form" documents when the category is "policies-and-procedures"
    const excludeForms =
      category === "policies-and-procedures" && doc.data.type === "Form";

    const matchesCategory = filterQuery.category
      ? doc.data.category.some((cat) => filterQuery.category.includes(cat))
      : true;
    const matchesFunctionSubFn = filterQuery.functionsubfn
      ? doc.data.functionsubfn.some((fn) =>
          filterQuery.functionsubfn.includes(fn)
        )
      : true;
    const matchesSearch = searchQuery
      ? doc.data.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Return true only if all conditions are met and the document is not a "Form" when category is "policies-and-procedures"
    return (
      matchesType &&
      matchesCategory &&
      matchesFunctionSubFn &&
      matchesSearch &&
      !excludeForms
    );
  });

  const handleRowClick = (doc) => {
    navigate(`/documents/${doc.data.type}/${doc.id}`);
  };

  // Get display name for the page title
  const getDisplayName = (category: string): string => {
    if (category === "policies-and-procedures") {
      return "Policies & Procedures";
    }

    // Convert URL format to display format (e.g., "work-instruction" -> "Work Instruction")
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box sx={{ height: "85vh", display: "flex", flexDirection: "column" }}>
      {/* Page Title and Icon */}
      <Box display={"flex"} alignItems="center">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          fontWeight={"600"}
          color="#212121"
        >
          {category ? getDisplayName(category) : "All Documents"}
          {category === "policies-and-procedures" ? (
            <PolicyIcon
              sx={{
                fontSize: "1em",
                marginLeft: "10px",
                background: "282828",
                color: "#212121",
              }}
            />
          ) : category === "forms" ? (
            <ArticleIcon
              sx={{ fontSize: "1em", marginLeft: "10px", color: "#212121" }}
            />
          ) : (
            <FolderIcon
              sx={{
                fontSize: "1em",
                marginLeft: "10px",
                color: "#212121",
                mt: "3px",
              }}
            />
          )}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Filters and Documents Table */}
      <Box
        sx={{
          padding: "1em",
          border: "1px solid #e1e1e1",
          boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)",
          flex: 1, // Take remaining space
          display: "flex",
          flexDirection: "column",
          minHeight: 0, // Important for overflow to work
        }}
      >
        <Filters
          filterButtons={filterButtons}
          handleFilterChange={handleFilterChange}
          filterQuery={filterQuery}
          setfilterQuery={setFilterQuery}
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          documents={documents}
        />
        <DocumentsTable
          filteredDocuments={filteredDocuments}
          handleRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default DocumentsPage;

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

// Mapping object to convert URL categories to document types
const categoryToTypeMap = {
  policies: "Policy", // URL category "policies" maps to document type "Policy"
  forms: "Form", // URL category "forms" maps to document type "Form"
  procedures: "Procedure", // URL category "procedures" maps to document type "Procedure"
  "policies-and-procedures": ["Policy", "Procedure"], // Combined type for "Policies & Procedures"
};

function DocumentsPage() {
  const { category } = useParams<{ category?: string }>();
  const [documents, setDocuments] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterQuery, setFilterQuery] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  // Get the corresponding type from the mapping object
  const type = category ? categoryToTypeMap[category] : null;

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

  return (
    <div>
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
          {category
            ? category === "policies-and-procedures" // Check if category is "policies-and-procedures"
              ? "Policies & Procedures" // Display as "Policies & Procedures"
              : category.charAt(0).toUpperCase() + // Capitalize the first letter
                category.slice(1).replace(/-/g, " ") // Replace hyphens with spaces
            : "All Documents"}
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
        }}
      >
        <Filters
          filterButtons={filterButtons}
          handleFilterChange={handleFilterChange}
          filterQuery={filterQuery}
          setfilterQuery={setFilterQuery} // Ensure this matches the prop name in Filters
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          documents={documents}
        />
        <DocumentsTable
          filteredDocuments={filteredDocuments}
          handleRowClick={handleRowClick}
        />
      </Box>
    </div>
  );
}

export default DocumentsPage;

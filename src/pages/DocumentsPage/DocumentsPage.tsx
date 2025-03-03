import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import docService from "../../features/Documents/services/docService";
import { Box, Divider, Typography } from "@mui/material";
import DocumentsTable from "../../features/Documents/components/DocumentsTable";
import Filters from "../../features/Documents/components/Filters";
import PolicyIcon from "@mui/icons-material/Policy";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description"; // For "All Documents"

// Mapping object to convert URL categories to document types
const categoryToTypeMap: Record<string, string> = {
  policies: "Policy", // URL category "policies" maps to document type "Policy"
  forms: "Form", // URL category "forms" maps to document type "Form"
};

function DocumentsPage() {
  const { category } = useParams<{ category?: string }>();
  const [documents, setDocuments] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterQuery, setfilterQuery] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      name: "Categories",
      data: filterData.find((item) => item.name === "category")?.entries.map((entry) => entry.data) || [],
      keyName: "category",
    },
    {
      name: "Functionsubfn",
      data: filterData.find((item) => item.name === "functionsubfn")?.entries.map((entry) => entry.data) || [],
      keyName: "functionsubfn",
    },
  ];

  const handleFilterChange = (query) => {
    setfilterQuery(query);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Get the corresponding type from the mapping object
  const type = category ? categoryToTypeMap[category] : null;

  const filteredDocuments = documents.filter((doc) => {
    const matchesType = type ? doc.data.type === type : true; // Filter by document type based on URL category
    const matchesCategory = filterQuery.category
      ? doc.data.category.some((cat) => filterQuery.category.includes(cat))
      : true;
    const matchesFunctionSubFn = filterQuery.functionsubfn
      ? doc.data.functionsubfn.some((fn) => filterQuery.functionsubfn.includes(fn))
      : true;
    const matchesSearch = searchQuery
      ? doc.data.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesCategory && matchesFunctionSubFn && matchesSearch;
  });

  const handleRowClick = (doc) => {
    navigate(`/documents/${doc.data.type}/${doc.id}`);
  };

  return (
    <div>
      <Box display={"flex"} alignItems="center">
        <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Documents"}
          {category === "policies" ? (
            <PolicyIcon sx={{ fontSize: "1em", marginLeft: "10px" , background:"282828"}} />
          ) : category === "forms" ? (
            <ArticleIcon sx={{ fontSize: "1em", marginLeft: "10px" }} />
          ) : (
            <DescriptionIcon sx={{ fontSize: "1em", marginLeft: "10px" }} />
          )}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ padding: "1em", border: "1px solid #e1e1e1", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)" }}>
        <Filters
          filterButtons={filterButtons}
          handleFilterChange={handleFilterChange}
          filterQuery={filterQuery}
          setfilterQuery={setfilterQuery}
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />
        <DocumentsTable filteredDocuments={filteredDocuments} handleRowClick={handleRowClick} />
      </Box>
    </div>
  );
}

export default DocumentsPage;
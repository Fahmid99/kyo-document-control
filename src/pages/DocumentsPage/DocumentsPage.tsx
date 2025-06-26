import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import docService from "../../features/Documents/services/docService";
import {
  Box,
  Divider,
  Typography,
  Chip,
  Paper,
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import DocumentsTable from "../../features/Documents/components/DocumentsTable";
import Filters from "../../features/Documents/components/Filters";
import PolicyIcon from "@mui/icons-material/Policy";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandIcon from "@mui/icons-material/OpenInFull";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";

interface DocType {
  id: string;
  name: string;
}

interface DocumentsPageProps {
  docTypes: DocType[];
  documents: any[]; // Add documents prop
  totalDocumentCount: number; // Add totalDocumentCount prop
}

interface FilterEntry {
  id: string;
  data: string;
  defaultrepresentation: string;
  label: string;
  order: number;
}

interface FilterData {
  name: string;
  entries: FilterEntry[];
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ 
  docTypes = [], 
  documents = [], // Receive documents as prop
  totalDocumentCount = 0 // Receive totalDocumentCount as prop
}) => {
  const { category } = useParams<{ category?: string }>();
  // Remove local documents state - now using prop
  // const [documents, setDocuments] = useState([]);
  const [filterData, setFilterData] = useState<FilterData[]>([]);
  const [filterQuery, setFilterQuery] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();

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

  // Fetch only filter data on component mount (documents come from props)
  useEffect(() => {
    // Remove getDocuments function since documents come as props

    const getFilterData = async () => {
      try {
        const response = await docService.getFilterData();
        console.log(response);
        setFilterData(response);
      } catch (error) {
        console.error("There was an error fetching filter data:", error);
      }
    };

    // Only fetch filter data now
    getFilterData();
  }, []); // Remove documents dependency since documents come from props

  // Get the corresponding type from docTypes array
  const type = category ? getDocTypeFromCategory(category) : null;

  // First, filter documents based on type (category selection)
  const baseFilteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesType = type
        ? Array.isArray(type)
          ? type.includes(doc.data.type)
          : doc.data.type === type
        : true;

      const excludeForms =
        category === "policies-and-procedures" && doc.data.type === "Form";

      return matchesType && !excludeForms;
    });
  }, [documents, type, category]);

  // Generate filter options based on current base filtered documents
  const dynamicFilterButtons = useMemo(() => {
    if (!filterData.length || !baseFilteredDocuments.length) {
      return [];
    }

    // Get unique categories from current documents
    const availableCategories = new Set<string>();
    const availableFunctions = new Set<string>();

    baseFilteredDocuments.forEach((doc) => {
      // Add categories
      if (doc.data.category && Array.isArray(doc.data.category)) {
        doc.data.category.forEach((cat: string) => availableCategories.add(cat));
      }
      
      // Add functions
      if (doc.data.functionsubfn && Array.isArray(doc.data.functionsubfn)) {
        doc.data.functionsubfn.forEach((fn: string) => availableFunctions.add(fn));
      }
    });

    // Get full filter data for reference
    const categoryData = filterData.find((item) => item.name === "category");
    const functionData = filterData.find((item) => item.name === "functionsubfn");

    const filterButtons = [];

    // Functions filter - only show functions that exist in current documents
    if (functionData && availableFunctions.size > 0) {
      const availableFunctionList = Array.from(availableFunctions).sort();
      filterButtons.push({
        name: "Functions",
        data: availableFunctionList,
        keyName: "functionsubfn",
      });
    }

    // Categories filter - only show categories that exist in current documents
    if (categoryData && availableCategories.size > 0) {
      const availableCategoryList = Array.from(availableCategories).sort();
      filterButtons.push({
        name: "Categories", 
        data: availableCategoryList,
        keyName: "category",
      });
    }

    return filterButtons;
  }, [filterData, baseFilteredDocuments]);

  const handleFilterChange = (query) => {
    setFilterQuery(query);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleBack = () => {
    setIsExpanded(false);
  };

  // Final filtered documents (base + additional filters + search)
  const filteredDocuments = useMemo(() => {
    return baseFilteredDocuments.filter((doc) => {
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

      return matchesCategory && matchesFunctionSubFn && matchesSearch;
    });
  }, [baseFilteredDocuments, filterQuery, searchQuery]);

  const handleRowClick = (doc) => {
    navigate(`/documents/${doc.data.type}/${doc.id}`);
  };

  // Get display name for the page title
  const getDisplayName = (category: string): string => {
    if (category === "policies-and-procedures") {
      return "Policies & Procedures";
    }

    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get category description
  const getCategoryDescription = (category?: string): string => {
    if (!category)
      return "Browse and search through all available documents in the repository.";

    switch (category) {
      case "policies-and-procedures":
        return "Official policies and standard operating procedures that govern organizational operations.";
      case "form":
        return "Forms and templates for various business processes and workflows.";
      default:
        return `Documents categorized under ${getDisplayName(category)} for easy access and reference.`;
    }
  };

  // Get appropriate icon with better styling
  const getCategoryIcon = () => {
    const iconProps = {
      sx: {
        fontSize: "2.5rem",
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: theme.palette.kyoPurple?.main || "#6e3cbe",
        color: "white",
        boxShadow: `0 4px 12px ${theme.palette.kyoPurple?.main || "#6e3cbe"}4D`,
      },
    };

    if (category === "policies-and-procedures") {
      return <PolicyIcon {...iconProps} />;
    } else if (category === "form") {
      return <ArticleIcon {...iconProps} />;
    } else {
      return <FolderIcon {...iconProps} />;
    }
  };

  return (
    <>
      <Box sx={{ height: "85vh", display: "flex", flexDirection: "column" }}>
        {/* Enhanced Header Section */}
        <Paper
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.kyoPurple?.main || "#6e3cbe"}0D 0%, ${theme.palette.kyoPurple?.main || "#6e3cbe"}05 100%)`,
            borderRadius: "12px",
            padding: "1em",
            marginBottom: "16px",
            border: `1px solid ${theme.palette.kyoPurple?.main || "#6e3cbe"}1A`,
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 2 }}
          >
            <Link
              color="inherit"
              href="#"
              onClick={() => navigate("/documents")}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                "&:hover": { color: theme.palette.kyoPurple?.main || "#6e3cbe" },
              }}
            >
              <HomeIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
              Home
            </Link>
            <Link
              color="inherit"
              href="#"
              onClick={() => navigate("/documents")}
              sx={{
                textDecoration: "none",
                "&:hover": { color: theme.palette.kyoPurple?.main || "#6e3cbe" },
              }}
            >
              Documents
            </Link>
            {category && (
              <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                {getDisplayName(category)}
              </Typography>
            )}
          </Breadcrumbs>

          {/* Main Header Content */}
          <Box display="flex" alignItems="center" gap={3}>
            {/* Icon */}
            <Box>{getCategoryIcon()}</Box>

            {/* Title and Description */}
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "#212121",
                    fontSize: "1.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  {category ? getDisplayName(category) : "All Documents"}
                </Typography>

                {/* Document Count Badge */}
                <Chip
                  label={`${filteredDocuments.length} document${filteredDocuments.length !== 1 ? "s" : ""}`}
                  variant="outlined"
                  size="medium"
                  sx={{
                    backgroundColor: `${theme.palette.kyoPurple?.main || "#6e3cbe"}1A`,
                    borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
                    color: theme.palette.kyoPurple?.main || "#6e3cbe",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                />
              </Box>

              {/* Active Filters Display */}
              {(Object.keys(filterQuery).length > 0 || searchQuery) && (
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  flexWrap="wrap"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    Active filters:
                  </Typography>
                  {searchQuery && (
                    <Chip
                      label={`Search: "${searchQuery}"`}
                      size="small"
                      variant="filled"
                      color="secondary"
                      onDelete={() => setSearchQuery("")}
                    />
                  )}
                  {filterQuery.category?.map((cat) => (
                    <Chip
                      key={cat}
                      label={`Category: ${cat}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        color: theme.palette.kyoPurple?.main || "#6e3cbe",
                        borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
                        fontWeight: "600",
                      }}
                    />
                  ))}
                  {filterQuery.functionsubfn?.map((fn) => (
                    <Chip
                      key={fn}
                      label={`Function: ${fn}`}
                      size="small"
                      variant="outlined"
                      color="secondary"
                      sx={{ fontWeight: "600" }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Filters and Documents Table */}
        <Box
          sx={{
            padding: "1em",
            border: "1px solid #e1e1e1",
            boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            borderRadius: "8px",
          }}
        >
          <Filters
            filterButtons={dynamicFilterButtons}
            handleFilterChange={handleFilterChange}
            filterQuery={filterQuery}
            setfilterQuery={setFilterQuery}
            handleSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            documents={documents}
            expandButton={
              filteredDocuments.length > 0 && (
                <Button
                  variant="outlined"
                  onClick={handleExpand}
                  startIcon={<ExpandIcon />}
                  sx={{
                    borderWidth: "2px",
                    marginTop: "3px",
                    color: theme.palette.kyoPurple?.main || "#6e3cbe",
                    borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
                      backgroundColor: `${theme.palette.kyoPurple?.main || "#6e3cbe"}10`,
                    },
                  }}
                >
                  Expand Table
                </Button>
              )
            }
          />

          {/* Conditional rendering: Table OR Empty State */}
          {filteredDocuments.length > 0 ? (
            <DocumentsTable
              filteredDocuments={filteredDocuments}
              handleRowClick={handleRowClick}
            />
          ) : (
            /* Empty State Message */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                minHeight: "300px",
                textAlign: "center",
                py: 4,
              }}
            >
              <DescriptionIcon
                sx={{
                  fontSize: "4rem",
                  color: "#ccc",
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                No documents found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#999",
                  maxWidth: "400px",
                  lineHeight: 1.5,
                }}
              >
                {searchQuery || Object.keys(filterQuery).length > 0
                  ? "Try adjusting your search or filter criteria to find documents."
                  : category
                    ? `No documents are available in the ${getDisplayName(category)} category.`
                    : "No documents are available in the repository."}
              </Typography>
              {(searchQuery || Object.keys(filterQuery).length > 0) && (
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    color: theme.palette.kyoPurple?.main || "#6e3cbe",
                    borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
                    "&:hover": {
                      borderColor: theme.palette.kyoPurple?.main || "#6e3cbe",
                      backgroundColor: `${theme.palette.kyoPurple?.main || "#6e3cbe"}08`,
                    },
                  }}
                  onClick={() => {
                    setSearchQuery("");
                    setFilterQuery({});
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </Box>
          )}

          {/* Document count */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              px: 1,
            }}
          ></Box>
        </Box>
      </Box>

      {/* Expanded Table Modal */}
      <Modal
        open={isExpanded}
        onClose={handleBack}
        aria-labelledby="expanded-table-title"
        aria-describedby="expanded-table-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            height: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease-in-out",
          }}
        >
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
                color: theme.palette.kyoPurple?.main || "#6e3cbe",
              }}
            >
              <BackIcon />
            </IconButton>
            <Typography variant="h6" component="h2">
              {category ? getDisplayName(category) : "All Documents"} -{" "}
              {filteredDocuments.length} documents
            </Typography>
          </Box>

          {/* Full Screen Table with proper scrolling */}
          <Box
            sx={{
              flex: 1,
              overflow: "hidden", // Prevent overflow, force child to respect bounds
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DocumentsTable
              filteredDocuments={filteredDocuments}
              handleRowClick={handleRowClick}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DocumentsPage;
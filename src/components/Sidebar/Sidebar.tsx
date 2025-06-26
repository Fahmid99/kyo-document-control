import * as React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUp from "@mui/icons-material/KeyboardDoubleArrowUp";
import KyoLogo from "../../assets/kyocera_logo_dashboard.svg";
import HomeIcon from "@mui/icons-material/Home";
import PolicyIcon from "@mui/icons-material/Policy";
import ArticleIcon from "@mui/icons-material/Article";
import HelpIcon from "@mui/icons-material/Help";
import ProcedureIcon from "@mui/icons-material/FormatListBulleted";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button, Fade, Chip, Paper } from "@mui/material";

const drawerWidth = 260; // Reduced from 300px for more content space

// Define the docType object structure
interface DocType {
  id: string;
  name: string;
}

interface ClippedDrawerProps {
  docTypes: DocType[];
  totalDocumentCount: number;
}

interface DrawerContentProps {
  docTypes: DocType[];
  open: boolean | undefined;
  handleClick: () => void;
  totalDocumentCount: number;
}

// Enhanced style object for ListItemButton
const getListItemButtonStyles = (isParent = false, isSubItem = false) => ({
  borderRadius: isParent ? "10px" : "8px", // Slightly smaller radius
  margin: isParent ? "4px 8px" : "2px 8px", // Reduced margins
  minHeight: isParent ? "44px" : "36px", // Reduced heights
  transition: "all 0.2s ease-in-out",
  position: "relative",
  "&:hover": {
    backgroundColor: isParent
      ? "rgba(110, 60, 190, 0.08)"
      : "rgba(110, 60, 190, 0.05)",
    transform: "translateX(2px)",
    boxShadow: "0 2px 8px rgba(110, 60, 190, 0.15)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(110, 60, 190, 0.12)",
    color: "#6e3cbe",
    boxShadow: "0 2px 12px rgba(110, 60, 190, 0.2)",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: "4px",
      height: "24px",
      backgroundColor: "#6e3cbe",
      borderRadius: "0 2px 2px 0",
    },
    "& .MuiListItemIcon-root": {
      color: "#6e3cbe",
    },
    "& .MuiListItemText-primary": {
      fontWeight: 600,
    },
    "&:hover": {
      backgroundColor: "rgba(110, 60, 190, 0.15)",
    },
  },
  ...(isSubItem && {
    pl: 5, // Reduced from 6
    marginLeft: "16px", // Reduced from 24px
  }),
});

// Function to get appropriate icon for document types
const getDocTypeIcon = (docTypeName: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    Policy: <PolicyIcon />,
    Procedure: <ProcedureIcon />,
    Form: <ArticleIcon />,
    "Work Instruction": <AssignmentIcon />,
    Standard: <BusinessIcon />,
    Manual: <DescriptionIcon />,
    // Add more mappings as needed
  };

  return iconMap[docTypeName] || <DescriptionIcon />;
};

// Child component that uses useLocation
const DrawerContent: React.FC<DrawerContentProps> = ({
  open,
  handleClick,
  docTypes = [],
  totalDocumentCount = 0,
}) => {
  const location = useLocation();
  const [showAllDocTypes, setShowAllDocTypes] = React.useState(false);
  const [canScrollDown, setCanScrollDown] = React.useState(false);
  const [canScrollUp, setCanScrollUp] = React.useState(false);
  const scrollableRef = React.useRef<HTMLDivElement>(null);

  // Number of docTypes to show initially
  const INITIAL_SHOW_COUNT = 0;

  // Determine which docTypes to display
  const displayedDocTypes = showAllDocTypes
    ? docTypes
    : docTypes.slice(0, INITIAL_SHOW_COUNT);

  const hasMoreDocTypes = docTypes.length > INITIAL_SHOW_COUNT;

  // Check scroll position to show/hide scroll indicators
  const checkScrollPosition = React.useCallback(() => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 5);
      setCanScrollUp(scrollTop > 5);
    }
  }, []);

  // Set up scroll listener
  React.useEffect(() => {
    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      checkScrollPosition();
      scrollableElement.addEventListener("scroll", checkScrollPosition);

      const resizeObserver = new ResizeObserver(checkScrollPosition);
      resizeObserver.observe(scrollableElement);

      return () => {
        scrollableElement.removeEventListener("scroll", checkScrollPosition);
        resizeObserver.disconnect();
      };
    }
  }, [checkScrollPosition, showAllDocTypes, docTypes]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Navigation Header */}
      <Box
        sx={{
          p: 1.5, // Reduced padding
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#2c2c2c",
            fontSize: "1rem", // Slightly smaller
            letterSpacing: "0.5px",
          }}
        >
          Navigation
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#666",
            fontSize: "0.75rem",
            display: "block",
            mt: 0.5,
          }}
        >
          Browse document types
        </Typography>
      </Box>

      {/* Scroll Up Indicator */}
      <Fade in={canScrollUp}>
        <Box
          sx={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            height: "30px",
            background:
              "linear-gradient(to bottom, rgba(250,250,250,0.95), transparent)",
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pt: 0.5,
          }}
        >
          <KeyboardDoubleArrowUp
            sx={{
              color: "#6e3cbe",
              opacity: 0.8,
              fontSize: "18px",
            }}
          />
        </Box>
      </Fade>

      {/* Scrollable Content */}
      <Box
        ref={scrollableRef}
        sx={{
          flex: 1,
          overflow: "auto",
          position: "relative",
          pt: 1,
        }}
      >
        <List sx={{ px: 1 }}>
          {/* All Documents Section */}
          <ListItemButton
            onClick={handleClick}
            sx={getListItemButtonStyles(true)}
            component={Link}
            to="/documents"
            selected={location.pathname === "/documents"}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {" "}
              {/* Reduced from 40 */}
              <FolderIcon sx={{ fontSize: "1.2rem" }} />{" "}
              {/* Slightly smaller */}
            </ListItemIcon>
            <ListItemText
              primary="All Documents"
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem", // Slightly smaller
                  fontWeight: 500,
                },
              }}
            />
            {totalDocumentCount > 0 && (
              <Chip
                size="small"
                label={totalDocumentCount.toLocaleString()}
                sx={{
                  backgroundColor: "rgba(110, 60, 190, 0.1)",
                  color: "#6e3cbe",
                  fontSize: "0.75rem",
                  height: "20px",
                  fontWeight: 600,
                }}
              />
            )}
          </ListItemButton>

          {/* Document Categories Section */}
          <Box sx={{ mt: 1.5, mb: 0.5, px: 1.5 }}>
            {" "}
            {/* Reduced spacing and padding */}
            <Typography
              variant="caption"
              sx={{
                color: "#999",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Document Types
            </Typography>
          </Box>

          {/* Collapsible Section for Sub-Routes */}
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Combined Policies & Procedures Section */}
              <ListItemButton
                component={Link}
                to="/documents/policies-and-procedures"
                sx={getListItemButtonStyles(false, true)}
                selected={
                  location.pathname === "/documents/policies-and-procedures" ||
                  location.pathname === "/documents/policies" ||
                  location.pathname === "/documents/procedures"
                }
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PolicyIcon sx={{ fontSize: "1.1rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Policies & Procedures"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>

              {/* Forms Section */}
              <ListItemButton
                component={Link}
                to="/documents/form"
                sx={getListItemButtonStyles(false, true)}
                selected={location.pathname === "/documents/form"}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ArticleIcon sx={{ fontSize: "1.1rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Forms"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>

              {/* Dynamic Categories from docTypes */}
              {displayedDocTypes.map((docType) =>
                docType.name !== "Form" ? (
                  <ListItemButton
                    key={docType.id}
                    component={Link}
                    to={`/documents/${docType.name.toLowerCase().replace(/\s+/g, "-")}`}
                    sx={getListItemButtonStyles(false, true)}
                    selected={
                      location.pathname ===
                      `/documents/${docType.name.toLowerCase().replace(/\s+/g, "-")}`
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {React.cloneElement(getDocTypeIcon(docType.name), {
                        sx: { fontSize: "1.1rem" },
                      })}
                    </ListItemIcon>
                    <ListItemText
                      primary={docType.name}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "0.9rem",
                        },
                      }}
                    />
                  </ListItemButton>
                ) : null
              )}

              {/* Show More Button - positioned inline when collapsed */}
              {hasMoreDocTypes && !showAllDocTypes && (
                <Paper
                  elevation={0}
                  sx={{
                    mx: 2,
                    my: 1,
                    backgroundColor: "rgba(110, 60, 190, 0.04)",
                    border: "1px dashed rgba(110, 60, 190, 0.2)",
                    borderRadius: "8px",
                  }}
                >
                  <ListItemButton
                    onClick={() => setShowAllDocTypes(!showAllDocTypes)}
                    sx={{
                      borderRadius: "8px",
                      color: "#6e3cbe",
                      minHeight: "40px",
                      "&:hover": {
                        backgroundColor: "rgba(110, 60, 190, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ExpandMore
                        sx={{ color: "#6e3cbe", fontSize: "1.1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Show ${docTypes.length - INITIAL_SHOW_COUNT} More Types`}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "0.85rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </ListItemButton>
                </Paper>
              )}
            </List>
          </Collapse>

          {/* Help Section */}
          <Box sx={{ mt: 3, mb: 1, px: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#999",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Support
            </Typography>
          </Box>

          <ListItemButton
            component={Link}
            to="/help"
            sx={getListItemButtonStyles(false, true)}
            selected={location.pathname === "/help"}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <HelpIcon sx={{ fontSize: "1.1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary="Help & Support"
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                },
              }}
            />
          </ListItemButton>
        </List>

        {/* Bottom spacer */}
        <Box sx={{ height: "80px" }} />
      </Box>

      {/* Sticky Show Less Button */}
      {hasMoreDocTypes && showAllDocTypes && (
        <Paper
          elevation={3}
          sx={{
            position: "sticky",
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(255,255,255,0.98) 80%, transparent)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(110, 60, 190, 0.1)",
            pt: 2,
            pb: 2,
            mx: 1,
            borderRadius: "12px 12px 0 0",
          }}
        >
          <ListItemButton
            onClick={() => setShowAllDocTypes(!showAllDocTypes)}
            sx={{
              borderRadius: "10px",
              mx: 1,
              color: "#6e3cbe",
              backgroundColor: "rgba(110, 60, 190, 0.08)",
              border: "1px dashed  rgba(110, 60, 190, 0.2)",
              minHeight: "44px",
              "&:hover": {
                backgroundColor: "rgba(110, 60, 190, 0.12)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(110, 60, 190, 0.2)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ExpandLess sx={{ color: "#6e3cbe" }} />
            </ListItemIcon>
            <ListItemText
              primary="Show Less"
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: 600,
                  fontSize: "0.9rem",
                },
              }}
            />
          </ListItemButton>
        </Paper>
      )}

      {/* Scroll Down Indicator */}
      <Fade in={canScrollDown}>
        <Box
          sx={{
            position: "absolute",
            bottom: showAllDocTypes ? "100px" : "20px",
            left: 0,
            right: 0,
            height: "30px",
            background:
              "linear-gradient(to top, rgba(250,250,250,0.95), transparent)",
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            pb: 0.5,
          }}
        >
          <KeyboardDoubleArrowDown
            sx={{
              color: "#6e3cbe",
              opacity: 0.8,
              fontSize: "18px",
            }}
          />
        </Box>
      </Fade>
    </Box>
  );
};

const ClippedDrawer: React.FC<ClippedDrawerProps> = ({ 
  docTypes = [], 
  totalDocumentCount = 0 
}) => {
  const handleClick = () => {
    // Handle click logic if needed
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={KyoLogo}
              style={{
                width: "110px",
                filter: "brightness(1.1)",
              }}
              alt="Kyocera Logo"
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                }}
              >
                Document Repository
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.75rem",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                Lifecycle Management
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Toolbar />
        <DrawerContent
          handleClick={handleClick}
          open={undefined}
          docTypes={docTypes}
          totalDocumentCount={totalDocumentCount}
        />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default ClippedDrawer;
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
import KyoLogo from "../../assets/kyocera_logo_dashboard.svg";
import HomeIcon from "@mui/icons-material/Home";
import PolicyIcon from "@mui/icons-material/Policy";
import ArticleIcon from "@mui/icons-material/Article";
import HelpIcon from "@mui/icons-material/Help";
import ProcedureIcon from "@mui/icons-material/FormatListBulleted";
import FolderIcon from "@mui/icons-material/Folder";
import { Button } from "@mui/material";
import docService from "../../features/Documents/services/docService";

const drawerWidth = 280;

// Define the docType object structure
interface DocType {
  id: string;
  name: string;
}

interface ClippedDrawerProps {
  docTypes: DocType[];
}

interface DrawerContentProps {
  docTypes: DocType[];
  open: boolean | undefined;
  handleClick: () => void;
}

// Style object for ListItemButton
const listItemButtonStyles = {
  borderRadius: "4px",
  margin: "4px 8px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&.Mui-selected": {
    backgroundColor: "#b3e5fc",
    color: "#0A9BCD",
    "&&": {
      fontWeight: "800",
    },
    "&:hover": {
      backgroundColor: "#90caf9",
    },
    "& .MuiListItemIcon-root": {
      color: "#0A9BCD",
    },
  },
};

// Child component that uses useLocation
const DrawerContent: React.FC<DrawerContentProps> = ({
  open,
  handleClick,
  docTypes = [],
}) => {
  const location = useLocation();
  const [showAllDocTypes, setShowAllDocTypes] = React.useState(false);

  // Number of docTypes to show initially
  const INITIAL_SHOW_COUNT = 0;

  // Determine which docTypes to display
  const displayedDocTypes = showAllDocTypes
    ? docTypes
    : docTypes.slice(0, INITIAL_SHOW_COUNT);

  const hasMoreDocTypes = docTypes.length > INITIAL_SHOW_COUNT;

  // Debug: Log what we're receiving
  console.log("DrawerContent received docTypes:", docTypes);

  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {/* All Documents Section */}
        <ListItemButton
          onClick={handleClick}
          sx={listItemButtonStyles}
          component={Link}
          to="/documents"
          selected={location.pathname === "/documents"}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="All Documents" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Collapsible Section for Sub-Routes */}
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Combined Policies & Procedures Section */}
            <ListItemButton
              component={Link}
              to="/documents/policies-and-procedures"
              sx={{ ...listItemButtonStyles, pl: 4 }}
              selected={
                location.pathname === "/documents/policies-and-procedures" ||
                location.pathname === "/documents/policies" ||
                location.pathname === "/documents/procedures"
              }
            >
              <ListItemIcon>
                <PolicyIcon />
              </ListItemIcon>
              <ListItemText primary="Policies & Procedures" />
            </ListItemButton>

            {/* Forms Section */}
            <ListItemButton
              component={Link}
              to="/documents/form"
              sx={{ ...listItemButtonStyles, pl: 4 }}
              selected={location.pathname === "/documents/form"}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Form" />
            </ListItemButton>

            {/* Dynamic Categories from docTypes */}
            {displayedDocTypes.map((docType) =>
              docType.name !== "Form" ? (
                <ListItemButton
                  key={docType.id}
                  component={Link}
                  to={`/documents/${docType.name.toLowerCase().replace(/\s+/g, "-")}`}
                  sx={{ ...listItemButtonStyles, pl: 4 }}
                  selected={
                    location.pathname ===
                    `/documents/${docType.name.toLowerCase().replace(/\s+/g, "-")}`
                  }
                >
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary={docType.name} />
                </ListItemButton>
              ) : null
            )}

            {/* Show More/Show Less Button */}
            {hasMoreDocTypes && (
              <ListItemButton
                onClick={() => setShowAllDocTypes(!showAllDocTypes)}
                sx={{
                  ...listItemButtonStyles,
                  pl: 4,
                  fontStyle: "italic",
                  color: "#666",
                }}
              >
                <ListItemIcon>
                  {showAllDocTypes ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    showAllDocTypes
                      ? "Show Less"
                      : `Show More`
                  }
                />
              </ListItemButton>
            )}
          </List>
        </Collapse>

        {/* Help Section */}
        <ListItemButton
          component={Link}
          to="/help"
          sx={listItemButtonStyles}
          selected={location.pathname === "/help"}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
};

const ClippedDrawer: React.FC<ClippedDrawerProps> = ({ docTypes = [] }) => {
  const handleClick = () => {
    // Handle click logic if needed
  };

  // Debug: Log what we're receiving
  console.log("ClippedDrawer received docTypes:", docTypes);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#282828",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <img src={KyoLogo} style={{ width: "100px" }} alt="Kyocera Logo" />
          <Typography
            variant="h6"
            sx={{ marginLeft: "1em", letterSpacing: "1.5px" }}
          >
            Document Repository
          </Typography>
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
          },
        }}
      >
        <Toolbar />
        <DrawerContent
          handleClick={handleClick}
          open={undefined}
          docTypes={docTypes}
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ClippedDrawer;

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
import ProcedureIcon from '@mui/icons-material/FormatListBulleted';

const drawerWidth = 240;

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
const DrawerContent = ({ open, handleClick }) => {
  const location = useLocation();

  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {/* Home Section */}
        <ListItemButton
          component={Link}
          to="/"
          sx={listItemButtonStyles}
          selected={location.pathname === "/"}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>

        {/* All Documents Section */}
        <ListItemButton
          onClick={handleClick}
          sx={listItemButtonStyles}
          component={Link}
          to="/documents"
          selected={location.pathname.startsWith("/documents")}
        >
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="All Documents" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="/documents/policies"
              sx={{ ...listItemButtonStyles, pl: 4 }}
              selected={location.pathname === "/documents/policies"}
            >
              <ListItemIcon>
                <PolicyIcon />
              </ListItemIcon>
              <ListItemText primary="Policies" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/documents/forms"
              sx={{ ...listItemButtonStyles, pl: 4 }}
              selected={location.pathname === "/documents/forms"}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Forms" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/documents/procedures"
              sx={{ ...listItemButtonStyles, pl: 4 }}
              selected={location.pathname === "/documents/procedures"}
            >
              <ListItemIcon>
                <ProcedureIcon />
              </ListItemIcon>
              <ListItemText primary="Procedures" />
            </ListItemButton>
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

export default function ClippedDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <DrawerContent open={open} handleClick={handleClick} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet /> {/* This renders the nested route's component */}
      </Box>
    </Box>
  );
}

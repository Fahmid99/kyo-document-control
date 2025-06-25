import * as React from "react";
import {
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ExpandMore,
  Home,
  FolderOpen,
  Policy,
  Article,
  Search,
  PictureAsPdf,
  Download,
  FilterAlt,
  Email,
  Help,
  NavigateNext,
  Visibility,
  FindInPage,
} from "@mui/icons-material";

export default function HelpContent() {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | false>("navigation");

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.kyoPurple.main || '#6e3cbe'}0D 0%, ${theme.palette.kyoPurple.main || '#6e3cbe'}05 100%)`,
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          border: `1px solid ${theme.palette.kyoPurple.main || '#6e3cbe'}1A`,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Help 
            sx={{
              fontSize: "4rem",
              color: theme.palette.kyoPurple.main || '#6e3cbe',
              background: `${theme.palette.kyoPurple.main || '#6e3cbe'}1A`,
              padding: "16px",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            color: "#212121",
            mb: 2,
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}
        >
          Help Center
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: "#666",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6
          }}
        >
          Everything you need to know about navigating and using Kyocera's Document Repository
        </Typography>
        
        {/* Quick Stats */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3, flexWrap: "wrap" }}>
          <Chip 
            icon={<FolderOpen />} 
            label="All Documents" 
            variant="outlined"
            sx={{ 
              backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}1A`,
              borderColor: theme.palette.kyoPurple.main || '#6e3cbe',
              color: theme.palette.kyoPurple.main || '#6e3cbe',
              fontWeight: 600
            }}
          />
          <Chip 
            icon={<Policy />} 
            label="Policies & Procedures" 
            variant="outlined"
            sx={{ 
              backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}1A`,
              borderColor: theme.palette.kyoPurple.main || '#6e3cbe',
              color: theme.palette.kyoPurple.main || '#6e3cbe',
              fontWeight: 600
            }}
          />
          <Chip 
            icon={<Article />} 
            label="Forms & Templates" 
            variant="outlined"
            sx={{ 
              backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}1A`,
              borderColor: theme.palette.kyoPurple.main || '#6e3cbe',
              color: theme.palette.kyoPurple.main || '#6e3cbe',
              fontWeight: 600
            }}
          />
        </Box>
      </Paper>

      {/* Main Content - Accordion Style */}
      <Box sx={{ mb: 4 }}>
        {/* Navigation Section */}
        <Accordion 
          expanded={expanded === 'navigation'} 
          onChange={handleChange('navigation')}
          sx={{ 
            mb: 2, 
            borderRadius: "12px !important",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            "&:before": { display: "none" }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}0D`,
              borderRadius: "12px",
              "&.Mui-expanded": {
                borderRadius: "12px 12px 0 0"
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <NavigateNext sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe', fontSize: "1.5rem" }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                Navigating the Website
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Typography variant="body1" sx={{ mb: 3, color: "#555", fontSize: "1.1rem" }}>
              Welcome to Kyocera's Document Repository! Here's how you can navigate and find the documents you need:
            </Typography>
            
            <List>
              <ListItem sx={{ mb: 1 }}>
                <ListItemIcon>
                  <Home sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Home Dashboard"
                  secondary="Overview of available documents and quick access to frequently used sections"
                  sx={{
                    "& .MuiListItemText-primary": { fontWeight: 600, color: "#2c2c2c" },
                    "& .MuiListItemText-secondary": { color: "#666" }
                  }}
                />
              </ListItem>
              
              <ListItem sx={{ mb: 1 }}>
                <ListItemIcon>
                  <FolderOpen sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
                </ListItemIcon>
                <ListItemText
                  primary="All Documents"
                  secondary="Browse through all available documents including policies, forms, and resources"
                  sx={{
                    "& .MuiListItemText-primary": { fontWeight: 600, color: "#2c2c2c" },
                    "& .MuiListItemText-secondary": { color: "#666" }
                  }}
                />
              </ListItem>
              
              <ListItem sx={{ mb: 1 }}>
                <ListItemIcon>
                  <Policy sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Policies & Procedures"
                  secondary="Access all company policies in PDF format. Click on any policy to view or download"
                  sx={{
                    "& .MuiListItemText-primary": { fontWeight: 600, color: "#2c2c2c" },
                    "& .MuiListItemText-secondary": { color: "#666" }
                  }}
                />
              </ListItem>
              
              <ListItem sx={{ mb: 1 }}>
                <ListItemIcon>
                  <Article sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Forms & Templates"
                  secondary="Find and download forms for various processes in editable formats"
                  sx={{
                    "& .MuiListItemText-primary": { fontWeight: 600, color: "#2c2c2c" },
                    "& .MuiListItemText-secondary": { color: "#666" }
                  }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <FilterAlt sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Smart Filtering"
                  secondary="Use category and function filters to narrow down your search results"
                  sx={{
                    "& .MuiListItemText-primary": { fontWeight: 600, color: "#2c2c2c" },
                    "& .MuiListItemText-secondary": { color: "#666" }
                  }}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* PDF Viewing Section */}
        <Accordion 
          expanded={expanded === 'viewing'} 
          onChange={handleChange('viewing')}
          sx={{ 
            mb: 2, 
            borderRadius: "12px !important",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            "&:before": { display: "none" }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}0D`,
              borderRadius: "12px",
              "&.Mui-expanded": {
                borderRadius: "12px 12px 0 0"
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PictureAsPdf sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe', fontSize: "1.5rem" }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                Viewing & Downloading Documents
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              <Card sx={{ p: 2, backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}08`, border: `1px solid ${theme.palette.kyoPurple.main || '#6e3cbe'}33` }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Visibility sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Viewing PDFs
                  </Typography>
                </Box>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • Navigate to any document section
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • Click on the document to open PDF viewer
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • Use browser's built-in PDF controls
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • Click "New Tab" for fullscreen view
                    </Typography>
                  </ListItem>
                </List>
              </Card>
              
              <Card sx={{ p: 2, backgroundColor: "#2828280A", border: "1px solid #28282833" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Download sx={{ color: "#282828" }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Downloading
                  </Typography>
                </Box>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • Click the "Download" button in document viewer
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • File format controlled by administrator
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • Right-click PDF and select "Save As"
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      • Documents save with original filename
                    </Typography>
                  </ListItem>
                </List>
              </Card>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Search Section */}
        <Accordion 
          expanded={expanded === 'search'} 
          onChange={handleChange('search')}
          sx={{ 
            mb: 2, 
            borderRadius: "12px !important",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            "&:before": { display: "none" }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}0D`,
              borderRadius: "12px",
              "&.Mui-expanded": {
                borderRadius: "12px 12px 0 0"
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Search sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe', fontSize: "1.5rem" }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                Search Features
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              <Card sx={{ p: 3, backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}08`, border: `1px solid ${theme.palette.kyoPurple.main || '#6e3cbe'}33` }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Search sx={{ color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Search by Name
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                  Use the search bar to quickly find specific documents by their title or name.
                </Typography>
                <Chip 
                  label="Quick & Easy" 
                  size="small" 
                  sx={{ backgroundColor: theme.palette.kyoPurple.main || '#6e3cbe', color: "white" }}
                />
              </Card>
              
              <Card sx={{ p: 3, backgroundColor: "#2828280A", border: "1px solid #28282833" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <FindInPage sx={{ color: "#282828" }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Search by Content
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                  Search through document contents using exact word matching. Results display in a comprehensive table.
                </Typography>
                <Chip 
                  label="Advanced Search" 
                  size="small" 
                  sx={{ backgroundColor: "#282828", color: "white" }}
                />
              </Card>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Contact Support Section */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          padding: "24px",
          color: "#2c2c2c",
          textAlign: "center",
          border: `2px solid ${theme.palette.kyoPurple.main || '#6e3cbe'}`,
          backgroundColor: "white",
        }}
      >
        <Email sx={{ fontSize: "3rem", mb: 2, color: theme.palette.kyoPurple.main || '#6e3cbe' }} />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#2c2c2c" }}>
          Need Additional Help?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#666", fontSize: "1.1rem" }}>
          If you encounter any issues or bugs, our support team is here to help!
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Email />}
          href="mailto:Fahmid.Ahmed@dau.kyocera.com"
          sx={{
            borderColor: theme.palette.kyoPurple.main || '#6e3cbe',
            color: theme.palette.kyoPurple.main || '#6e3cbe',
            fontWeight: 600,
            borderRadius: "8px",
            textTransform: "none",
            padding: "12px 24px",
            fontSize: "1rem",
            borderWidth: "2px",
            "&:hover": {
              borderColor: theme.palette.kyoPurple.main || '#6e3cbe',
              backgroundColor: `${theme.palette.kyoPurple.main || '#6e3cbe'}0D`,
              borderWidth: "2px",
              transform: "translateY(-2px)",
              boxShadow: `0 8px 20px ${theme.palette.kyoPurple.main || '#6e3cbe'}33`
            },
            transition: "all 0.3s ease"
          }}
        >
          Contact Support: Fahmid.Ahmed@dau.kyocera.com
        </Button>
      </Paper>
    </Box>
  );
}
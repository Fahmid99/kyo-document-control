import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import theme from "./theme.d.ts";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "@mui/material/styles";

import HelpPage from "./pages/HelpPage/HelpPage.tsx";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage.tsx";
import ContentViewPage from "./pages/ContentViewPage/ContentViewPage.tsx";
import { useEffect, useState } from "react";
import docService from "./features/Documents/services/docService.ts";

interface DocType {
  id: string;
  name: string;
}

function App() {
  const [docTypes, setDocTypes] = useState<DocType[]>([]);

  useEffect(() => {
    const getDocTypes = async () => {
      try {
        const response = await docService.getDocTypes();
        setDocTypes(response);
      } catch (error) {
        console.error("There was an error fecthing the document types:", error);
      }
    };
    getDocTypes();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <Router>
          <Routes>
            {/* Root route with Sidebar */}
            <Route path="/" element={<Sidebar docTypes={docTypes} />}>
              <Route index element={<DocumentsPage docTypes={docTypes} />} />
              {/* Default page */}
              <Route path="help" element={<HelpPage />} />
              <Route
                path="documents"
                element={<DocumentsPage docTypes={docTypes} />}
              >
                <Route
                  path=":category"
                  element={<DocumentsPage docTypes={docTypes} />}
                />
                {/* Nested route for category */}
              </Route>
              <Route path="documents/:type/:id" element={<ContentViewPage />} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
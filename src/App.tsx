import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme.d.ts";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import TestPage from "./pages/TestPage.tsx";
import HelpPage from "./pages/HelpPage/HelpPage.tsx";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage.tsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {/* Root route with Sidebar */}
            <Route path="/" element={<Sidebar />}>
              <Route index element={<TestPage />} /> {/* Default page */}
              <Route path="help" element={<HelpPage />} />
              <Route path="documents" element={<DocumentsPage />}>
                <Route path=":category" element={<DocumentsPage />} />{" "}
                {/* Nested route for category */}
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

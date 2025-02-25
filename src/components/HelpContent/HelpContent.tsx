import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function HelpContent() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Heading */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Help Center
      </Typography>

      {/* Section 1: Navigating the Website */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Navigating the Website
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome to the Document Control website! Here’s how you can navigate and
        find the documents you need:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>1. Home:</strong> The Home page provides an overview of the
        available documents and quick access to frequently used sections.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>2. All Documents:</strong> This section contains all the
        documents available on the website. You can browse through policies,
        forms, and other resources.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>3. Policies:</strong> Access all company policies in PDF format.
        Click on a policy to view or download it.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>4. Forms:</strong> Find and download forms for various
        processes. Forms are available in PDF and editable formats.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>5. Help:</strong> If you need assistance, visit the Help section
        for guides and support.
      </Typography>

      {/* Section 2: Viewing PDFs */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Viewing PDFs
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        To view a PDF document:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        1. Navigate to the <strong>Policies</strong> or <strong>Forms</strong>{" "}
        section.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        2. Click on the document you want to view. It will open in a new tab.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        3. Use your browser’s built-in PDF viewer to read or download the
        document.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        4. If you encounter any issues, ensure your browser supports PDF viewing
        or download a PDF reader.
      </Typography>

      {/* Section 3: Additional Information */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Additional Information
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Search Functionality:</strong> Use the search bar to quickly find
        specific documents by name or keyword.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Downloading Documents:</strong> Most documents can be downloaded
        by clicking the download icon or right-clicking the PDF and selecting
        "Save As."
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Need Help?</strong> If you have any questions or need further
        assistance, please contact the support team at{" "}
        <strong>support@documentcontrol.com</strong>.
      </Typography>
    </Box>
  );
}
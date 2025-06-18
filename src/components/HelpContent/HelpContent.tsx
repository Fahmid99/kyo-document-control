import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function HelpContent() {
  return (
    <Box sx={{}}>
      {/* Heading */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Help Center
      </Typography>

      {/* Section 1: Navigating the Website */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Navigating the Website
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome to Kyocera's Document Repository website! Here’s how you can
        navigate and find the documents you need:
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
        <strong>3. Policies & Procedures:</strong> Access all company policies
        in PDF format. Click on a policy to view or download it.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>4. Forms:</strong> Find and download forms for various
        processes. Forms are available in different editable formats.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>5. Filtering:</strong> Use the filters to narrow down a search
        using the categories filter or function filters.
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
        section. Click on the document you want to view. It will navigate to the
        PDF viewer.
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        3. Use your browser’s built-in PDF viewer to read or click on "Open to
        new tab" to have a fullscreen view of the PDF.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        4. You can also download the PDF as it's original format depending on
        its configurations.
      </Typography>

      {/* Section 3: Additional Information */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Additional Information
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Search By Name:</strong> Use the search bar to quickly find
        specific documents by name.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Search By Content:</strong> Use the search by content feature to
        search through content's of documents using a exact word match. It will
        display the results in a table if any documents contain that word inside
        their content.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Downloading Documents:</strong> Most documents can be downloaded
        by clicking the download icon or right-clicking the PDF and selecting
        Save As. The document file format is controlled by the administrator.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Need Help?</strong> If you encounter any issues or bugs please
        contact the support team at{" "}
        <strong>BusinessSolutions@dau.kyocera.com</strong>.
      </Typography>
    </Box>
  );
}

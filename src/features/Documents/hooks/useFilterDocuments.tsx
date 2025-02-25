import { useState, useEffect } from "react";

interface Document {
  id: string;
  data: {
    [key: string]: unknown; // Allow any properties in the data object
  };
}


const useFilterDocuments = (initialDocuments: Document[] = [], initialCategory: string = "") => {
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(initialDocuments);
    const [category, setCategory] = useState<string>(initialCategory);
  
    // Filter documents whenever the category or documents change
    useEffect(() => {
      if (category) {
        const filtered = documents.filter((doc) => doc.data.type === category); // Exact match
        setFilteredDocuments(filtered);
      } else {
        setFilteredDocuments(documents); // Show all documents if no category is selected
      }
    }, [category, documents]);
  
    return {
      documents,
      setDocuments,
      filteredDocuments,
      category,
      setCategory,
    };
  };
  
  export default useFilterDocuments;
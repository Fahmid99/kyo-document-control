
import axios from "axios";

const getDocuments = async () => {
  try {
    const response = await axios.get(`/api/documents`);
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the documents" + error);
  }
};

const getDocumentContent = async (id: string) => {
  try {
    const response = await axios.get(`/api/documentcontent/${id}`);
    console.log(response.data);
    return response.data; // Assuming the backend returns Base64-encoded content
  } catch (error) {
    console.log("There was an error fetching the document content:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

const getDocumentById = async (id: string) => {
  try {
    const response = await axios.get(`/api/document/${id}`);
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the document data:", error);
    throw error;
  }
};

const getDocumentDownload = async (id: string, downloadType: string) => {
  try {
    const response = await axios.get(`/api/documentdownload/${id}`, {
      params: {
        type: downloadType, // Pass downloadType as a query parameter
      },
      responseType: "blob", // Treat the response as a Blob
    });
    return response;
  } catch (error) {
    console.log("There was an error downloading the document:", error);
    throw error;
  }
};

const getFilterData = async () => {
  try {
    const response = await axios.get(`/api/filterdata`);
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the filter data:", error);
    throw error;
  }
};

const getDocTypes = async () => {
  try {
    const response = await axios.get(`/api/doctypes`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the document types:", error);
    throw error;
  }
};

const getSearchResults = async (term: string) => {
  try {
    // Define the request body
    const requestBody = {
      term: term,
      types: [
        // optional: list of object types combined with OR. In the case of index data search, only one object type is allowed
        "published",
      ],
    };

    // Make the POST request with the body
    const response = await axios.post(`/api/searchresults`, requestBody);

    // Return the response data
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the search results:", error);
    throw error;
  }
};
export default {
  getDocuments: getDocuments,
  getDocumentContent: getDocumentContent,
  getDocumentById: getDocumentById,
  getDocumentDownload: getDocumentDownload,
  getFilterData: getFilterData,
  getDocTypes: getDocTypes,
  getSearchResults: getSearchResults,
};

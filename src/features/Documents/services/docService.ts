import { getFilterData } from "./../../../../server/controllers/documentController";
import axios from "axios";

const API_BASE_URL = `http://${window.location.hostname}:4001/api`;

const getDocuments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents`);
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the documents" + error);
  }
};

const getDocumentContent = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documentcontent/${id}`);
    console.log(response.data);
    return response.data; // Assuming the backend returns Base64-encoded content
  } catch (error) {
    console.log("There was an error fetching the document content:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

const getDocumentById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/document/${id}`);
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the document data:", error);
    throw error;
  }
};

const getDocumentDownload = async (id: string, downloadType: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documentdownload/${id}`, {
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
    const response = await axios.get(`${API_BASE_URL}/filterdata`);
    return response.data;
  } catch (error) {
    console.log("There was an error fetching the filter data:", error);
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
    const response = await axios.post(
      `${API_BASE_URL}/searchresults`,
      requestBody
    );

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
  getSearchResults: getSearchResults,
};

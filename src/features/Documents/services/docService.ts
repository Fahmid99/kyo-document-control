import { getFilterData } from "./../../../../server/controllers/documentController";
import axios from "axios";

const API_BASE_URL = "http://localhost:4001/api";

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

const getDocumentDownload = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documentdownload/${id}`, {
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

export default {
  getDocuments: getDocuments,
  getDocumentContent: getDocumentContent,
  getDocumentById: getDocumentById,
  getDocumentDownload: getDocumentDownload,
  getFilterData: getFilterData,
};

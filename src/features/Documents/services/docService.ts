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

export default {
  getDocuments: getDocuments,
};

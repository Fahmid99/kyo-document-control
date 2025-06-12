import axios from "axios";
import { Request, Response } from "express";

import dotenv from "dotenv";

interface Document {
  id: string;
  data: {
    [key: string]: unknown;
  };
}

const URL = "http://kdauapp05/rest-ws/service/";

dotenv.config();
const auth =
  "Basic " +
  Buffer.from(`${process.env.KEIMUSERNAME}:${process.env.PASSWORD}`).toString(
    "base64"
  );

//Get All Documents

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${URL}result/query?type=published&offset=0&limit=-1&fields=audience%2Ccategory%2Cclassification%2Cdocumentstatus%2Cexternal%2Cfunctionsubfn%2Cname%2Cpublishdate%2Creleasedate%2Creviewdate%2Ctype%2Cversion%2Cversionstatus%2Crelated&header=false&datameta=false`,
      {
        headers: {
          Authorization: auth,
        },
      }
    );

    const data = response.data.map((document: Document) => ({
      id: document.id,
      data: document.data,
    }));

    res.json(data);
  } catch (error) {
    console.log("There was an error fetching the documents" + error);
  }
};

export const getDocumentContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch the document content as binary data
    const response = await axios.get(
      `${URL}dms/${id}/content?type=sysobject&version=-1&index=0&asdownload=false&recyclebin=false&rendition=PDF`,
      {
        headers: {
          Authorization: auth,
        },
        responseType: "arraybuffer", // Treat the response as binary data
      }
    );

    // Convert the binary data to Base64
    const base64Content = Buffer.from(response.data, "binary").toString(
      "base64"
    );

    // Send the Base64-encoded content back to the client
    res.status(200).json({ content: base64Content });
  } catch (error) {
    console.error("Error fetching document content:", error);
    res.status(500).json({ message: "Failed to fetch document content" });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${URL}dms/${id}?type=sysobject&version=-1&content=true&fields=true&typemeta=false&datameta=false&form=false&audit=false&versions=false&views=false&additionalvisibility=false&qname=false&contenttext=false&recyclebin=false&contextfolder=false&attachmentinfo=false&storageinfo=false&storageinfodetails=false&extendedinfo=false&nullvalues=false`,
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    const data = { name: response.data.title, data: response.data.data };
    res.json(data);
  } catch (error) {
    console.error("Error fetching the document data:", error);
    res.status(500).json({ message: "Failed to fetch document data" });
  }
};

export const getDocumentDownload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.query;
    // Make a request to the external API
    const response = await axios.get(
      `${URL}dms/${id}/content?type=sysobject&version=-1&index=0&asdownload=true&recyclebin=false&rendition=${type}`,
      {
        headers: {
          Authorization: auth,
        },
        responseType: "stream", // Ensure the response is treated as a stream
      }
    );

    // Forward the Content-Disposition header to the client
    if (response.headers["content-disposition"]) {
      res.setHeader(
        "Content-Disposition",
        response.headers["content-disposition"]
      );
    }

    // Set the Content-Type header
    if (response.headers["content-type"]) {
      res.setHeader("Content-Type", response.headers["content-type"]);
    }

    // Stream the file data to the client
    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading the document:", error);
    res.status(500).json({ message: "Failed to download the document" });
  }
};

export const getFilterData = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${URL}system/type/name/published?elements=true&baseparameter=true&embedcs=true&_alllocales=false`,
      {
        headers: {
          Authorization: auth,
        },
      }
    );

    const resultArray = [];
    const requiredFields = { category: 0, functionsubfn: 1 };
    const elements = response.data.elements;
    for (let i = 0; i < elements.length; i++) {
      if ("codesystem" in elements[i] && elements[i].name in requiredFields) {
        resultArray.push({
          name: elements[i].name,
          entries: elements[i].codesystem.entries,
        });
      }
    }
    res.json(resultArray);
  } catch (error) {
    console.error("Error getting the filter data:", error);
    res.status(500).json({ message: "Failed to get the filter data" });
  }
};

export const getDocTypes = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${URL}system/type/name/published?elements=true&baseparameter=true&embedcs=true&_alllocales=false`,
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    const resultArray = [];
    const elements = response.data.elements;
    for (let i = 0; i < elements.length; i++) {
      if ("codesystem" in elements[i] && elements[i].name === "type") {
        const entries = elements[i].codesystem.entries;

        const result = entries.map((docType: { id: string; data: string }) => ({
          id: docType.id,
          name: docType.data,
        }));

        res.json(result);
      }
    }
  } catch (error) {
    console.error("Error getting the document types:", error);
    res.status(500).json({ message: "Failed to get the document types" });
  }
};

export const getSearchResults = async (req: Request, res: Response) => {
  try {
    // Extract the request body from the incoming request
    const requestBody = req.body;
    // Make the POST request with the body and headers
    const response = await axios.post(`http://kdauapp05/search`, requestBody, {
      headers: {
        Authorization: auth, // Assuming `auth` is defined elsewhere
      },
    });
    console.log(response.data);
    // Send the response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting the search results:", error);
    res.status(500).json({ message: "Failed to get the search results" });
  }
};

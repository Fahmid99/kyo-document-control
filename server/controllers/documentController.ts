import axios from "axios";
import { Request, Response } from "express";

import dotenv from "dotenv";

interface Document {
  id: string;
  data: {
    [key: string]: unknown;
  };
}

const URL = "http://kdaukeimsm/rest-ws/service/";

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
      `${URL}result/query?type=published&offset=0&limit=-1&fields=audience%2Ccategory%2Cclassification%2Cdocstatus%2Cexternal%2Cfunctionsubfn%2Cname%2Cpublishdate%2Creleasedate%2Creviewdate%2Ctype%2Cversion%2Cverstatus%2Crelated&header=false&datameta=false`,
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

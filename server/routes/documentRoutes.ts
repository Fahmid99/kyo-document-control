import express from "express";
import {
  getDocuments,
  getDocumentContent,
  getDocumentById,
  getDocumentDownload,
  getFilterData,
} from "../controllers/documentController";

const router = express.Router();

router.get("/documents", getDocuments);
router.get("/documentcontent/:id", getDocumentContent);
router.get("/document/:id", getDocumentById);
router.get("/documentdownload/:id", getDocumentDownload);
router.get("/filterdata", getFilterData);
export default router;

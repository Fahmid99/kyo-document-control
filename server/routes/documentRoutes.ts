import express from "express";
import {
  getDocuments,
  getDocumentContent,
  getDocumentById,
  getDocumentDownload,
  getFilterData,
  getSearchResults,
  getDocTypes,
} from "../controllers/documentController";

const router = express.Router();

router.get("/documents", getDocuments);
router.get("/documentcontent/:id", getDocumentContent);
router.get("/document/:id", getDocumentById);
router.get("/documentdownload/:id", getDocumentDownload);
router.get("/filterdata", getFilterData);
router.get("/doctypes", getDocTypes);
router.post("/searchresults", getSearchResults);
export default router;

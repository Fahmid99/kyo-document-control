import express from "express";
import { getDocuments } from "../controllers/documentController";

const router = express.Router();

router.get("/documents", getDocuments);

export default router;

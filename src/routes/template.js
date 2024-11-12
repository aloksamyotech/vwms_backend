import express from "express";
import {
  createTemplate,
  getEmailTemplate,
  getSMSTemplate,
  updateEmailTemplate,
  updateSMSTemplate,
} from "../controllers/template.js";

const router = express.Router();

router.post("/create", createTemplate);
router.get("/smstemplate/all", getSMSTemplate);
router.get("/emailtemplate/all", getEmailTemplate);
router.patch("/smstemplate/edit/:id", updateSMSTemplate);
router.patch("/emailtemplate/edit/:id", updateEmailTemplate);

export default router;

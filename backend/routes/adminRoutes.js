import express from "express";
import {
  getAdminData,
  updateAnnouncements,
  updateSocialLinks,
  updateClubInfo,
  updateContact,
  updateRulebooks,
  updateRegistration,
  uploadFile,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", getAdminData);
router.put("/announcements", updateAnnouncements);
router.put("/social-links", updateSocialLinks);
router.put("/club-info", updateClubInfo);
router.put("/contact", updateContact);
router.put("/rulebooks", updateRulebooks);
router.put("/registration", updateRegistration);
router.post("/upload", uploadFile);

export default router;

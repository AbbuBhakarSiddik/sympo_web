import Admin from "../models/AdminData.js";
import path from "path";
import multer from "multer";

export const getAdminData = async (req, res) => {
  try {
    const data = await Admin.findOne();
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update announcements
export const updateAnnouncements = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate({}, { announcements: req.body.announcements }, { new: true, upsert: true });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update social links
export const updateSocialLinks = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate({}, { socialLinks: req.body.socialLinks }, { new: true, upsert: true });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update club info
export const updateClubInfo = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate({}, { clubInfo: req.body.clubInfo }, { new: true, upsert: true });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update contact info
export const updateContact = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate({}, { contact: req.body.contact }, { new: true, upsert: true });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update rulebooks
export const updateRulebooks = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate({}, { rulebooks: req.body.rulebooks }, { new: true, upsert: true });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update registration (Google Form link)
export const updateRegistration = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate({}, { registration: req.body.registration }, { new: true, upsert: true });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// File upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage }).single("file");

export const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Upload failed" });
    res.json({ fileUrl: `/uploads/${req.file.filename}` });
  });
};

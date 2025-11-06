import Admin from "../models/AdminData.js";
import path from "path";
import multer from "multer";

// ✅ Fetch Admin Data
export const getAdminData = async (req, res) => {
  try {
    const data = await Admin.findOne();
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Announcements
export const updateAnnouncements = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      {},
      { announcements: req.body.announcements },
      { new: true, upsert: true }
    );
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🆕 Update or Add Social Links
export const updateSocialLinks = async (req, res) => {
  try {
    const { socialLinks } = req.body;

    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin data not found" });
    }

    admin.socialLinks = socialLinks; // Replace with new array
    await admin.save();

    res.status(200).json({
      message: "✅ Social links updated successfully",
      socialLinks: admin.socialLinks,
    });
  } catch (error) {
    console.error("Error updating social links:", error);
    res.status(500).json({ message: "Error updating social links", error });
  }
};



// ✅ Update Club Info
export const updateClubInfo = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      {},
      { clubInfo: req.body.clubInfo },
      { new: true, upsert: true }
    );
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Updated: Contact section (supports main contact + multiple coordinators)
export const updateContact = async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact || !contact.main) {
      return res.status(400).json({ message: "Invalid contact data" });
    }

    const admin = await Admin.findOneAndUpdate(
      {},
      {
        contact: {
          main: {
            name: contact.main.name || "",
            title: contact.main.title || "",
            number: contact.main.number || "",
          },
          coordinators:
            contact.coordinators && Array.isArray(contact.coordinators)
              ? contact.coordinators.map((c) => ({
                  name: c.name || "",
                  title: c.title || "",
                  number: c.number || "",
                }))
              : [],
        },
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "✅ Contact info updated successfully",
      contact: admin.contact,
    });
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ message: "Failed to update contact" });
  }
};

// ✅ Update Rulebooks
export const updateRulebooks = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      {},
      { rulebooks: req.body.rulebooks },
      { new: true, upsert: true }
    );
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Registration
export const updateRegistration = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      {},
      { registration: req.body.registration },
      { new: true, upsert: true }
    );
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ File Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage }).single("file");

export const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Upload failed" });
    res.json({ fileUrl: `/uploads/${req.file.filename}` });
  });
};

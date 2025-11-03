import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  announcements: [String],
  rulebooks: {
    symposium: String,
    quiz: String,
    hackathon: String,
    model: String,
  },
  registration: {
    googleFormLink: String,
  },
  socialLinks: {
    instagram: String,
    youtube: String,
    linkedin: String,
    twitter: String,
  },
  clubInfo: {
    name: String,
    logoUrl: String,
  },
  contact: {
    email: String,
    phone: String,
  },
});

export default mongoose.model("Admin", AdminSchema);

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
  socialLinks: 
  {
    platform: String, // e.g., "Instagram"
    username: String, // e.g., "@club_official"
    url: String,      // e.g., "https://instagram.com/club_official"
  },

  clubInfo: {
    name: String,
    logoUrl: String,
  },

  // ✅ Updated contact section
  contact: {
    main: {
      name: String,
      title: String,
      number: String,
    },
    coordinators: [
      {
        name: String,
        title: String,
        number: String,
      },
    ],
  },
});

export default mongoose.model("Admin", AdminSchema);

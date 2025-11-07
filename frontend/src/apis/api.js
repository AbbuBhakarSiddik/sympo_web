import axios from "axios";

// 🌍 Base URL configuration
// Automatically switches between deployed backend and local dev server
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://sympo-web-backend.onrender.com", // 🌐 replace with your actual deployed backend URL
});

// ✅ Admin-related API calls
export const getAdminData = () => API.get("/api/admin");
export const updateAnnouncements = (announcements) =>
  API.put("/api/admin/announcements", { announcements });
export const updateRulebooks = (rulebooks) =>
  API.put("/api/admin/rulebooks", { rulebooks });
export const updateRegistration = (registration) =>
  API.put("/api/admin/registration", { registration });
export const updateSocialLinks = (socialLinks) =>
  API.put("/api/admin/social-links", { socialLinks });
export const updateContact = (contact) =>
  API.put("/api/admin/contact", { contact });

// ✅ Contact-related API
export const getContactInfo = () => API.get("/api/admin");

// Export default axios instance for flexible use
export default API;

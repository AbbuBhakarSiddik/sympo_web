// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

const API_BASE_URL = "https://sympo-backend-tbaz.onrender.com/api/admin";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [rulebooks, setRulebooks] = useState({});
  const [registrationLink, setRegistrationLink] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [contact, setContact] = useState({
    main: { name: "", title: "", number: "" },
    coordinators: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}`);
      const data = res.data || {};
      setAnnouncements(data.announcements || []);
      setRulebooks(data.rulebooks || {});
      setRegistrationLink(data.registration?.googleFormLink || "");
      setSocialLinks(data.socialLinks || []);
      setContact(
        data.contact || { main: { name: "", title: "", number: "" }, coordinators: [] }
      );
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveAnnouncements = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/announcements`, { announcements });
      alert("✅ Announcements updated!");
    } catch {
      alert("Failed to save announcements.");
    } finally {
      setLoading(false);
    }
  };

  const saveRulebooks = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/rulebooks`, { rulebooks });
      alert("✅ Rulebooks updated!");
    } catch {
      alert("Failed to save rulebooks.");
    } finally {
      setLoading(false);
    }
  };

  const saveRegistration = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/registration`, {
        registration: { googleFormLink: registrationLink },
      });
      alert("✅ Registration link updated!");
    } catch {
      alert("Failed to save registration link.");
    } finally {
      setLoading(false);
    }
  };

  const saveSocialLinks = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/social-links`, { socialLinks });
      alert("✅ Social media links updated!");
    } catch {
      alert("Failed to save social media links.");
    } finally {
      setLoading(false);
    }
  };

  const saveContact = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/contact`, { contact });
      alert("✅ Contact info updated!");
    } catch {
      alert("Failed to save contact info.");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete specific coordinator
  const deleteCoordinator = async (index) => {
    if (!window.confirm("Delete this coordinator?")) return;
    try {
      const newList = contact.coordinators.filter((_, i) => i !== index);
      const updatedContact = { ...contact, coordinators: newList };
      setContact(updatedContact);
      await axios.put(`${API_BASE_URL}/contact`, { contact: updatedContact });
      alert("❌ Coordinator deleted successfully!");
    } catch {
      alert("Failed to delete coordinator.");
    }
  };

  // 🗑️ Delete main contact only
  const deleteMainContact = async () => {
    if (!window.confirm("Delete main contact info?")) return;
    try {
      const updatedContact = { ...contact, main: { name: "", title: "", number: "" } };
      setContact(updatedContact);
      await axios.put(`${API_BASE_URL}/contact`, { contact: updatedContact });
      alert("❌ Main contact deleted successfully!");
    } catch {
      alert("Failed to delete main contact.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#d32f2f" }}>
        Admin Dashboard
      </Typography>

      <Tabs value={tab} onChange={(e, val) => setTab(val)}>
        <Tab label="Announcements" />
        <Tab label="Rulebooks" />
        <Tab label="Registration" />
        <Tab label="Social Links" />
        <Tab label="Contact Info" />
      </Tabs>

      {loading && <CircularProgress sx={{ mt: 3 }} />}

      {/* Announcements */}
      {tab === 0 && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Typography variant="h6">Announcements</Typography>
          {announcements.map((note, i) => (
            <TextField
              key={i}
              fullWidth
              label={`Announcement ${i + 1}`}
              value={note}
              onChange={(e) => {
                const newNotes = [...announcements];
                newNotes[i] = e.target.value;
                setAnnouncements(newNotes);
              }}
            />
          ))}
          <Button onClick={() => setAnnouncements([...announcements, ""])}>+ Add</Button>
          <Button variant="contained" onClick={saveAnnouncements}>
            Save
          </Button>
        </Stack>
      )}

      {/* Rulebooks */}
      {tab === 1 && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Typography variant="h6">Rulebook Links (URLs)</Typography>
          {["symposium", "quiz", "hackathon", "model"].map((key) => (
            <TextField
              key={key}
              fullWidth
              label={`${key.charAt(0).toUpperCase() + key.slice(1)} Rulebook URL`}
              value={rulebooks[key] || ""}
              onChange={(e) => setRulebooks({ ...rulebooks, [key]: e.target.value })}
            />
          ))}
          <Button variant="contained" onClick={saveRulebooks}>
            Save Rulebooks
          </Button>
        </Stack>
      )}

      {/* Registration */}
      {tab === 2 && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Typography variant="h6">Google Form Registration Link</Typography>
          <TextField
            label="Google Form Link"
            fullWidth
            value={registrationLink}
            onChange={(e) => setRegistrationLink(e.target.value)}
          />
          <Button variant="contained" onClick={saveRegistration}>
            Save Link
          </Button>
        </Stack>
      )}

      {/* Social Links */}
      {tab === 3 && (
        <Stack spacing={3} sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Social Media Links
          </Typography>

          {socialLinks.map((link, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              <TextField
                label="Platform"
                fullWidth
                value={link.platform}
                onChange={(e) => {
                  const updated = [...socialLinks];
                  updated[index].platform = e.target.value;
                  setSocialLinks(updated);
                }}
              />
              <TextField
                label="Username"
                fullWidth
                value={link.username}
                onChange={(e) => {
                  const updated = [...socialLinks];
                  updated[index].username = e.target.value;
                  setSocialLinks(updated);
                }}
              />
              <TextField
                label="Profile URL"
                fullWidth
                value={link.url}
                onChange={(e) => {
                  const updated = [...socialLinks];
                  updated[index].url = e.target.value;
                  setSocialLinks(updated);
                }}
              />
              <IconButton
                color="error"
                onClick={() => {
                  const updated = socialLinks.filter((_, i) => i !== index);
                  setSocialLinks(updated);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          <Button
            variant="outlined"
            onClick={() =>
              setSocialLinks([...socialLinks, { platform: "", username: "", url: "" }])
            }
          >
            + Add Social Media
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={saveSocialLinks}
            sx={{ width: "200px" }}
          >
            Save Social Links
          </Button>
        </Stack>
      )}

      {/* Contact Info */}
      {tab === 4 && (
        <Stack spacing={3} sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Main Contact
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Name"
              fullWidth
              value={contact.main?.name || ""}
              onChange={(e) =>
                setContact({ ...contact, main: { ...contact.main, name: e.target.value } })
              }
            />
            <TextField
              label="Title"
              fullWidth
              value={contact.main?.title || ""}
              onChange={(e) =>
                setContact({ ...contact, main: { ...contact.main, title: e.target.value } })
              }
            />
            <TextField
              label="Number"
              fullWidth
              value={contact.main?.number || ""}
              onChange={(e) =>
                setContact({ ...contact, main: { ...contact.main, number: e.target.value } })
              }
            />
            <IconButton color="error" onClick={deleteMainContact}>
              <DeleteIcon />
            </IconButton>
          </Stack>

          <Button variant="contained" color="primary" onClick={saveContact} sx={{ width: "200px" }}>
            Save Main Contact
          </Button>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
            Coordinators
          </Typography>

          {contact.coordinators?.map((coord, i) => (
            <Stack direction="row" spacing={2} key={i} alignItems="center">
              <TextField
                label="Name"
                fullWidth
                value={coord.name}
                onChange={(e) => {
                  const newList = [...contact.coordinators];
                  newList[i].name = e.target.value;
                  setContact({ ...contact, coordinators: newList });
                }}
              />
              <TextField
                label="Title"
                fullWidth
                value={coord.title}
                onChange={(e) => {
                  const newList = [...contact.coordinators];
                  newList[i].title = e.target.value;
                  setContact({ ...contact, coordinators: newList });
                }}
              />
              <TextField
                label="Number"
                fullWidth
                value={coord.number}
                onChange={(e) => {
                  const newList = [...contact.coordinators];
                  newList[i].number = e.target.value;
                  setContact({ ...contact, coordinators: newList });
                }}
              />
              <IconButton color="error" onClick={() => deleteCoordinator(i)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() =>
                setContact({
                  ...contact,
                  coordinators: [
                    ...contact.coordinators,
                    { name: "", title: "", number: "" },
                  ],
                })
              }
            >
              + Add Coordinator
            </Button>
            <Button variant="contained" color="success" onClick={saveContact}>
              Save All Contacts
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default AdminDashboard;

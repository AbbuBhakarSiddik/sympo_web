import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

// ✅ Logos
import CollegeLogo from "../assets/CLG_LOGO.png";
import ClubLogo from "../assets/clublogo.png";
import SymposiumLogo from "../assets/SYMPO.jpg";

const Home = () => {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://sympo-backend-tbaz.onrender.com/api/admin")
      .then((res) => setAdminData(res.data))
      .catch((err) => console.error("Error fetching admin data:", err));
  }, []);

  const options = [
    {
      title: "Register Now",
      description:
        "Join the Innovation Ignite Symposium using the official Google Form.",
      viewLink: adminData?.registration?.googleFormLink || "",
    },
    {
      title: "Symposium Rulebook",
      description: "Access symposium rules and guidelines.",
      viewLink: adminData?.rulebooks?.symposium,
      downloadLink: adminData?.rulebooks?.symposium,
    },
    {
      title: "Quiz Competition",
      description: "Quiz competition rules and instructions.",
      viewLink: adminData?.rulebooks?.quiz,
      downloadLink: adminData?.rulebooks?.quiz,
    },
    {
      title: "Mini Hackathon",
      description: "Hackathon rulebook and guidelines.",
      viewLink: adminData?.rulebooks?.hackathon,
      downloadLink: adminData?.rulebooks?.hackathon,
    },
    {
      title: "Model Presentation",
      description: "Model presentation event rules.",
      viewLink: adminData?.rulebooks?.model,
      downloadLink: adminData?.rulebooks?.model,
    },
  ];

  // 🧩 Social Media Icons Map
  const iconMap = {
    Instagram: <InstagramIcon sx={{ color: "#E4405F", fontSize: 35 }} />,
    YouTube: <YouTubeIcon sx={{ color: "#FF0000", fontSize: 35 }} />,
    LinkedIn: <LinkedInIcon sx={{ color: "#0077B5", fontSize: 35 }} />,
    Twitter: <TwitterIcon sx={{ color: "#1DA1F2", fontSize: 35 }} />,
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0a0d12",
        color: "#fff",
        minHeight: "100vh",
        pb: 5,
      }}
    >
      {/* 🔹 College Header */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0f131a",
          borderBottom: "1px solid #1c1f24",
          py: 1,
          boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <img
            src={CollegeLogo}
            alt="College Logo"
            style={{
              maxHeight: "70px",
              width: "auto",
              borderRadius: "8px",
            }}
          />
        </Toolbar>
      </AppBar>

      {/* 🔹 Admin Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pr: 3,
          mt: 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AdminPanelSettingsIcon />}
          sx={{
            backgroundColor: "#1e88e5",
            "&:hover": { backgroundColor: "#1565c0" },
            fontWeight: 600,
          }}
          onClick={() => navigate("/admin")}
        >
          Admin Panel
        </Button>
      </Box>

      {/* 🔹 Logos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 4,
        }}
      >
        <img
          src={ClubLogo}
          alt="Club Logo"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        />
        <img
          src={SymposiumLogo}
          alt="Symposium Logo"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        />
      </Box>

      {/* 🔹 Symposium Name */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "700",
            background: "linear-gradient(90deg, #4FC3F7, #81D4FA, #29B6F6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          Innovation Ignite Symposium
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#b0bec5",
            mt: 1,
            fontStyle: "italic",
          }}
        >
          A National Level Technical Symposium
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#b0bec5",
            mt: 1,
            fontStyle: "italic",
          }}
        >
          ⚠️ Please wait 30–45 seconds for the website to fully load.
        </Typography>
      </Box>

      {/* 🔹 Announcements */}
      <Container sx={{ mt: 6, mb: 6 }}>
        <Box
          sx={{
            backgroundColor: "#111820",
            borderRadius: "12px",
            p: 3,
            boxShadow: "0 0 15px rgba(0,0,0,0.6)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "600",
              color: "#4FC3F7",
            }}
          >
            📢 Announcements
          </Typography>
          <Stack spacing={1}>
            {adminData?.announcements?.length > 0 ? (
              adminData.announcements.map((note, i) => (
                <Typography key={i} variant="body1">
                  • {note}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="#888">
                No announcements yet. Stay tuned!
              </Typography>
            )}
          </Stack>
        </Box>
      </Container>

      {/* 🔹 Event Options */}
      <Container sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          {options.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    backgroundColor: "#16222f",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                    "&:hover": { transform: "scale(1.03)" },
                    transition: "0.3s",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "600", color: "#4FC3F7", mb: 1 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#ccc", mb: 2 }}
                    >
                      {item.description}
                    </Typography>

                    <Stack direction="row" spacing={2}>
                      {item.viewLink && (
                        <Button
                          variant="contained"
                          startIcon={<VisibilityIcon />}
                          href={item.viewLink}
                          target="_blank"
                          sx={{
                            backgroundColor: "#1e88e5",
                            "&:hover": { backgroundColor: "#1565c0" },
                          }}
                        >
                          View
                        </Button>
                      )}
                      {item.downloadLink && (
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          href={item.downloadLink}
                          target="_blank"
                          sx={{
                            borderColor: "#4FC3F7",
                            color: "#4FC3F7",
                            "&:hover": {
                              borderColor: "#81D4FA",
                              color: "#81D4FA",
                            },
                          }}
                        >
                          Download
                        </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 🔹 Social Media Section */}
      {adminData?.socialLinks?.length > 0 && (
        <Container sx={{ mb: 8 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#4FC3F7",
              fontWeight: "600",
              textAlign: "center",
              mb: 3,
            }}
          >
            🌐 Follow Us on Social Media
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {adminData.socialLinks.map((link, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#16222f",
                      borderRadius: "16px",
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                      textAlign: "center",
                      p: 2,
                      "&:hover": {
                        transform: "scale(1.03)",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 1 }}>
                        {iconMap[link.platform] || (
                          <Typography sx={{ color: "#81D4FA" }}>🔗</Typography>
                        )}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ color: "#81D4FA", fontWeight: "600", mb: 1 }}
                      >
                        {link.platform}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#b0bec5",
                          mb: 1,
                          wordWrap: "break-word",
                        }}
                      >
                        {link.username ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#4FC3F7",
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            {link.username}
                          </a>
                        ) : (
                          "Not Available"
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* 🔹 Contact Section */}
      <Box
        sx={{
          backgroundColor: "#0f131a",
          py: 6,
          textAlign: "center",
          borderTop: "1px solid #1e1e1e",
        }}
      >
        <Typography variant="h5" sx={{ color: "#4FC3F7", mb: 1 }}>
          📞 Contact Us
        </Typography>
        <Typography variant="body1" sx={{ color: "#aaa", mb: 2 }}>
          Got questions? Reach out to our symposium team for details.
        </Typography>
        
        <Typography
          variant="body2"
          sx={{ color: "#666", mt: 4, fontSize: "0.8rem" }}
        >
          © 2025 Innovation Ignite Symposium | Developed by Creative Codex Club SIET
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;

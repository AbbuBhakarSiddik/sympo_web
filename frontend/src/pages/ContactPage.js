// src/pages/ContactPage.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Stack } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

const ContactPage = () => {
  const [contact, setContact] = useState({
    main: { name: "", title: "", number: "" },
    coordinators: [],
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // 🔗 Updated backend URL
        const res = await axios.get(
          "https://sympo-backend.onrender.com/api/admin"
        );
        const data = res.data?.contact || {};
        setContact({
          main: data.main || { name: "", title: "", number: "" },
          coordinators: data.coordinators || [],
        });
      } catch (err) {
        console.error("❌ Error fetching contact data:", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 8 },
        background: "linear-gradient(135deg, #fce4ec, #f3e5f5)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        Contact Us
      </Typography>

      {/* Main Contact */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          mt: 5,
          mb: 6,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            bgcolor: "#1976d2",
            mb: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 50 }} />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          {contact.main.name || "Main Contact Name"}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {contact.main.title || "Title / Role"}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          mt={1}
        >
          <PhoneIcon fontSize="small" color="primary" />
          <Typography variant="body1">
            {contact.main.number || "N/A"}
          </Typography>
        </Stack>
      </Box>

      {/* Coordinators Section */}
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 3, fontWeight: "bold", color: "#6a1b9a" }}
      >
        Coordinators
      </Typography>

      <Grid container spacing={3}>
        {contact.coordinators.length > 0 ? (
          contact.coordinators.map((coord, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 4,
                    background: "white",
                    textAlign: "center",
                    py: 3,
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "auto",
                        bgcolor: "#9c27b0",
                        mb: 2,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {coord.name || "Coordinator Name"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {coord.title || "Role"}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                      mt={1}
                    >
                      <PhoneIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {coord.number || "N/A"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography
            align="center"
            sx={{ width: "100%", color: "text.secondary" }}
          >
            No coordinator contacts available yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ContactPage;

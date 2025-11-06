import React, { useState } from "react";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Admin.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminPassword = "codex19"; // Change this later for real deployment

  const handleLogin = () => {
    if (password === adminPassword) {
      sessionStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="admin-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="admin-card">
          <CardContent>
            <Typography variant="h4" gutterBottom>
              🔐 Admin Login
            </Typography>
            <TextField
              type="password"
              label="Enter Admin Password"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

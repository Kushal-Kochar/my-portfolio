import React from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log(
      "Theme toggle clicked! Current mode:",
      isDarkMode ? "dark" : "light"
    );
    toggleTheme();
    console.log("Theme should now be:", !isDarkMode ? "dark" : "light");
  };

  return (
    <div>
      <motion.button
        className="theme-toggle"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={false}
        transition={{ duration: 0.3 }}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        style={{
          backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
          border: `3px solid ${isDarkMode ? "#4f46e5" : "#6366f1"}`,
          color: isDarkMode ? "#f8fafc" : "#1e293b",
        }}
      >
        <motion.div
          className="theme-toggle-icon"
          animate={{
            rotate: isDarkMode ? 360 : 0,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 0.5 },
            scale: { duration: 0.3 },
          }}
        >
          {isDarkMode ? (
            <FaMoon className="moon-icon" style={{ color: "#6366f1" }} />
          ) : (
            <FaSun className="sun-icon" style={{ color: "#f59e0b" }} />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;

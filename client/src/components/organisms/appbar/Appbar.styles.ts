import type { TStyle } from "@/interfaces/common/styles";

const useStyle = (): TStyle => {
  return {
    appbar: {
      backgroundColor: "#1976d2",
      padding: "12px 16px",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    navItems: {
      display: { xs: "none", md: "flex" },
      alignItems: "center",
      gap: "24px",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      padding: "8px 16px",
      borderRadius: "8px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transform: "translateY(-1px)",
      },
    },
    navItemActive: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      padding: "8px 16px",
      borderRadius: "8px",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    },
    navText: {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 500,
    },
    navTextActive: {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 600,
    },
    icon: {
      color: "#ffffff",
      fontSize: "20px",
    },
    notificationBadge: {
      position: "relative",
    },
    badge: {
      position: "absolute",
      top: "-6px",
      right: "-6px",
      backgroundColor: "#f44336",
      color: "#ffffff",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      fontWeight: 700,
      border: "2px solid #1976d2",
      boxSizing: "border-box",
    },
    hamburgerMenu: {
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      gap: "3px",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "6px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
    hamburgerLine: {
      width: "22px",
      height: "3px",
      backgroundColor: "#ffffff",
      borderRadius: "2px",
    },
  };
};

export default useStyle;

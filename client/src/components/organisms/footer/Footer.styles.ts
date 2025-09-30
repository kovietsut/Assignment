import type { TStyle } from "@/interfaces/common/styles";

const useStyle = (): TStyle => {
  return {
    footer: {
      backgroundColor: "#1976d2",
      padding: "24px 0px",
      width: "100%",
      position: "fixed",
      bottom: 0,
      left: 0,
      zIndex: 1000,
      minHeight: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
    },
    footerContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      textAlign: "center",
      width: "100%",
    },
    linksContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "24px",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: 500,
      whiteSpace: "nowrap",
      padding: "4px 8px",
      borderRadius: "4px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        color: "#ffffff",
        textDecoration: "underline",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
    copyright: {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 500,
      margin: 0,
    },
  };
};

export default useStyle;

import type { TStyle } from "@/interfaces/common/styles";

const useStyle = (): TStyle => {
  return {
    container: {
      py: 4,
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "400px",
    },
    errorAlert: {
      mb: 3,
    },
    headerContainer: {
      display: "flex",
      alignItems: "center",
      mb: 3,
    },
    backButton: {
      mr: 2,
    },
    title: {
      fontWeight: 600,
    },
    paper: {
      p: 4,
    },
    statusContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      mb: 3,
    },
    chip: {
      mb: 2,
      fontSize: "1rem",
      height: "32px",
    },
    description: {
      mb: 3,
    },
    divider: {
      my: 3,
    },
    sectionContainer: {
      mb: 3,
    },
    assigneeDisplayContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    assigneeInfoContainer: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      width: 40,
      height: 40,
      mr: 2,
      bgcolor: "primary.main",
    },
    assignActionsContainer: {
      direction: "row",
      spacing: 2,
      alignItems: "center",
    },
    formControl: {
      minWidth: 200,
    },
    actionsContainer: {
      direction: "row",
      spacing: 2,
    },
  };
};

export default useStyle;

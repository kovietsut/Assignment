import type { TStyle } from "@/interfaces/common/styles";

const useStyle = (): TStyle => {
  return {
    card: {
      mb: 2,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: 3,
      },
    },
    titleContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      mb: 1,
    },
    title: {
      fontWeight: 600,
    },
    chip: {
      ml: 1,
    },
    description: {
      mb: 2,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    assigneeContainer: {
      display: "flex",
      alignItems: "center",
      mt: 1,
    },
    avatar: {
      width: 24,
      height: 24,
      fontSize: "0.75rem",
      mr: 1,
      bgcolor: "primary.main",
    },
    cardActions: {
      px: 2,
      pb: 2,
    },
    actionsContainer: {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
    viewDetailsButton: {
      ml: "auto",
    },
  };
};

export default useStyle;

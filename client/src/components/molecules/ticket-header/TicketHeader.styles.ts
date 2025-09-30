import type { TStyle } from "@/interfaces/common/styles";

const useStyle = (): TStyle => {
  return {
    container: {
      mb: 3,
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2,
      mb: 2,
    },
    title: {
      fontWeight: 600,
      mb: 0.5,
    },
    addButton: {
      borderRadius: 2,
      textTransform: "none",
      fontWeight: 600,
    },
    filtersContainer: {
      direction: "row",
      spacing: 2,
      alignItems: "center",
    },
  };
};

export default useStyle;

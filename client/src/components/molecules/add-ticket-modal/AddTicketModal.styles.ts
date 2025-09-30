import type { TStyle } from "@/interfaces/common/styles";

const useStyle = (): TStyle => {
  return {
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      pt: 1,
    },
  };
};

export default useStyle;

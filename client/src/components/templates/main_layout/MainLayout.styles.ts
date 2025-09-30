import type { TStyle } from "@/interfaces/common/styles";

const useStyle = (): TStyle => {
  return {
    outletContainer: {
      overflow: "auto",
      marginTop: "64px",
      marginBottom: "128px",
      height: "calc(100vh - 64px - 128px)",
      width: "100%",
      position: "relative",
      padding: "0 16px",
    },
  };
};

export default useStyle;

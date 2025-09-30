import { Appbar } from "@/components/organisms/appbar/Appbar";
import { Footer } from "@/components/organisms/footer/Footer";
import { Outlet } from "react-router-dom";
import useStyle from "./MainLayout.styles";
import { Box } from "@mui/material";

const MainLayout = () => {
  const styles = useStyle();
  return (
    <>
      <Appbar />
      <Box sx={styles.outletContainer}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;

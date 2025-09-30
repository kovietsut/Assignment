import { Box, Typography } from "@mui/material";
import Iconify from "@/components/atoms/Iconify";
import useStyle from "./Appbar.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH } from "@/routes/path";

export const Appbar = () => {
  const styles = useStyle();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <Box sx={styles.appbar}>
      <Box sx={styles.container}>
        <Box sx={styles.navItems}>
          <Box 
            sx={isActive(PATH.tickets.list) ? styles.navItemActive : styles.navItem}
            onClick={() => navigate(PATH.tickets.list)}
          >
            <Iconify icon="mdi:ticket" sx={styles.icon} />
            <Typography sx={isActive(PATH.tickets.list) ? styles.navTextActive : styles.navText}>
              All Tickets
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.hamburgerMenu}>
          <Iconify icon="mdi:menu" sx={styles.icon} />
        </Box>
      </Box>
    </Box>
  );
};

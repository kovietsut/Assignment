import { Box, Typography, Avatar } from "@mui/material";
import Iconify from "@/components/atoms/Iconify";
import useStyle from "./Appbar.styles";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes/path";

export const Appbar = () => {
  const styles = useStyle();
  const navigate = useNavigate();

  return (
    <Box sx={styles.appbar}>
      <Box sx={styles.container}>
        {/* Left: App Title */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate(PATH.tickets.list)}
        >
          <Iconify icon="mdi:ticket" sx={{ mr: 1, fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "inherit" }}>
            Ticket Manager
          </Typography>
        </Box>

        {/* Right: User Avatar Placeholder */}
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "primary.main",
            fontSize: "0.875rem",
          }}
        >
          U
        </Avatar>
      </Box>
    </Box>
  );
};

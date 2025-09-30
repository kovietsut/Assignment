import { Box, Container, Typography } from "@mui/material";
import { footerLinks } from "./Footer.state";
import useStyle from "./Footer.styles";

export const Footer = () => {
  const styles = useStyle();

  return (
    <Box component="footer" sx={styles.footer}>
      <Container disableGutters>
        <Box sx={styles.footerContent}>
          <Typography sx={styles.copyright}>
            © 2025 Ticket Manager Inc.
          </Typography>
          <Box sx={styles.linksContainer}>
            {footerLinks.map((link, index) => (
              <Typography
                key={index}
                component="a"
                href={link.href}
                sx={styles.link}
              >
                {link.text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

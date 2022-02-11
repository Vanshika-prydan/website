import {
  useMediaQuery,
  useTheme,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation, Trans } from "react-i18next";
import PlayStoreLinks from "./common/playstore-links";
import { MainContainer } from "./common/Containers";

const BookViaApp = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        pt: 5,
        pb: 0,
        mt: 5,
        backgroundColor: "grey.500",
      }}
    >
      <MainContainer>
        <Box
          sx={{
            display: isMobile ? "block" : "grid",
            gap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Box
            sx={{
              mt: -10,
              ml: isMobile ? -13 : -25,
              mr: isMobile ? 0 : -40
            }}
          >
            <img
              src="/images/CG-mobile-app.png"
              alt="Mobile App"
              width={isMobile ? 400 : 700}
            />
          </Box>
          <Box sx={{ pb: isMobile ? 5 : "auto" }}>
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{ pb: isMobile ? "auto" : 1, pt: 1 }}
            >
              <Trans>
                Med appen har du full kontroll. Städning på dina villkor!
              </Trans>
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ pb: 1, mb: isMobile ? 1 : 0, fontWeight: 400 }}
            >
              {t("BookVia_description_text")}
            </Typography>

            <Box sx={{ pt: isMobile ? 2 : 2, textAlign: isMobile ? "center" : "left" }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {t("BookVia_Small_description_text")}
              </Typography>
              <PlayStoreLinks />
            </Box>

          </Box>
        </Box>
      </MainContainer>
    </Box>
  );
};
export default BookViaApp;

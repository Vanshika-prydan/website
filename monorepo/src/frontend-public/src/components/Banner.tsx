import { useMediaQuery, useTheme, Typography, Box } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import PlayStoreLinks from "./common/playstore-links";
import {
  MainContainer,
  PaperContainer,
  BannerRightImageContainer,
} from "./common/Containers";

const Banner = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <PaperContainer >
      <>
        <MainContainer  >
          <Box
            sx={{ my: isMobile ? -3 : 0, pt: isMobile ? 5 : 15, pr: isMobile ? "auto" : "50%"}}
          >
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{ fontSize: isMobile ? "2.3rem" : "2.8rem" }}
            >
              <Trans>It has never been easier to make your home shiny!</Trans>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontSize: 22, lineHeight: "2rem", maxWidth: 310 }}
            >
              <Trans>Book organic cleaning quickly and easily, directly in the app.</Trans>
            </Typography>
            <Box
              sx={{
                pt: isMobile ? 1 : 3,
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {t("Download the app and you're up and running.")}
              </Typography>
              <PlayStoreLinks />
            </Box>
          </Box>
        </MainContainer>
        <BannerRightImageContainer />
      </>
    </PaperContainer>
  );
};

export default Banner;

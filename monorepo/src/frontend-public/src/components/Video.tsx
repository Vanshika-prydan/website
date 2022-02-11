import { useMediaQuery, useTheme, Typography } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";
import PlayStoreLinks from "./common/playstore-links";
import {
  BoxContainer,
  BannerContainer,
  TextBox,
  MainTypography,
  BoxInnerContainer,
  ButtonTypography,
} from "./Style";
import { MainContainer } from "./common/Containers";

const Video = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <BoxContainer>
      <video
        autoPlay
        muted
        loop
        style={{
          width: isMobile ? "100%" : "100%",
        }}
      >
        <source src="/video/Video.mp4" type="video/mp4" />
        APP video
      </video>
      <MainContainer>
        <BoxInnerContainer>
          <>
            <BannerContainer>
              <Typography component="h1" variant="h4" gutterBottom>
                <Trans>It has never been easier to make your home shiny!</Trans>
              </Typography>
              <MainTypography variant="subtitle1">
                <Trans>
                  Book organic cleaning quickly and easily, directly in the app.
                </Trans>
              </MainTypography>
              <TextBox>
                <ButtonTypography>
                  {t("Download the app and you're up and running.")}
                </ButtonTypography>
                <PlayStoreLinks />
              </TextBox>
            </BannerContainer>
          </>
        </BoxInnerContainer>
      </MainContainer>
    </BoxContainer>
  );
};
export default Video;

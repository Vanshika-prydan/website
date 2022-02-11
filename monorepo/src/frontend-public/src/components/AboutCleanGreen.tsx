import { useMediaQuery, useTheme, Typography, Box, } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import ContentBox from "./common/ContentBox";
import Item from "./common/ItemContainer";
import { MainContainer } from "./common/Containers";
import { StyledLink } from "./common/theme";

const AboutCleanGreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <MainContainer>
      <Box
        sx={{
          display: isMobile ? "block" : "grid",
          gap: 1,
          pt: 10,
          pb: 5,
        gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Item sx={{ marginBottom: isMobile ? 10 : 0 }}>
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            sx={{ pb: 2, maxWidth: 400 }}
          >
            {t("About_header_text")}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, pr: isMobile ? "auto" : 10 }}
          >
            {t("About_description_text")}
          </Typography>
        </Item>
        <Item sx={{ mb: 4 }}>
          <ContentBox>
            <Box
              sx={{
                display: isMobile ? "block" : "grid",
                gridAutoFlow: "row",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                textAlign: isMobile ? "center" : "left",
                p: 1,
                paddingLeft: 0,
              }}
            >
              <Item
                sx={{
                  gridRow: "1",
                  paddingRight: 0,
                  position: "relative",
                  right: isMobile ? 0 : 45,
                  bottom: isMobile ? 70 : 0,
                  display: "flex",
                  justifyContent: isMobile ? "center" : "",
                }}
              >
                <img
                  src="/images/nsf-stodforetag.png"
                  width={150}
                  style={{ boxShadow: "3px 3px 60px rgba(76, 145, 99, .15)" }}
                  alt="Naturskyddsföreningen"
                />
              </Item>
              <Item
                sx={{
                  gridRow: "1",
                  gridColumn: "span 2",
                  pt: 2,
                  paddingTop: isMobile ? "0" : "16px",
                  position: "relative",
                  bottom: isMobile ? "27px" : "0",
                  right: isMobile ? 0 : 13,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ maxWidth: isMobile ? 200 : "auto", margin: "auto" }}
                >
                  {t("Join us in saving the worlds oceans!")}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 400,
                    pr: isMobile ? 1.5 : 2,
                    pl: isMobile ? 1.5 : "auto",
                  }}
                >
                  <Trans>
                  Without healthy seas, it is not possible to get a healthy globe. Therefore, We Clean Green supports the Swedish Society for Nature Conservations work to save the worlds oceans. Every cleaning assignment we carry out creates a gift of 30 SEK that helps to make our green globe in a healthier blue as well. <StyledLink
                      href="https://www.naturskyddsforeningen.se/artiklar/sa-kan-vi-radda-varldens-hav/"
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="inherit"
                      color="#395165"
                         >
                      Read more here
                    </StyledLink></Trans>
                </Typography>
              </Item>
            </Box>
          </ContentBox>
        </Item>
      </Box>
    </MainContainer>
  );
};
export default AboutCleanGreen;

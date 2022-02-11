import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import PlayStoreLinks from "./common/playstore-links";
import Item from "./common/ItemContainer";
import { MainContainer } from "./common/Containers";

const DownloadApp = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        pt: 5,
        pb: 2,
        backgroundColor: "primary.dark",
      }}
    >
      <MainContainer>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            position: "relative",
          }}
        >
          <Item>
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", color: "primary.light" }}
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", color: "primary.light" }}
            >
              {t("Download_Small_header_text")}
            </Typography>

            <Box sx={{ my: 4, justifyContent: "center", textAlign: "center" }}>
              <PlayStoreLinks />
            </Box>
            <Box sx={{ position: "absolute", bottom: -100, right: 0 }}>
              <img
                src="/images/CG-leaf-2.svg"
                width={200}
                alt="Leaf at Download"
              />
            </Box>
          </Item>
        </Box>
      </MainContainer>
    </Box>
  );
};
export default DownloadApp;

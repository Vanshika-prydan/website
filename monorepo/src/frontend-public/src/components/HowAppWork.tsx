import {
  Container,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import howAppWorkData from "../data/how-app-work.json";
import { howAppWork } from "../interface/howAppWork";
import Item from "./common/ItemContainer";

const AppWorkItem = (item :howAppWork) => {
  const {title, id, description} = item;
  return (
    <Item key={id.toString()}>
      {/* <img src={image} width={38} alt={title} /> */}
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color:"primary.dark", fontSize:"2.3rem" }}>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 400, lineHeight: 1.45 }}
      >
        {description}
      </Typography>
    </Item>
  );
};

const HowAppWork = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" id="how-it-works">
      <Box
        sx={{
          display: "grid",
          pt: 12,
          pb: 12,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ pb: 2, fontWeight: 800 }}
        >
          {t("HowAppWork_header_text")}
        </Typography>
        <Box
          sx={{
            display:isMobile ? "block" : "grid",
            gap: 5,
            pt:1,
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {howAppWorkData.map((itm: howAppWork) =>AppWorkItem(itm))}
        </Box>
      </Box>
    </Container>
  );
};
export default HowAppWork;

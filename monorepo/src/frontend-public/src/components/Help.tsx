import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Item from "./common/ItemContainer";
import { MediumContainer } from "./common/Containers";
import { StyledLink } from "./common/theme";

const Help = () => {
  const { t } = useTranslation();

  return (
    <MediumContainer>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          pt: 3,
          pb: 3,
        }}
        id="about-us"
      >
        <Item>
          <Typography component="h1" variant="h4" gutterBottom sx={{ pb: 1 }}>
            {t("Help_header_text")}
          </Typography>
          <Typography variant="subtitle2" sx={{ pb: 3, fontWeight: 400 }}>
            We Clean Green är här för att göra svenska hem - och klotet vi lever
            på - renare, friskare och grönare. Med rötterna i New York har vi
            lärt oss att möta mycket höga krav på service och yrkesskicklighet.
            Staden som aldrig sover har gjort oss lyhörda, snabbfotade och
            ambitiösa. Efter mer än tio år med mycket nöjda kunder i New York
            ska vi nu erbjuda svenska hem samma skräddarsydda, glänsande och
            gröna upplevelse. Ta gärna en titt på vårt systerföretag i New York{" "}
            <StyledLink
              href="https://greenmaids.co/"
              rel="noopener noreferrer"
              target="_blank"
              variant="inherit"
              color="#395165"
            >
              här
            </StyledLink>
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, fontSize: 16 }}>Med engagemang i allt vi gör</Typography>
          <Typography variant="subtitle2" sx={{ pb: 3, fontWeight: 400 }}>
            Vi utbildar våra medarbetare i service, städteknik och hela
            företaget har ett brinnande miljöengagemang. Det genomsyrar allt vi
            gör - från valet av rengöringsmedel till att vi hjälper till med att
            sopsortera och återvinna. Alla som arbetar på We Clean Green förstår
            och tar ansvar för hur vår verksamhet påverkar vår omvärld. För
            tillsammans ska vi göra den bättre.
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, fontSize: 16 }}>Bättre för våra kunder, våra medarbetare och klotet vi lever på</Typography>
          <Typography variant="subtitle2" sx={{ pb: 4, fontWeight: 400 }}>
            We Clean Green är ett rent företag som bygger starka och trygga
            relationer till såväl samhället vi är en del av, som till våra
            kunder och medarbetare. Vi följer branschens kollektivavtal och
            självklart också svensk arbets- och miljölagstiftning i alla led. Vi
            drivs av att alltid göra mer än vad lagen kräver och mycket mer än
            våra konkurrenter.
          </Typography>
          <Typography variant="subtitle2" sx={{ pb: 2, fontWeight: 400 }}>
            Hör gärna av dig om du har synpunkter, frågor eller förslag på förbättringar.
          </Typography>
          <Box
            sx={{
              display: "grid",
              pr: 10,
              textAlign: "center",
              justifyContent: "space-around",
              pb: 10,
              pt: 6,
            }}
          >
            <img src="/images/CG-team.png" alt="Clean Green Team" width={200} />
          </Box>
        </Item>
      </Box>
    </MediumContainer>
  );
};

export default Help;

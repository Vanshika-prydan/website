import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box } from "@mui/material";
import { WCGPageHeading } from "../../src/components/common/WCGTypoGraphy";
import PlayStoreLinks from "../../src/components/common/playstore-links";

export const Homecleaning = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Organic")} {t("Home Cleaning")} - {t("service_meta_title")}</title>
        <meta name="description" content={t("service_meta_description")} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="//wecleangreen.se/images/logo-green.svg"
        />
        <meta property="og:url" content="" />
        <meta property="og:title" content={`${t("Organic")} ${t("Home Cleaning")} - ${t("service_meta_title")}`} />
        <meta
          property="og:description"
          content={t("service_meta_description")}
        />
      </Head>
      <Box>
        <Box
          sx={{
            height: 350,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(/images/Hemstad.jpg)`,
          }}
        />
        <Container maxWidth="md" className="content-page" sx={{ pl: 5, pr: 5 }}>
          <Box sx={{ mt: 2, ml: -2 }}>
            <img
              src="/images/homeclean-icon.png"
              alt="Hemstädning"
              width={140}
            />
          </Box>
          <Box sx={{ mb: 10 }}>
            <WCGPageHeading>{t("Organic")}</WCGPageHeading>

            <Typography variant="h3" sx={{ fontSize: "2.5rem" }}>
              {t("Home Cleaning")}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "1.15rem" }} >
              Det har aldrig varit enklare att få ett välstädat och hälsosamt hem – klicka bara på kontaktknappen nedan, eller ladda ner vår app så är du igång..</Typography>
            <Typography variant="body1" sx={{ pt: 2, mb: 2 }}>
              Med vår ekologiska hemstädning får du ett hem fritt från onödiga
              kemikalier. Vi använder enbart de bästa, grönaste hjälpmedlen och
              våra engagerade medarbetare ser till att göra det där lilla extra
              för att visa vår omtanke om ditt hem.
            </Typography>
            <PlayStoreLinks />
            <Typography variant="h6" sx={{ mt: 1, fontSize: "1.15rem" }}>
              Här följer en mer detaljerad genomgång av vad som ingår när We
              Clean Green tar hand om ditt hem:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                pt: 2,
                borderBottom: 1,
                fontSize: "1.15rem",
                borderBottomColor: "secondary.light",
              }}
            >
              Bostadsrum
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>Damning av vågräta ytor</li>
              <li>Dammsugning av mattor, golv och golvlister</li>
              <li>
                Avtorkning av luckor, kontakter, lampknappar, foder, lister,
                dörrar och dörrhandtag
              </li>
              <li>Putsning av speglar</li>
              <li>
                Tömning av papperskorgar (brännbart eller komposterbart? Vi ser
                till att det hamnar rätt i sorteringen)
              </li>
              <li>Dammning av tavelramar och lampor</li>
              <li>Dammsuger och våttorkar golv.</li>
              <li>Bäddar om sängar om nya lakan ligger framme.</li>
              <li>
                Dammtorkar ledstång, räcke och spjälor om det finns en trappa.
              </li>
              <li>Små mattor tas ut, skakas och torkas av</li>
            </ul>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
              }}
            >
              Kök och matplats
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>Samma tjänster som för bostadsrum. Dessutom:</li>
              <li>Rengörning av kakel/stänkskydd över diskbänk</li>
              <li>Rengörning av spisen utvändigt</li>
              <li>Rengörning av micro in- och utvändigt</li>
              <li>Avtorkning av hushållsmaskiner</li>
              <li>Avtorkning av kyl/frys utvändigt</li>
              <li>Rengörning av sopkärl</li>
              <li>Avtorkning av matsalsbord och stolar</li>
              <li>Rengörning av diskho, diskbänk och blandare</li>
              <li>Avtorkning och dammning ovanpå skåp</li>
            </ul>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
              }}
            >
              Badrum och toaletter
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>Samma tjänster som för bostadsrum. Dessutom:</li>
              <li>Rengörning av badkar och duschutrymme</li>
              <li>Avtorkning av badrumsmöbler</li>
              <li>Avtorkning av hängare och handdukstork</li>
              <li>Rengörning av handfat utsida/insida</li>
            </ul>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
              }}
            >
              Dessutom i badrum/Tvättstuga
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>Rengör utsidan av vitvaror samt tvättmedelsbehållaren.</li>
              <li>Rengör filtret i torktumlaren.</li>
            </ul>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
              }}
            >
              Du kan också lägga till (till en extra kostnad)
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>Strykning och vikning av tvätt</li>
              <li>Rengöring av insidan av kylskåpet</li>
              <li>Handdisk/tork</li>
              <li>Dammsuga madrasser</li>
              <li>Bädda om alla sängar</li>
              <li>Fönsterputs</li>
            </ul>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Homecleaning;

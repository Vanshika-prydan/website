import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box } from "@mui/material";
import { WCGPageHeading } from "../../src/components/common/WCGTypoGraphy";

const Officecleaning = () => {
  const { t } = useTranslation();

  return (
    <>
    <Head>
        <title>
          {t("Organic")} {t("Office Cleaning")} - {t("service_meta_title")}
        </title>
        <meta name="description" content={t("service_meta_description")} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="//wecleangreen.se/images/meta-3.png"
        />
        <meta property="og:url" content="" />
        <meta property="og:title" content={`${t("Organic")} ${t("Office Cleaning")} - ${t("service_meta_title")}`} />
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
            backgroundImage: `url(/images/Kontorsstad.jpg)`,
          }}
        />
        <Container maxWidth="md" className="content-page" sx={{ pl: 5, pr: 5 }}>
          <Box sx={{ mt: 2, ml: -2 }}>
            <img
              src="/images/office-cleaning-icon.png"
              alt="Home Cleaning"
              width={140}
            />
          </Box>
          <Box sx={{ mb: 10 }}>
            <WCGPageHeading>{t("Organic")} </WCGPageHeading>
            <Typography variant="h3" sx={{ fontSize: "2.5rem" }}>
            {t("Office Cleaning")}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              En riktigt bra kontorsstädning märks inte. Den skapar en fräsch
              och välkomnande arbetsplats där alla kan fokusera på att göra sitt
              bästa utan krångel. Det är det som är vårt jobb. Med We Clean
              Green så garanteras också att inga onödiga, eller farliga
              kemikalier används, vilket är extra bra för astmatiker och andra
              med en hög känslighet.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, pt: 2 }}>
              Hur ofta det ska städas bestämmer du. Vi anpassar oss helt till
              ert behov och skräddarsyr vår städning så att den blir precis som
              ni vill ha den.
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontSize: "1.15rem", mt: 1, maxWidth: 580 }}
            >
              Boka in ett kostnadsfritt besök så kommer vi och berättar mer om
              vårt erbjudande och hur vi kan lägga upp städningen hos er.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
              }}
            >
              Det här ingår i kontorsstädning
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
              <li>Dammsuger och/eller våttorkar golv beroende på underlag</li>
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
              Köks- och ätytor
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>Samma tjänster som för kontorsytor. Dessutom:</li>
              <li>Rengörning av kakel/stänkskydd över diskbänk</li>
              <li>Rengörning av spisen utvändigt</li>
              <li>Rengörning av micro in- och utvändigt</li>
              <li>Avtorkning av hushållsmaskiner</li>
              <li>Avtorkning av kyl/frys utvändigt</li>
              <li>Rengörning av sopkärl</li>
              <li>Avtorkning av matsalsbord och stolar</li>
              <li>Rengörning av diskho, diskbänk och blandare </li>
              <li>Avtorkning och damning av fria ytor</li>
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
              Toaletter
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>Samma tjänster som för kontorsytor. Dessutom:</li>
              <li>Avtorkning/rengörning av sanitär inredning</li>
              <li>Påfyllning av toalettartiklar</li>
              <li>Avtorkning av hängare och ev. handdukstork</li>
             
            </ul>
            <Typography
              variant="h6"
              sx={{
                pt: 1,
                fontSize: "1.75rem",
              }}
            >
              Vad innebär We Clean Greens ekologiska städning?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
              }}
            >
              Vi ställer höga krav på vår städning och de hjälpmedel vi
              använder.{" "}
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>
                Vi använder enbart miljövänliga, miljömärkta rengöringsmedel. Vi
                ser också till att använda så få kemikalier, och så lite av dem,
                som möjligt.{" "}
              </li>
              <li>
                Vi använder microfiberdukar som ett sätt att minska
                kemikalieanvändningen
              </li>
              <li>
                Vi ser också till att välja produkter med så enkla förpackningar
                som möjligt. Samt att förbrukningen av t.ex. avfallspåsar hålls
                så låg som möjligt.
              </li>
              <li>
                Vi ser återvinning och kretsloppstänk som grunden för allt vi
                gör och vi minimerar allt som inte ingår i det.
              </li>
              <li>
                Vi ställer också höga krav på minskade utsläpp från våra resor
                till och från våra uppdrag. Vi väljer elektriska, eller
                bränslesnåla fordon och planerar våra resor så väl som möjligt.{" "}
              </li>
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
              Andra viktiga områden för oss
            </Typography>
            <ul style={{ marginTop: 5 }}>
              <li>
                All personal omfattas av kollektivavtal med sjuklön, pension och
                får betalt även för restid mellan kunder.{" "}
              </li>
              <li>
                Vi ser till att du har en och samma städare som återkommer till
                dig och lär känna ditt hem.{" "}
              </li>
              <li>
                Alla medarbetare talar svenska – men våra medarbetare kan flera
                språk vilket vi ser som en stor tillgång.
              </li>
              <li>
                Alla medarbetare arbetar enligt ett tydligt sekretessavtal och
                svenska stöldskyddsföreningens nyckelrutiner.
              </li>
              <li>
                Rut på fakturan - enkel administration och vi löser
                administrationen med Skatteverket.
              </li>
            </ul>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Officecleaning;

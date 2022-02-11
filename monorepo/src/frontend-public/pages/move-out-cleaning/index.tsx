import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box } from "@mui/material";
import { WCGPageHeading } from "../../src/components/common/WCGTypoGraphy";

const MoveOutcleaning = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>
          {t("Organic")} {t("Move Out Cleaning")} - {t("service_meta_title")}
        </title>
        <meta name="description" content={t("service_meta_description")} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="//wecleangreen.se/images/meta-3.png"
        />
        <meta property="og:url" content="" />
        <meta property="og:title" content={`${t("Organic")} ${t("Move Out Cleaning")} - ${t("service_meta_title")}`} />
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
            backgroundImage: `url(/images/Flyttstad.jpg)`,
          }}
        />
        <Container maxWidth="md" className="content-page" sx={{ pl: 5, pr: 5 }}>
          <Box sx={{ mt: 2, ml: -2 }}>
            <img
              src="/images/moving-cleaning-icon.png"
              alt="Moving Cleaning"
              width={140}
            />
          </Box>
          <Box sx={{ mb: 5 }}>
            <WCGPageHeading>{t("Organic")}</WCGPageHeading>
            
            <Typography variant="h3" sx={{ fontSize: "2.5rem" }}>
            {t("Move Out Cleaning")}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Det sista man vill göra när man flyttar är att komma tillbaka till
              sin gamla bostad och börja städa den. Att flyttstäda ett hem tar
              tid och kräver fokus – därför föreslår vi att du låter oss göra
              det! Vi på We Clean Grean har kunskap och vet vad som måste göras
              så att både du och den som flyttar in blir nöjda.
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, fontSize: "1.15rem" }}>
              Det här ingår i vår ekologiska flyttstädning
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
              }}
            >
              Arbeten vi gör i alla rum:
            </Typography>
            <ul style={{ marginTop: 5, lineHeight: 1.55 }}>
              <li>Putsar fönster.</li>
              <li>
                Dammsuger och våttorkar snickerier, lister, dörrar, dörrkarmar,
                fönsterbrädor, fria ytor, garderobsdörrar och skåpdörrar.
              </li>
              <li>
                Torkar ovanpå och invändigt i garderober, skåp, och bokhyllor.
              </li>
              <li>Torkar i golvskenor på skjutdörrar.</li>
              <li>Dammsuger och våttorkar element.</li>
              <li>Dammtorkar väggar.</li>
              <li>Dammtorkar eluttag.</li>
              <li>Dammtorkar lampor.</li>
              <li>Putsar speglar.</li>
              <li>
                Tar bort aska från en eventuell kakelugn eller öppen spis.
              </li>
              <li>Torkar ytterdörrar.</li>
              <li>Dammsuger och moppar golv.</li>
            </ul>
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
              I köket gör vi också
            </Typography>
            <ul style={{ marginTop: 5, lineHeight: 1.55 }}>
              <li>Rengör kyl och frys ut- och invändigt.</li>
              <li>
                Rengör spis och ugn ut- och invändigt, även plåtar och galler.
              </li>
              <li>Rengör fläkt och fläktfilter (ej kolfilter).</li>
              <li>
                Rengör in- och utvändigt samt ovanpå skåp, hyllor och lådor.
              </li>
              <li>Rengör kakel/stänkskydd ovanför diskbänk.</li>
              <li>Rengör under skåp och torkar av socklar.</li>
              <li>Rengör mikrovågsugn ut- och invändigt.</li>
              <li>Torkar diskmaskin in- och utvändigt.</li>
              <li>Torkar ur besticklådor.</li>
              <li>Tömmer och torkar sopkorg.</li>
              <li>Putsar diskho, blandare, propp och sil.</li>
            </ul>
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
              I badrum och toaletter gör vi också:
            </Typography>
            <ul style={{ marginTop: 5, lineHeight: 1.55 }}>
              <li>Rengör väggar och golv.</li>
              <li>Putsar blandare, synliga rör och duschmunstycke.</li>
              <li>
                Avfettar och avkalkar väggar och fogar där det är möjligt.
              </li>
              <li>Rengör golvbrunn.</li>
              <li>
                Rengör hela duschen alt. badkaret, tar bort fronten och torkar
                under.
              </li>
              <li>Torkar in- och utsida samt ovanpå badrumsskåp.</li>
              <li>Rengör kran och handfat.</li>
              <li>Rengör hela toalettstolen.</li>
              <li>
                Rengör utsidan av vitvaror samt i tvättmedelsbehållaren på
                tvättmaskinen.
              </li>
            </ul>
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
              I hallen gör vi också:
            </Typography>
            <ul style={{ marginTop: 5, lineHeight: 1.55 }}>
              <li>Dammtorkar ledstång, räcke och spjälor i trappa.</li>
              <li>Torkar hatthylla.</li>
              <li>Torkar proppskåp.</li>
            </ul>
            <Typography
              variant="body1"
              sx={{
                mt: 3,
                pt: 8,
                pb: 9,
              }}
            >
              På We Clean Green erbjuder vi flyttstäd med garanterat nöjda
              kunder. Vi vet hur viktigt det är att inte bara du som beställare
              blir nöjd med en flyttstäd utan även köparen. Därför håller vi en
              genomgång av bostaden med båda parter för att säkerställa att alla
              är helt nöjda med resultatet.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MoveOutcleaning;

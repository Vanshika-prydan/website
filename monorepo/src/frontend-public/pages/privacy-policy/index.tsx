import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Container, Typography, Box } from "@mui/material";
import { WCGPageHeading } from "../../src/components/common/WCGTypoGraphy";
import { StyledLink } from '../../src/components/common/theme';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {t("Terms and Conditions")} - {t("meta_title")}
        </title>
        <meta
          name="description"
          content={`${t("meta_page_description")} - ${t(
            "Terms and Conditions"
          )}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="//wecleangreen.se/images/meta-3.png"
        />
        <meta property="og:url" content="" />
        <meta
          property="og:title"
          content={`${t("Terms and Conditions")} - ${t("meta_title")}`}
        />
        <meta
          property="og:description"
          content={`${t("meta_page_description")} - ${t(
            "Terms and Conditions"
          )}`}
        />
      </Head>
      <Box>
        <Box
          sx={{
            height: 350,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(/images/privacy-policy.jpg)`
          }}
        />
        <Container maxWidth="md" className="content-page" sx={{ pl: 5, pr: 5 }}>
          <Box sx={{ mb: 10, mt: 8 }}>
            <WCGPageHeading>{t("Terms and Conditions")}</WCGPageHeading>
            <Typography variant="h3" sx={{ fontSize: "2.5rem" }}>
              Integritet är viktigt hos oss på We Clean Green
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, pt: 2 }}>
              På We Clean Green värnar vi om din personliga integritet och
              eftersträvar alltid en hög nivå av dataskydd. Vi säljer aldrig
              personuppgifter till ett annat företag. Denna Integritetspolicy
              definierar hur vi samlar in och använder din personliga
              information. Den beskriver också vilka rättigheter du har, hur du
              kan använda dem och du kan komma i kontakt med oss på We Clean
              Green.
            </Typography>
            <Typography variant="h4" sx={{ mt: 2, pt: 2 }}>
              E-post
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green skickar löpande ut information och nyhetsbrev till
              de som aktivt anmält intresse. Ni kan när som helst avregistrera
              er från dessa utskick. Något som innebär att ni i framtiden ej
              kommer att få dessa utskick, utan att aktivt åter anmäla sig till
              oss på hello@greenclean.se
            </Typography>
            <Typography variant="h4" sx={{ mt: 2, pt: 2 }}>
              The fine prints – We Clean Greens Integritetspolicy
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vi uppmanar dig att läsa igenom vår Integritetspolicy innan du
              samtycker till att vi behandlar dina personuppgifter.
            </Typography>
            <Typography variant="body1">
              Innehåll:
              <ol>
                <li> Personuppgifter</li>
                <li> We Clean Green är personuppgiftsansvarig</li>
                <li> Vid förändringar i Integritetspolicyn</li>
                <li> Vilka typer av information samlar vi in?</li>
                <li> Hur samlar vi in din information?</li>
                <li> Information från andra källor</li>
                <li> Hur använder vi informationen?</li>
                <li>
                  {" "}
                  Samtycke till mejlutskick, direktmarknadsföring och fortsatt
                  kontakt
                </li>
                <li> Hur länge sparas uppgifterna?</li>
                <li> Vem kan ta del av uppgifterna?</li>
                <li>
                  {" "}
                  Vi delar viss information inom ramen för samarbete med tredje
                  part
                </li>
                <li> Var förvaras uppgifterna?</li>
                <li> Dina rättigheter</li>
                <li> Hur skyddas dina personuppgifter</li>
                <li> Datainspektionen är tillsynsmyndighet</li>
                <li> Kontaktuppgifter till We Clean Green</li>
              </ol>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              1. PERSONUPPGIFTER
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Personuppgifter är information som enskilt eller tillsammans med
              andra uppgifter kan användas för att identifiera, lokalisera eller
              kontakta en individ. Exempel på personuppgifter är namn,
              telefonnummer och IP-adress. Behandling av personuppgifter innebär
              all typ av hantering av personuppgifter, till exempel: insamling,
              analys, registrering och lagring. Personuppgiftsansvarig är den
              som fastställer syftet med behandling av personuppgifter och som
              bestämmer vilka personuppgifter som efterfrågas. Det är
              personuppgiftsansvarig som är ytterst ansvarig för att
              behandlingen av dina personuppgifter sker enligt gällande
              personuppgiftslagstiftning.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              2. WE CLEAN GREEN ÄR PERSONUPPGIFTSANSVARIG
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Personuppgiftsansvarig kallas den som bestämmer varför och hur
              personuppgifter ska behandlas. En personuppgiftsansvarig kan till
              exempel vara en statlig myndighet, en organisation eller ett
              företag.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green Sweden AB är personuppgiftsansvarig för
              behandlingen av dina personuppgifter och ansvarar för de
              personuppgifter vi lagrar. Organisationsnummer är 559268-9565.
              Adress: Tomtebogatan 5, 113 39 Stockholm.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Om du har frågor om dina personuppgifter kan du kontakta oss via:
              dpo@greenclean.se
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              3. VID FÖRÄNDRINGAR I INTEGRITETSPOLICYN
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green kan komma att göra ändringar i Integritetspolicyn.
              Den senaste versionen av policyn finns alltid på
              www.wecleangreen.se
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vid uppdateringar som är av avgörande betydelse för vår behandling
              av personuppgifter eller som kan vara av större betydelse för dig,
              exempelvis väsentlig ändring av ändamål, får du information via
              e-post i god tid innan uppdateringarna börjar gälla. Där förklarar
              vi även innebörden av uppdateringarna och hur de kan komma att
              påverka dig.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              4. VILKA TYPER AV INFORMATION SAMLAR VI IN?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              När du registrerar dig via ett formulär eller besöker vår hemsida
              lagrar vi viss typ av data och du kan också bli ombedd att lämna
              ifrån dig information. Beroende på situation kan vi komma att be
              om följande personuppgifter:
              <ul>
                <li>Persondata</li>
                <ul>
                  <li>Namn</li>
                  <li>Adress</li>
                  <li>E-postadress</li>
                  <li>Telefonnummer</li>
                  <li>Personnummer</li>
                  <li>IP-adress*</li>
                </ul>
              </ul>
              <ul>
                <li>Betalningsinformation via Stripe Inc.</li>
                <li>
                  Diagnostiska data via browser, mobil app eller andra
                  applikationer
                </li>
                <li>Information om tjänstens innehåll</li>
              </ul>
              <ul>
                <ul>
                  <li>Plats</li>
                  <li>Portkoder</li>
                  <li>Omdömen och betygsättning</li>
                  <li>Datum</li>
                  <li>Djurägande</li>
                </ul>
              </ul>
              *Teknisk data: den URL genom vilket du får åtkomst till våra
              webbsidor, din IP-adress och användarbeteende, typ av webbläsare,
              språk och information om identifiering och operativsystem.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              5. HUR SAMLAR VI IN DIN INFORMATION?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vi samlar in data och behandlar data när du:
              <ul>
                <li>Besöker We Clean Greens webbsida</li>
                <li>Vi användning We Clean Greens applikationer</li>
                <li>Vi användning av We Clean Greens API:er</li>
                <li>
                  När du lämnar feedback eller när vi genomför
                  kundundersökningar
                </li>
                <li>När du kontaktar oss och använder våra supporttjänster</li>
              </ul>
              We Clean Greens tar för tillfället inte emot data från
              tredjepartstjänster eller andra leverantörer
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              6. INFORMATION FRÅN ANDRA KÄLLOR
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              När du samtycker till att vi behandlar dina personuppgifter
              godkänner du även att vi kan komma att registrera annan
              information om dig. Baserat på offentligt tillgänglig information
              kan vi även komma att komplettera dina registrerade uppgifter med
              intressen, ålder eller annan för sajten relevant information.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              7. HUR ANVÄNDER VI INFORMATIONEN?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Informationen som du ger ifrån dig kan komma att användas för
              följande ändamål:
              <ul>
                <li>Marknadsföring</li>
                <li>Mejlutskick</li>
                <li>Inbjudning.</li>
                <li>
                  Kundvård och informationsinsatser kring våra produkter så att
                  vi kan ge dig en mer personlig upplevelse och leverera
                  produkterbjudanden och annat innehåll som du kan vara
                  intresseradav.
                </li>
              </ul>
              Vi ber om dina kontaktuppgifter för att:
              <ul>
                <li>Svara på förfrågningar.</li>
                <li>
                  Skicka efterfrågat material, eller på annat sätt uppfylla det
                  vi åtagit oss i.
                </li>
                <li>
                  Lägga till dig på utskickslistor för nyheter och annat
                  innehåll du själv valt att ta del av.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              8. SAMTYCKE TILL MEJLUTSKICK, DIREKTMARKNADSFÖRING OCH FORTSATT
              KONTAKT
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              När du samtycker till att vi behandlar dina personuppgifter enligt
              ovan angivna syften så samtycker du till att:
              <ul>
                <li>
                  Vi behandlar dina personuppgifter enligt denna
                  Integritetspolicy.
                </li>
                <li>
                  Vi kan skicka direktmarknadsföring till dig via e-post om våra
                  eller samarbetsparts produkter.
                </li>
                <li>Vi får kontakta dig via e-post eller telefon.</li>
                <li>
                  Prenumerera på den typ av mejlutskick du själv har valt att
                  tacka ja till. Du kan uppdatera dina
                  prenumerationsinställningar och tacka nej till vidare utskick
                  genom att följa den länk som du hittar längst ner i alla våra
                  utskick, eller genom att kontakta oss direkt.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              9. HUR LÄNGE SPARAS UPPGIFTERNA?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vi behandlar bara personuppgifter så pass länge att vi kan
              uppfylla syftet för uppgifternas insamling, därefter raderar vi
              data. En aktiv dialog definieras som att du under de senaste 24
              månaderna har interagerat med We Clean Green via telefon, genom
              att besvara e-post, ladda ner material på webbplatsen eller
              registrera dig via ett formulär.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Har du samtyckt till behandling av dina personuppgifter i samband
              med att du tackat ja till regelbundna mejlutskick fortsätter vi
              behandling av dina personuppgifter till det att du avslutar din
              prenumeration. Därefter lagrar vi dina personuppgifter i 24
              månader innan vi gallrar data.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              10. VEM KAN TA DEL AV UPPGIFTERNA?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              I de fall det är nödvändigt delar vi dina personuppgifter med
              företag som på ett eller annat sätt är underleverantörer till oss.
              Dessa underleverantörer kallas för personuppgiftsbiträden. Ett
              personuppgiftsbiträde är ett företag som behandlar information för
              We Clean Greens räkning och enligt våra instruktioner. Vi har
              personuppgiftsbiträden som hjälper oss med:
              <ul>
                <li>
                  IT-tjänster (företag som hanterar nödvändig drift, teknisk
                  support och underhåll av våra ITlösningar).
                </li>
                <li>Betalningstransaktioner</li>
                <li>Utskick av E-post i form av nyhetsbrev</li>
                <li>Utbildningar och event.</li>
              </ul>
              När dina personuppgifter delas med personuppgiftsbiträden sker det
              endast för de ändamål vi har angivit. Vi kontrollerar alla
              personuppgiftsbiträden för att säkerställa att de kan lämna
              tillräckliga garantier för säkerhet och sekretess för
              personuppgifter. Vi ställer krav att de garanterar säkerheten för
              de personuppgifter som behandlas och att de åtar sig att följa
              våra säkerhetskrav samt begränsningar och krav som gäller
              internationell överföring av personuppgifter.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              11. VI DELAR VISS INFORMATION INOM RAMEN FÖR SAMARBETE MED TREDJE
              PART
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vi säljer inte dina personuppgifter till tredje part. Finns det en
              pågående relation mellan dig, oss och någon av våra
              samarbetspartners kan vi komma att dela information om dig i form
              av: Kön, ålder, bostadsort och intresse
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Har vi registrerat dina uppgifter i samband med ett event som vi
              genomför tillsammans med en extern part kan vi komma att överföra
              samma kategorier av personuppgifter som angivet ovan samt namn,
              telefonnummer och e-postadress, samt eventuellt svar på
              ytterligare formulärfrågor eller fritextsvar.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              12. VAR FÖRVARAS UPPGIFTERNA?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vi strävar alltid efter att dina personuppgifter ska behandlas
              inom Sverige. Går inte det, väljer vi så långt det är möjligt
              liknande lösningar inom EU
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Om du vill få en kopia av de skyddsåtgärder som har vidtagits
              eller information om var dessa har gjorts tillgängliga är du
              välkommen att kontakta oss.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              13. DINA RÄTTIGHTERER SOM REGISTRERAD
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              All information om dina rättigheter finns på Datainspektionens
              hemsida:
            </Typography>
            <StyledLink
              href="https://www.imy.se/privatperson/dataskydd/dina-rattigheter/"
              rel="noopener noreferrer"
              target="_blank"
              variant="inherit"
              color="#395165"
            >
              https://www.imy.se/privatperson/dataskydd/dina-rattigheter/
            </StyledLink>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Nedan definieras dina rättigheter sammanfattningsvis
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
                textDecoration: "underline"
              }}
            >
              Rätt till tillgång (registerutdrag)
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green är alltid öppna och transparenta med hur vi
              behandlar personuppgifter. Vill du veta mer om vilka
              personuppgifter vi behandlar om just dig får du gärna kontakta oss
              för att få tillgång till dina uppgifter. Informationen lämnas ut i
              form av ett registerutdrag med beskrivning av ändamål, kategorier
              av personuppgifter, lagringsperioder och information om varifrån
              informationen har samlats in.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
                textDecoration: "underline"
              }}
            >
              Rätt till rättelse
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Du kan begära att dina personuppgifter rättas i det fall
              uppgifterna är uppenbart felaktiga. Inom ramen för det ändamålet
              har du också rätt att komplettera ofullständiga personuppgifter.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
                textDecoration: "underline"
              }}
            >
              Rätt till radering
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Du kan begära radering av personuppgifter vi behandlar om dig
              ifall:
              <ul>
                <li>
                  Uppgifterna inte längre är nödvändiga för de ändamål för vilka
                  de har samlats in eller behandlats.
                </li>
                <li>
                  Du invänder mot att dina personuppgifter används för
                  direktmarknadsföringsändamål.
                </li>
                <li>Personuppgifterna behandlas på ett olagligt sätt.</li>
              </ul>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
                textDecoration: "underline"
              }}
            >
              Rätt till begränsning
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Du har rätt att begära att vår behandling av dina personuppgifter
              begränsas. En begränsning kan göras av flera anledningar.
              <ul>
                <li>
                  Om du bestrider att personuppgifterna vi behandlar är korrekta
                  kan du begära en begränsad behandling under den tid vi arbetar
                  med att kontrollera huruvida personuppgifterna är korrekta.
                </li>
                <li>
                  Om du bestrider att vi raderar dina uppgifter. Det kan till
                  exempel bero på att du behöver uppgifterna vi har om dig för
                  att kunna fastställa, göra gällande eller försvara rättsliga
                  anspråk. I dessa fall kan du begära begränsad behandling av
                  uppgifterna hos oss.
                </li>
                <li>
                  Om du har invänt mot en intresseavvägning av berättigat
                  intresse som vi har gjort som rättslig grund för ett ändamål.
                  Då kan du begära begränsad behandling under den tid vi arbetar
                  med att kontrollera huruvida våra berättigade intressen väger
                  tyngre än dina intressen av att få uppgifterna raderade.
                </li>
              </ul>
              Om behandlingen har begränsats enligt någon av situationerna ovan
              får vi bara, utöver själva lagringen, behandla uppgifterna för att
              fastställa, göra gällande eller försvara rättsliga anspråk, för
              att skydda någon annans rättigheter eller ifall du har lämnat ditt
              samtycke.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light",
                textDecoration: "underline"
              }}
            >
              Rätt att göra invändningar mot viss typ av behandling
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Du har alltid rätt att tacka nej till direktmarknadsföring och att
              invända mot all behandling av personuppgifter som bygger på en
              intresseavvägning. En invändning kan göras utifrån två grunder:
              <ul>
                <li>
                  Intresseavvägning: i de fall vi använder en intresseavvägning
                  som rättslig grund för ett ändamål har du möjlighet att
                  invända mot behandlingen. För att kunna fortsätta behandla
                  dina personuppgifter efter en sådan invändning behöver vi
                  kunna visa ett tvingande berättigat skäl för den aktuella
                  behandlingen som väger tyngre än dina intressen, rättigheter
                  eller friheter. I annat fall får vi bara behandla uppgifterna
                  för att fastställa, utöva eller försvara rättsliga anspråk.
                </li>
                <li>
                  Direktmarknadsföring: du har möjlighet att invända mot att
                  dina personuppgifter behandlas för direktmarknadsföring.
                  Invändningen omfattar även de analyser av personuppgifter (så
                  kallad profilering) som utförs för
                  direktmarknadsföringsändamål. Med direktmarknadsföring avses
                  alla typer av uppsökande marknadsföringsåtgärder, till exempel
                  via post, e-post och sms
                </li>
              </ul>
              Om du invänder mot direktmarknadsföring kommer vi att upphöra med
              behandlingen av dina personuppgifter för det ändamålet och upphöra
              med alla typer av direktmarknadsföring.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              14. HUR SKYDDAS DINA PERSONPPGIFTER?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green använder IT-system för att skydda sekretessen,
              integriteten och tillgången till dina personuppgifter. Vi har
              vidtagit särskilda säkerhetsåtgärder för att skydda dina
              personuppgifter mot olovlig eller obehörig behandling (såsom
              olovlig tillgång, förlust, förstörelse eller skada). Endast de
              personer som faktiskt behöver behandla dina personuppgifter för
              att vi ska kunna uppfylla våra angivna ändamål har tillgång till
              dem.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              15. DATAINSPEKTIONEN ÄR TILLSYNSMYNDIGHET
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Datainspektionen är ansvarig för att övervaka tillämpningen av
              lagstiftningen. Den som anser att ett företag hanterar
              personuppgifter på ett felaktigt sätt kan lämna in ett klagomål
              till Datainspektionen.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Om en personuppgiftsincident uppkommer är vi skyldiga att anmäla
              det till Datainspektionen. En incident är en händelse som leder
              till oavsiktlig eller olaglig förstöring, förlust eller ändring av
              dina personuppgifter.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Det kan också vara fråga om en personuppgiftsincident ifall
              händelsen leder till obehörigt röjande av eller obehörig åtkomst
              till de behandlade personuppgifterna. Incidenten ska anmälas till
              Datainspektionen inom 72 timmar från det den upptäcktes.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              16. KONTAKTUPPGIFTER TILL WE CLEAN GREEN
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green är personuppgiftsansvarig för behandlingen av dina
              personuppgifter. Har du frågor om vår behandling eller önskar
              komma i kontakt med oss för att utöva dina rättigheter hittar du
              våra kontaktuppgifter nedan:
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "1.15rem", mt: 5, pt: 2 }}>
              We Clean Green Sweden AB
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Organisationsnummer: 559268-9565
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Tomtebogatan 5, 113 39 Stockholm
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              E-postadress: hello@cleangreen.se
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Telefonnummer: 08-30 74 14
            </Typography>

            <Typography variant="h4" sx={{ color: "primary.dark", mt: 5 }}>
              STÄDNING & KAKOR
            </Typography>
            <Typography variant="h3" sx={{ fontSize: "2.5rem", mt: 2 }}>
              WE CLEAN GREENS COOKIE POLICY
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              På We Clean Green är din integritet viktig. Att kunna lita på
              varandra är A och O!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              En cookie kan enklast beskrivas som en liten textfil sparas i
              besökarens webbläsare som gör det möjligt att känna igen en
              webbläsare. Enligt svensk och europeisk rätt krävs att We Clean
              Green informerar om vilka cookies som används samt deras syfte.
              Cookies innehåller ingen direkt identifierbar information som
              exempelvis namn, e-postadress, eller telefonnummer, utan endast
              information om aktivitet för den aktuella webbläsaren. Cookies
              bidrar också till intressebaserad reklam. Det vill säga att mer
              relevanta annonser exponeras för dig beroende på innehållet på de
              webbsidor du besökt.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Det finns två typer av cookies. Permanenta cookies sparar en fil
              under en längre tid på din dator. De används på vår webbplats för
              statistik och analys. Den andra typen av cookies kallas
              sessionscookies och de används under den tid du är aktiv på
              wecleangreen.se. Sessionscookies lagras inte under en längre tid
              på din dator, utan försvinner när du stänger din webbläsare
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green använder cookies för att kunna ge dig som läsare
              bättre service. Vi följer till exempel var på sajten eller appen
              du klickar. Det främsta skälet är att spara statistik och att
              kunna följa hur besökare navigerar på Wecleangreen.se och därmed
              bli vi mer relevanta. För We Clean Green är det viktigt att våra
              besökare upplever att vi värnar den personliga integriteten samt
              att vi tydligt tillgängliggör och lämnar så mycket information som
              möjligt om hur vi använder personuppgifter.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vill du stänga av användningen av cookies gör du det i
              inställningarna för din webbläsare. Mer information om cookies
              hittar du på MinaCookies.se. Läs mer
              <StyledLink
                href="http://www.minacookies.se/"
                rel="noopener noreferrer"
                target="_blank"
                variant="inherit"
                color="#395165"
              >
                (www.minacookies.se)
              </StyledLink>
              och i instruktionerna till den webbläsare du använder.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 3,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              COOKIES PÅ WECLEANGREEN.SE
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Ditt samtycke krävs för användning av cookies, dock inte för
              cookies som är nödvändiga för att möjliggöra den tjänst som du som
              användare själv har begärt. Du ger ditt samtycke genom att klicka
              i att du godkänner att webbplatsen använder sig av cookies. Ditt
              samtycke är helt frivilligt och du kan när som helst återkalla
              det. Väljer du att inte godkänna We Clen Greens användning av
              cookies kan vår webbsidas prestanda och funktionalitet komma att
              försämras eftersom vissa funktioner är beroende av cookies.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Nedan informerar vi de typer av cookies som vi använder på
              Wecleangreen.se
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              Nödvändiga
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Nödvändiga cookies hjälper oss att göra en Wecleangreen.se till en
              säker och användbar websida. Genom att aktivera grundläggande
              funktioner såsom sidnavigering möjliggörs åtkomst till säkra
              områden på hemsidan. Hemsidan kan inte fungera optimalt utan dessa
              cookies.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              Funktionella
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Funktionella cookies gör det möjligt att spara uppgifter som
              ändrar hemsidans utseende eller funktioner till exempel ditt
              föredragna språk eller de region som du befinner dig i.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              Statistiska
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Statistiska cookies hjälper oss att förstå hur besökare
              interagerar med hemsidan, genom att samla in och rapportera
              uppgifter.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              Marknadsföring
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Marketingcookies används för att spåra besökare gränsöverskridande
              på hemsidor. Avsikten är att visa annonser som är relevanta och
              engagerande för den enskilda användaren och därmed vara mer
              värdefulla för utgivare och tredjepartsannonsörer
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              VILKA COOKIES ANVÄNDER VI TILL VAD?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Översikt över We Clean Greens använda cookies
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              Namn, Gallringstid, Användning
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              KAN VI UPPDATERA DENNA COOKIEPOLICY?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              We Clean Green kan komma uppdatera denna cookiepolicy emellanåt
              för att återspegla, till exempel, förändringar av cookies som vi
              använder eller för andra operativa, juridiska eller
              lagstiftningsmässiga skäl. Besök därför denna cookiepolicy
              regelbundet för att hålla dig informerad om vår användning av
              cookies och liknande teknik.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                pt: 2,
                fontSize: "1.15rem",
                borderBottom: 1,
                borderBottomColor: "secondary.light"
              }}
            >
              HUR KOMMER DU I KONTAKT MED OSS?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Du är alltid välkommen att kontakta oss om du har frågor om hur vi
              använder oss av cookies. Du hittar du våra kontaktuppgifter nedan:
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "1.15rem", mt: 5, pt: 2 }}>
              We Clean Green Sweden AB
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Organisationsnummer: 559268-9565
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Tomtebogatan 5, 113 39 Stockholm
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              E-postadress: hello@cleangreen.se
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Telefonnummer: 08-30 74 14
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PrivacyPolicy;

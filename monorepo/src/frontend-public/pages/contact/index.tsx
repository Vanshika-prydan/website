import Head from "next/head";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  Link,
  useMediaQuery,
  useTheme
} from "@mui/material";

const Item = (props: any) => {
  const { sx, gridColumn, children } = props;
  return (
    <Box
      sx={{
        color: "text.primary",
        p: 1,
        ...sx
      }}
      gridColumn={gridColumn}
    >
      {children}
    </Box>
  );
};

export const contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("contact_meta_title")}</title>
        <meta name="description" content={t("Vi på We Clean Green bryr oss om att alla i hemmet – barn såväl som husdjur och föräldrar - ska kunna leva i ett hem fritt från farliga kemikalier. För vi siktar inte bara på noll miljöpåverkan – vi ska göra ditt hem grönare, friskare och renare på riktigt!")} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="//wecleangreen.se/images/meta-3.png"
        />
        <meta property="og:url" content={t("Ekologisk Städhjälp i Stockholm – Boka städning enkelt i appen!")}/>
        <meta property="og:title"  />
        <meta
          property="og:description"
          content={t("contact_meta_description")}
        />
      </Head>
      <Box>
        <Box
          sx={{
            height: 350,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: "url(/images/Contact-filter.jpg)"
          }}
        />
        <Container maxWidth="md">
          <Box
            sx={{
              display: isMobile ? "block" : "grid",
              gap: 1,
              mb: 10,
              mt: 6,
              pb: 5,
              gridTemplateColumns: "repeat(3, 1fr)"
            }}
          >
            <Item>
              <Box sx={{ mt: -2 }}>
                <img
                  src="/images/logo-green.svg"
                  width={250}
                  alt="Contact Logo"
                />
              </Box>
              <Typography variant="h5" sx={{ mt: 4 }}>
                Kontaktuppgifter
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <Link
                  href="tel:08-343910"
                  variant="inherit"
                  underline="none"
                  color="text.primary"
                >
                  08-30 74 14
                </Link>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <Link
                  href="mailto:hej@cleangreen.se"
                  variant="inherit"
                  underline="none"
                  color="text.primary"
                >
                  hej@cleangreen.se
                </Link>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Tomtebogatan 5<br />
                113 39 Stockholm
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Link
                  variant="inherit"
                  underline="none"
                  color="text.primary"
                  sx={{ pt: 2, display: "inline-block" }}
                  href="https://www.instagram.com/Wecleangreensweden/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/CG-instagram.svg"
                    height={25}
                    alt="Instagram"
                    style={{ marginRight: 10 }}
                  />
                </Link>
                <Link
                  variant="inherit"
                  underline="none"
                  color="text.primary"
                  sx={{ pt: 2, display: "inline-block" }}
                  href="https://www.facebook.com/wecleangreensweden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/CG-facebook.svg"
                    height={25}
                    alt="Facebook"
                    style={{ marginRight: 10 }}
                  />
                </Link>
                <Link
                  variant="inherit"
                  underline="none"
                  color="text.primary"
                  sx={{ pt: 2, display: "inline-block" }}
                  href="https://www.linkedin.com/company/we-clean-green-sweden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/CG-linkedin.svg"
                    height={25}
                    alt="Linkedin"
                    style={{ marginRight: 10 }}
                  />
                </Link>
              </Box>
            </Item>
            <Item gridColumn="span 2">
              <iframe
                title="Contact Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.5041968089347!2d18.034135215649705!3d59.341231117110866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d798a5136c5%3A0x35aa761c9e776987!2sTomtebogatan%205%2C%20113%2039%20Stockholm%2C%20Sweden!5e0!3m2!1sen!2sin!4v1633424490809!5m2!1sen!2sin"
                width="100%"
                style={{ border: 0 }}
                height="300"
                loading="lazy"
              />
            </Item>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default contact;

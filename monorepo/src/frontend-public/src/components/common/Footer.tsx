import { useMediaQuery, useTheme, Link, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import PlayStoreLinks from "./playstore-links";
import FooterLinksData from "../../data/footer-links.json";
import { FooterLinkModal } from "../../interface/footerLink";
import Item from "./ItemContainer";
import { StyledLink } from './theme'
import { MainContainer } from "./Containers";
import CookiesModal from "../CookiesModal";

interface FooterLinkProps {
  link: string;
  children: any;
  target?: string;
  display?: string;
}

const FooterLink = ({ link, children, target = "_self", display = "block" }: FooterLinkProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display }}>
      <StyledLink
        variant="inherit"
        underline="none"
        color="text.primary"
        sx={{ pt: 2, display: "inline-block" }}
        href={link}
        target={target}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "auto",
          }}
        >
          {children}
        </Box>
      </StyledLink>
    </Box>
  );
}
export const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MainContainer>
      <Box
        sx={{
          display: "grid",
          pt: 5,
          textAlign: isMobile ? "center" : "left"
        }}
        key="footer_1"
      >
        <Item>
          <Link href="/" title="We Clean Green">
            <img alt="Logo" src="/images/logo-green.svg" width={250} />
          </Link>
          {!isMobile && <Box
            sx={{
              my: 1,
              pt: 2,
            }}
          >
            <PlayStoreLinks />
          </Box>}
        </Item>
      </Box>
      <Box
        key="footer_2"
        sx={{
          display: isMobile ? "block" : "grid",
          pb: isMobile ? 3 : 5,
          mt: isMobile ? 4 : 1,
          textAlign: isMobile ? "center" : "left",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Item>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, }} id="contact">
            {t("footer_category_main_one")}
          </Typography>
          {FooterLinksData.FooterContact.map((linkItem: FooterLinkModal) => {
            if (linkItem.target === "hr") {
              return isMobile ? <Box
                key={`hr${linkItem.id}`}
                sx={{
                  borderBottom: 1,
                  mt: 2,
                  mb: 2,
                  borderColor: "secondary.light",
                }}
              /> : null
            }
            return (

              <FooterLink key={linkItem.id.toString()} link={linkItem.linkURL} target={linkItem.target ? linkItem.target : "_self"} display={isMobile && linkItem.icon !== "" ? "inline-block" : "block"} >
                {linkItem.icon && linkItem.icon !== "" && (
                  <img
                    src={linkItem.icon}
                    height={isMobile ? 30 : 20}
                    alt={linkItem.title}
                    style={{ marginRight: 10, }}
                  />
                )}
                {isMobile && linkItem.icon !== "" ? <></> :
                  <Box>
                    <Typography variant="subtitle1" sx={{ pt: linkItem.icon && linkItem.icon !== "" ? 1 : 0, mt: -1, }}>
                      {linkItem.title}
                    </Typography>
                  </Box>}
              </FooterLink>
            );
          })}
        </Item>
        <Item>
          <Box
            sx={{
              display: isMobile ? "block" : "grid",
              pb: isMobile ? 0 : 5,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Item sx={{ mt: isMobile ? 1.5 : 0, pt: isMobile ? 4 : 0, borderTop: isMobile ? 1 : 0, borderColor: "secondary.light" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, }}>
                {t("footer_category_main_two")}
              </Typography>
              {FooterLinksData.FooterServices.map((linkItem: FooterLinkModal) =>
                <FooterLink key={linkItem.id.toString()}
                  target={linkItem.target ? linkItem.target : "_self"}
                  link={linkItem.linkURL}>

                  {linkItem.icon && linkItem.icon !== "" && (
                    <img
                      src={linkItem.icon}
                      width={20}
                      alt={linkItem.title}
                      style={{ marginRight: 10 }}
                    />
                  )}
                  {linkItem.title}
                </FooterLink>
              )}
            </Item>
            <Item sx={{ mt: isMobile ? 4 : 0, pt: isMobile ? 4 : 0, borderTop: isMobile ? 1 : 0, borderColor: "secondary.light" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, }}>
                {t("footer_category_main_three")}
              </Typography>
              {FooterLinksData.FooterAboutUs.map((linkItem: FooterLinkModal) =>
                <FooterLink key={linkItem.id.toString()} link={linkItem.linkURL} target={linkItem.target ? linkItem.target : "_self"}>
                  {linkItem.icon && linkItem.icon !== "" && (
                    <img
                      src={linkItem.icon}
                      width={20}
                      alt={linkItem.title}
                      style={{ marginRight: 10 }}
                    />
                  )}
                  {linkItem.title}
                </FooterLink>
              )}
            </Item>
          </Box>
        </Item>
      </Box>
      <Box
        key="footer_3"
        sx={{
          display: isMobile ? "block" : "flex",
          textAlign: isMobile ? "center" : "left",
          mb: 2,
          pb: 3,
          pt: isMobile ? 4 : 0, borderTop: isMobile ? 1 : 0, borderColor: "secondary.light"
        }}
      > <img
          src="/images/CG-leaf-green.svg"
          width={15}
          alt="Green Leaf"
          style={{
            marginRight: isMobile ? 5 : 5,
            marginLeft: isMobile ? 15 : 0,
          }}
        />
        <Item>
          {t("footer_copyright_text")}
        </Item>
      </Box>
      <CookiesModal />
    </MainContainer>
  );
}

FooterLink.defaultProps = {
  target: "_self",
  display: "block"
}
export default Footer;
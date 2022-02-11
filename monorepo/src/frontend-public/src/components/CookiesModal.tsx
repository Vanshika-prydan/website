import React, { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Link } from "@mui/material";
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CookieService from '../services/cookie-service';

import MUISwitch from "./Switch";
import Item from "./common/ItemContainer";
import { StyledLink } from "./common/theme";
import { AccordionItem, WCGAccordion } from './Accordion';
import {
  StyledButtonOK, StyledButtonNSC, StyledButtonAllow, WCGAccordionSummary, WeUseTypography, CookiesTypography, DetailsTypography, MUISwitchTypography, MUISwitchItem, ButtonContainer, DetailsItem, BoxItem,
  WCGAccordionSummaryInner, StyledDialog, HR
} from "./Style";


const TransitionFun = (
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
  // eslint-disable-next-line react/jsx-props-no-spreading
) => <Slide direction="up" ref={ref} {...props} />;
const Transition = React.forwardRef(TransitionFun);

const CookiesModal = () => {
  const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true); //please keep it for now
  // const handleClose = () => setOpen(false); //please keep it for now
  const [showDesc, setShowDesc] = useState(false);
  const [isShowOk, setIsShowOk] = useState(false);
  const [isNecessaryOk] = useState(true);
  const [isFunctionalOk, setIsFunctionalOk] = useState(false);
  const [isStatisticsOk, setIsStatisticsOk] = useState(false);
  const [isMarketingOk, setIsMarketingOk] = useState(false);

  const isAllowAll = () => {
    CookieService.setIsAll(true);
    setOpen(false);
  }
  
  useEffect(() => {
    CookieService.defaultLoad();
    return () => { };
  }, [])

  if (CookieService.IsSetCookie()) {
    return null;
  }

  const toggleOk = () => {
    if (isShowOk) {
      CookieService.setIsSetCookie(true);
      if (isFunctionalOk && isStatisticsOk && isMarketingOk) {
        CookieService.setIsAll(true);
      } else {
        CookieService.setIsAll(false);
        CookieService.setIsFunctional(isFunctionalOk);
        CookieService.setIsStatistics(isStatisticsOk);
        CookieService.setIsMarketing(isMarketingOk);
      }
      setOpen(false);
    } else {
      setIsShowOk(!isShowOk);
    }
  }
  return (
    <>
      <StyledDialog
        sx={{ zIndex: 9999 }}
        TransitionComponent={Transition}
        open={open}
        // onClose={handleClose}
        className='cookieModal'
      >
        <Box>
          <BoxItem>
            <Link href="/" title="We Clean Green">
              <img alt="Logo" src="/images/logo-green.svg" width={140} />
            </Link>
          </BoxItem>
          <Item>
            <CookiesTypography
              variant="h6" >
              VI ANVÄNDER COOKIES
            </CookiesTypography>
          </Item>
          <Item >
            <WeUseTypography
              variant="body1" >
              Vi använder och analyserar cookies för att kunna ge dig ett personligt, anpassat innehåll och för att kunna marknadsföra saker som vi tror att du gillar. Genom att klicka på”Tillåt cookies”godkänner du vårt användande av cookies, eller så kan du anpassa dem nedan. Läs mer om hur vi hanterar cookies
              <StyledLink
                href="https://cleangreen.se/privacy-policy/index.html"
                rel="noopener noreferrer"
                target="_blank"
                variant="inherit"
                color="#395165"
              >
                här
              </StyledLink>.
            </WeUseTypography>
          </Item>
          <ButtonContainer>
            {isShowOk ? <StyledButtonOK onClick={toggleOk}
              disableElevation
            >
              OK
            </StyledButtonOK> :
              <StyledButtonNSC onClick={toggleOk}
                disableElevation
              >
                ENDAST NÖDVÄNDIGA COOKIES
              </StyledButtonNSC>
            }
            <StyledButtonAllow
              disableElevation
              onClick={isAllowAll}>
              TILLÅT COOKIES
            </StyledButtonAllow>
          </ButtonContainer>
          <DetailsItem >
            {showDesc ?
              <DetailsTypography onClick={() => setShowDesc(false)}
                variant="subtitle2">
                Göm detaljer
              </DetailsTypography>
              :
              <DetailsTypography onClick={() => setShowDesc(prev => !prev)}
                variant="subtitle2">
                Visa detaljer
              </DetailsTypography>
            }
          </DetailsItem>
          {showDesc &&
            <Box sx={{ maxHeight: 300, overflow: "auto" }} >
              <WCGAccordion >
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}>
                  <AccordionItem title="Nodvandiga" descType='DARK'> Nödvändiga cookies hjälper dig att göra en hemsida användbar, genom att aktivera grundläggande funktioner såsom sidnavigering åtkomst till säkra områden på hemsidan. Hemsidan kan inte fungera optimalt utan dessa cookies.</AccordionItem>
                </WCGAccordionSummary>
                <WCGAccordionSummaryInner>
                  <AccordionItem title="Data Processor:" descType='MEDIUM' >Cookie Information</AccordionItem>
                </WCGAccordionSummaryInner>
                <WCGAccordionSummaryInner  >
                  <AccordionItem title="Ändamål:" titleType='SM' descType='LEIGHT'> Stödjer webbplatsens tekniska funktioner</AccordionItem>
                </WCGAccordionSummaryInner>
                <WCGAccordionSummaryInner>
                  <AccordionItem title="Data Processor:" descType='LINK' titleType='SM' >
                    <StyledLink
                      href="https://cleangreen.se/privacy-policy/index.html"
                      color="#395165"
                    >
                      https://cleangreen.se/privacy-policy/index.html
                    </StyledLink>
                  </AccordionItem>
                </WCGAccordionSummaryInner>
                <WCGAccordionSummaryInner>
                  <AccordionItem title="Upphör::" titleType='SM' descType='LIGHT'>ett år</AccordionItem>
                </WCGAccordionSummaryInner>
                <WCGAccordionSummaryInner>
                  <AccordionItem title="Utfärdare:" titleType='SM' descType='LIGHT'>Utfärdare</AccordionItem>
                </WCGAccordionSummaryInner>
                <WCGAccordionSummaryInner>
                  <AccordionItem title="Namn:" titleType='SM' descType='LIGHT'>www.cleangreen.se</AccordionItem>
                </WCGAccordionSummaryInner>
                <HR />
              </WCGAccordion>
              <WCGAccordion >
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header">
                  <AccordionItem title="Funktionella" descType='DARK'>Funktionella cookies gör det möjligt att spara uppgifter som ändrar hemsidans utseende eller funktioner. T.ex ditt föredragna språk eller de region som du befinner dig i.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
              <WCGAccordion >
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header">
                  <AccordionItem title="Statistiska" descType='DARK'>Statistiska cookies hjälper hemsidans ägare att förstå hur besökare interagerar med hemsidan, genom att samla in och rapportera uppgifter.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
              <WCGAccordion>
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header">
                  <AccordionItem title="Marketing" descType='DARK'>Marketingcookies används för att spåra besökare gränsöverskridande på hemsidor. Avsikten är att visa annonser som är relevanta och engagerande för den enskilda användaren och därmed vara mer värdefulla för utgivare och tredjepartsannonsörer.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
              <WCGAccordion >
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header">
                  <AccordionItem title="Oklassificerade" descType='DARK'>Oklassificerade cookies håller vi på att klassificera tillsammans med leverantörerna av leverantörerna av dessa cookies.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
            </Box>
          }
          <Box  >
            <MUISwitchItem
            >
              <Item >
                <MUISwitchTypography>Nödvändiga</MUISwitchTypography>
                <MUISwitch disabled checked={isNecessaryOk} onChange={() => {
                }}
                />
              </Item>
              <Item>
                <MUISwitchTypography >Funktionella</MUISwitchTypography>
                <MUISwitch checked={isFunctionalOk} onChange={(e) => {
                  setIsShowOk(e.target.checked);
                  setIsFunctionalOk(e.target.checked);
                  if (!e.target.checked) {
                    setIsStatisticsOk(e.target.checked);
                    setIsMarketingOk(e.target.checked);
                  }
                }}
                />
              </Item>
              <Item  >
                <MUISwitchTypography>Statistka </MUISwitchTypography>
                <MUISwitch checked={isStatisticsOk} onChange={(e) => {
                  if (isFunctionalOk) {
                    setIsStatisticsOk(e.target.checked);
                  }
                }}
                />
              </Item>
              <Item >
                <MUISwitchTypography >Marketing </MUISwitchTypography>
                <MUISwitch checked={isMarketingOk} onChange={(e) => {
                  if (isFunctionalOk) {
                    setIsMarketingOk(e.target.checked);
                  }
                }}
                />
              </Item>
            </MUISwitchItem>
          </Box>
        </Box>

      </StyledDialog>
    </>
  );
}

export default CookiesModal;

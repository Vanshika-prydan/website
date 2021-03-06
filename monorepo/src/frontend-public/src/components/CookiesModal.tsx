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
              VI ANV??NDER COOKIES
            </CookiesTypography>
          </Item>
          <Item >
            <WeUseTypography
              variant="body1" >
              Vi anv??nder och analyserar cookies f??r att kunna ge dig ett personligt, anpassat inneh??ll och f??r att kunna marknadsf??ra saker som vi tror att du gillar. Genom att klicka p?????Till??t cookies???godk??nner du v??rt anv??ndande av cookies, eller s?? kan du anpassa dem nedan. L??s mer om hur vi hanterar cookies
              <StyledLink
                href="https://cleangreen.se/privacy-policy/index.html"
                rel="noopener noreferrer"
                target="_blank"
                variant="inherit"
                color="#395165"
              >
                h??r
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
                ENDAST N??DV??NDIGA COOKIES
              </StyledButtonNSC>
            }
            <StyledButtonAllow
              disableElevation
              onClick={isAllowAll}>
              TILL??T COOKIES
            </StyledButtonAllow>
          </ButtonContainer>
          <DetailsItem >
            {showDesc ?
              <DetailsTypography onClick={() => setShowDesc(false)}
                variant="subtitle2">
                G??m detaljer
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
                  <AccordionItem title="Nodvandiga" descType='DARK'> N??dv??ndiga cookies hj??lper dig att g??ra en hemsida anv??ndbar, genom att aktivera grundl??ggande funktioner s??som sidnavigering ??tkomst till s??kra omr??den p?? hemsidan. Hemsidan kan inte fungera optimalt utan dessa cookies.</AccordionItem>
                </WCGAccordionSummary>
                <WCGAccordionSummaryInner>
                  <AccordionItem title="Data Processor:" descType='MEDIUM' >Cookie Information</AccordionItem>
                </WCGAccordionSummaryInner>
                <WCGAccordionSummaryInner  >
                  <AccordionItem title="??ndam??l:" titleType='SM' descType='LEIGHT'> St??djer webbplatsens tekniska funktioner</AccordionItem>
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
                  <AccordionItem title="Upph??r::" titleType='SM' descType='LIGHT'>ett ??r</AccordionItem>
                </WCGAccordionSummaryInner>
                <WCGAccordionSummaryInner>
                  <AccordionItem title="Utf??rdare:" titleType='SM' descType='LIGHT'>Utf??rdare</AccordionItem>
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
                  <AccordionItem title="Funktionella" descType='DARK'>Funktionella cookies g??r det m??jligt att spara uppgifter som ??ndrar hemsidans utseende eller funktioner. T.ex ditt f??redragna spr??k eller de region som du befinner dig i.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
              <WCGAccordion >
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header">
                  <AccordionItem title="Statistiska" descType='DARK'>Statistiska cookies hj??lper hemsidans ??gare att f??rst?? hur bes??kare interagerar med hemsidan, genom att samla in och rapportera uppgifter.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
              <WCGAccordion>
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header">
                  <AccordionItem title="Marketing" descType='DARK'>Marketingcookies anv??nds f??r att sp??ra bes??kare gr??ns??verskridande p?? hemsidor. Avsikten ??r att visa annonser som ??r relevanta och engagerande f??r den enskilda anv??ndaren och d??rmed vara mer v??rdefulla f??r utgivare och tredjepartsannons??rer.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
              <WCGAccordion >
                <WCGAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ my: 1.5, fontSize: 20 }} />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header">
                  <AccordionItem title="Oklassificerade" descType='DARK'>Oklassificerade cookies h??ller vi p?? att klassificera tillsammans med leverant??rerna av leverant??rerna av dessa cookies.</AccordionItem>
                </WCGAccordionSummary>
              </WCGAccordion>
            </Box>
          }
          <Box  >
            <MUISwitchItem
            >
              <Item >
                <MUISwitchTypography>N??dv??ndiga</MUISwitchTypography>
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

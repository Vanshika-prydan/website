import { Button, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";

export const StyledButton = styled(Button)`
  border: 1px solid #395165;
  font-size: 13.9px;
  border-radius: 25px;
  padding: 2.5px;
  height: 50px;
  width: 200px;
  margin-left: 15px;
  margin-right: 15px;
`;

export const StyledButtonOK = styled(StyledButton)`
  color: #395165;
  color: #395165;
  &:hover {
    color: #fff;
    background-color: #395165;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    height: 45px;
    width: 250px;
    margin: 0;
    top: 50%;
    margin-left: 5px;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;

export const StyledButtonNSC = styled(StyledButton)`
  color: #395165;
  &:hover {
    color: #fff;
    background-color: #395165;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    height: 45px;
    width: 250px;
    margin: 0;
    top: 50%;
    margin-left: 5px;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;

export const StyledButtonAllow = styled(StyledButton)`
  background-color: #273744;
  color: #fff;
  &:hover {
    color: #fff;
    background-color: #395165;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    height: 45px;
    width: 250px;
    margin-top: 90px;
    margin: 0;
    margin-left: 5px;
    margin-bottom: 25px;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;

export const WCGAccordionSummary = styled(AccordionSummary)`
  flex-direction: row-reverse;
  align-items: start;
  ${(props) => props.theme.breakpoints.down("lg")} {
    .MuiAccordionSummary-content {
      display: block !important;
    }
  }
  .Mui-expanded p {
    border-bottom: 1px Solid #395165;
  }
`;

export const NecessaryTypography = styled("div")`
  padding-left: 90px;
  font-size: 13px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    margin-left: -22px;
    margin-top: 5px;
  }
`;

export const FunctionalTypography = styled("div")`
  padding-left: 100px;
  font-size: 13px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    margin-left: -22px;
    margin-top: 5px;
  }
`;

export const StatisticsTypography = styled("div")`
  padding-left: 110px;
  font-size: 13px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    margin-left: -22px;
    margin-top: 5px;
  }
`;

export const MarketingTypography = styled("div")`
  padding-left: 110px;
  font-size: 13px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    margin-left: -22px;
    margin-top: 5px;
  }
`;

export const UnclassifiedTypography = styled("div")`
  padding-left: 70px;
  font-size: 13px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    margin-left: -22px;
    margin-top: 5px;
  }
`;

export const DetailsItem = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  padding-top: 15px;
`;

export const BoxItem = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    margin-top: 20px;
  }
`;

export const DataTypography = styled("div")`
  width: 35%;
  padding-left: 20px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    width: 34%;
  }
`;

export const InformationTypography = styled("div")`
  width: 37%;
  padding-left: 25px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    width: 42%;
  }
`;

export const PrivacyTypography = styled(Typography)`
  width: 42%;
  padding-left: 25px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    width: 89%;
  }
`;

export const PurposeTypography = styled(Typography)`
  width: 34%;
  padding-left: 25px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    width: 67%;
  }
`;

export const WcgTypography = styled(Typography)`
  color: #395165;
  opacity:0.6;
  padding-left:20px; 
     ${(props) => props.theme.breakpoints.down("lg")} {
       padding-right:10px;
    `;

export const CookiesTypography = styled(Typography)`
  text-align: center;
  margin-top: 15px;
`;

export const WeUseTypography = styled(Typography)`
  padding: 10px;
  font-size: 13px;
  padding-top: 5px;
  color: "#424D34 ";
  margin-right: 10px;
  text-align: center;
`;

export const DetailsTypography = styled(Typography)`
  opacity: 0.6;
  padding-bottom: 30px;
  font-size: 13px;
`;

export const MUISwitchTypography = styled(Typography)`
  font-size: 14px;
  padding-left: 5px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding-left: 5px;
  }
`;

export const MUISwitchItem = styled("div")`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  color: #000;
  ${(props) => props.theme.breakpoints.down("lg")} {
    grid-template-columns: repeat(2, 0.4fr);
    margin-left: 50px;
    margin-top: 1px;
  }
`;

export const ButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
     ${(props) => props.theme.breakpoints.down("lg")} {
       display: grid;
`;

export const TitleContainer = styled("div")`
  width: 30%;
  ${(props) => props.theme.breakpoints.down("lg")} {
    display: block !important;
    width: 100% !important;
  }
`;

export const TitleContainerInner = styled("div")`
  display: flex;
`;

export const DescriptionContainer = styled("div")`
  width: 60%;
  ${(props) => props.theme.breakpoints.down("lg")} {
    display: block !important;
    width: 100% !important;
    padding-top: 7px;
  }
`;

export const MUIAccordionTitle = styled(Typography)`
  font-size: 16px;
  ${(props) => props.theme.breakpoints.down("lg")} {
  }
`;

export const MUIAccordionTitleSM = styled(Typography)`
  font-size: 14px;
  ${(props) => props.theme.breakpoints.down("lg")} {
  }
`;

export const MUIAccordionDescLight = styled(Typography)`
  opacity: 0.7;
  font-weight: 200;
  font-size: 15px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    display: inline-block;
    padding-bottom: 5px;
  }
`;

export const MUIAccordionDescDark = styled(Typography)`
  font-weight: 300;
  font-size: 14px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    display: inline-block;
  }
`;

export const MUIAccordionDescLink = styled(Typography)`
  font-weight: 400;
  opacity: 0.9;
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding-bottom: 5px;
  }
`;

export const MUIAccordionDescMedium = styled(Typography)`
  font-weight: 400;
  font-size: 15px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding-bottom: 5px;
  }
`;

export const WCGAccordionSummaryInner = styled(AccordionSummary)`
  margin-left: 25px;
  margin-bottom: -18px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    display: block;

    .MuiAccordionSummary-content {
      display: block !important;
      padding-top: 6px;
    }
  }
  .Mui-expanded {
    p {
      border: 1px Solid #000;
      display: flex;
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  z-index: 9999;
  .MuiBackdrop-root {
    background-color: #395165;
    opacity: 0.8 !important;
  }
  .MuiDialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    align-items: flex-start;

    .MuiPaper-rounded {
      border-radius: 50px;
      overflow: unset;
      max-height: fit-content;

      > .MuiBox-root {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        border-radius: 3rem;
        outline: 0;
      }
    }
  }
`;

export const BoxInnerContainer = styled("div")`
position: absolute;
bottom:  5px;
${(props) => props.theme.breakpoints.down("lg")} {
      position: inherit; 
`;

export const BoxContainer = styled("div")`
  position: relative;
    ${(props) => props.theme.breakpoints.down("lg")} {
      position: none; 
`;

export const BannerContainer = styled("div")`
 background-color: #fff;
 height:  470px ;
 width:  500px;
 border-top-left-radius: 30px;
 border-top-right-radius: 30px;
 margin-left: -20px !important;
 padding-left: 30px !important;
 padding-top: 35px !important;
   ${(props) => props.theme.breakpoints.down("lg")} {
   height:100%;
 width:100%; 
 margin-left: 0px;
 padding-left: 0px;
 padding-top:0px;
`;

export const MainTypography = styled(Typography)`
margin-bottom: 50px; 
font-size: 20px;
margin-top:15px;
    ${(props) => props.theme.breakpoints.down("lg")} {
        margin-bottom: 10px; 
`;

export const TextBox = styled("div")`
padding-top: 16px;
text-align :left;
${(props) => props.theme.breakpoints.down("lg")} {
      padding-top: 16px;
      text-align :center;
`;

export const TextTypography = styled("div")`
  margin-bottom: 20px;
`;

export const ButtonTypography = styled("div")`
  margin-bottom: 20px;
`;

export const HR = styled("div")`
  border-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #395165;
  width: 80%;
  margin: auto;
  opacity: 0.2;
  margin-top: 40px;
`;

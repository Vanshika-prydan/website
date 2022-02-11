import React from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/system";
import {
  MUIAccordionTitle,
  MUIAccordionDescLight,
  MUIAccordionDescDark,
  MUIAccordionDescLink,
  TitleContainer,
  DescriptionContainer,
  MUIAccordionDescMedium,
  MUIAccordionTitleSM,
  TitleContainerInner
} from "./Style";

export interface AccordionItemProps {
  title: string;
  titleType?: "SM" | "LG";
  descType?: "DARK" | "LIGHT" | "LINK" | "MEDIUM";
}

export const AccordionItem: React.FunctionComponent<AccordionItemProps> = ({
  title,
  titleType = "LG",
  descType = "DARK",
  children
}) => (
  <>
    <TitleContainer>
      <TitleContainerInner>
        {titleType === "LG" && <MUIAccordionTitle > {title}</MUIAccordionTitle>}
        {titleType === "SM" && <MUIAccordionTitleSM> {title}</MUIAccordionTitleSM>}
      </TitleContainerInner>
    </TitleContainer>
    <DescriptionContainer>
      {descType === "DARK" && (
        <MUIAccordionDescDark variant="subtitle2">
          {children}
        </MUIAccordionDescDark>
      )}
      {descType === "LIGHT" && (
        <MUIAccordionDescLight variant="subtitle2">
          {children}
        </MUIAccordionDescLight>
      )}
      {descType === "LINK" && (
        <MUIAccordionDescLink variant="subtitle2">
          {children}
        </MUIAccordionDescLink>
      )}
      {descType === "MEDIUM" && (
        <MUIAccordionDescMedium variant="subtitle2">
          {children}
        </MUIAccordionDescMedium>
      )}
    </DescriptionContainer>
  </>
);

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square className={props.className} >{props.children}</MuiAccordion>
))({
  border: `0px solid `,
  "&:not(:last-child)": {
    borderBottom: 0,

  },
  "&:before": {
    display: "none",

  }
});
// AccordionItem.defaultProps = {
//   descType: 'LIGHT',
//   titleType: 'LG',
// };

export const WCGAccordion = styled(Accordion)`
  background-color: #39516519;
  padding-top: 25px;
  `;

export default Accordion;

import { Typography } from "@mui/material";

type TypoGraphyProps = {
  children: any;
};

export const WCGPageHeading = ({ children }: TypoGraphyProps) =>  <Typography variant="h4" sx={{ color: "primary.dark", mt: 2 }}>{children}</Typography>;

export default { WCGPageHeading };
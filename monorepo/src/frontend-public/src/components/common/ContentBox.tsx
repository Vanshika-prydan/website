import { Box, useMediaQuery, useTheme } from "@mui/material";

const ContentBox = (props: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { children } = props;
  return <Box sx={{p:3, backgroundColor:"secondary.main", borderRadius: isMobile ? 2:4,width:"auto", margin:"auto",}}>{children}</Box>;
}

export default ContentBox;

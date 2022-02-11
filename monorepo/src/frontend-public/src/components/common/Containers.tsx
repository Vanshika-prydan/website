import { Paper, useMediaQuery, useTheme, Container, Box } from "@mui/material";

type ContainerProps = {
  children: any;
};

export const PaperContainer = ({ children }: ContainerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={0}
      sx={{
        pt: 12,
        borderRadius: 0,
        position: "relative",
         backgroundColor: "grey.500",
        height: isMobile ? 1050 : 660,
        overflow: "hidden",
         }}
    >
      {children}
    </Paper>
  );
};

export const MainContainer = ({ children }: ContainerProps) => <Container maxWidth="lg">{children}</Container>;

export const MediumContainer = ({ children }: ContainerProps) => <Container maxWidth="md">{children}</Container>;


export const BannerRightImageContainer = () =>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return <Box
    sx={{
      position: "absolute",
      top: isMobile ? "auto" : 0,
      bottom: isMobile ? 0 : "auto",
      right: isMobile ? "auto" : 0,
      height: isMobile ? "50%" : "100%",
      width: isMobile ? "100%" : "40%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(/images/banner-img.jpg)`,
    
    }}
  />    
}
export default { MainContainer, PaperContainer, BannerRightImageContainer, MediumContainer};
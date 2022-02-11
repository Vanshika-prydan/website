import {
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { ServiceModal } from "../interface/services";
import Item from "./common/ItemContainer";
import { MainContainer } from "./common/Containers";

interface ServiceProps {
  serviceItem: ServiceModal;
}
interface ServiceBoxProps {
  children: any;
  position: "left-top" | "left-bottom" | "right-top" | "right-bottom";
}

function ServiceBox({ children, position }: ServiceBoxProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let boxSXProps: any = { marginTop: 4 };
  if (position === "left-top") {
    boxSXProps = { marginTop: -17 };
  } else if (position === "right-top") {
    boxSXProps = { marginTop: -17, marginLeft: "auto" };
  } else if (position === "right-bottom") {
    boxSXProps = { marginTop: 4, marginLeft: "auto" };
  }

  if (isMobile) {
    boxSXProps = { margin: "auto" };
  }

  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        borderRadius: 3,
        p: 4,
        // ml: ,
        maxWidth: 370,

        ...boxSXProps,
      }}
    >
      {" "}
      {children}
    </Box>
  );
}

export default function Service({ serviceItem }: ServiceProps) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let pb = 12;
  if (isMobile) {
    pb = 2;
  } else if (
    serviceItem.position === "left-bottom" ||
    serviceItem.position === "right-bottom"
  ) {
    pb = 25;
  }
  return (
    <Box
      sx={{
        pt: 8,
        pb,
        textAlign: "left",
      }}
      id={`${serviceItem.slug}`}
    >
      {" "}
      <Box
        sx={{
          height: isMobile ? "auto" : 380,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${serviceItem.image})`,
        }}
      >
        <MainContainer>
          <Box
            sx={{
              display: isMobile ? "block" : "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
              pt: isMobile ? 6 : 0,
              pb: isMobile ? 5 : "auto",
            }}
          >
            <Item>
              {(serviceItem.position === "left-bottom" ||
                serviceItem.position === "left-top") && (
                <ServiceBox position={serviceItem.position}>
                  <img
                    src={serviceItem.icon}
                    alt={serviceItem.title}
                    width={120}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.45,
                      fontSize: 21,
                      color:"primary.dark"
                    }}
                  >
                    {serviceItem.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.45,
                      fontSize: 25,
                      pb: 1,
                    }}
                  >
                    {serviceItem.subtitle}
                  </Typography>
                  {serviceItem.description &&
                    serviceItem.description.map((desc: string, index) => (
                      <Typography
                        variant="subtitle2"
                        key={index.toString()}
                        sx={{ fontWeight: 400, lineHeight: 1.45 }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  <Button
                    variant="contained"
                    disableElevation
                    href={serviceItem.pageURL}
                    sx={{
                      pl: 4,
                      pr: 4,
                      mt: 2,
                      backgroundColor: "buttonGreen.main",
                      color: "buttonGreen.contrastText",
                    }}
                  >
                    Läs mer
                  </Button>
                </ServiceBox>
              )}
            </Item>
            <Item
              sx={{
                alignText: "right",
                pt: isMobile ? 0.3 : 0.1,
                textAlign: "left",
              }}
            >
              {(serviceItem.position === "right-bottom" ||
                serviceItem.position === "right-top") && (
                <ServiceBox position={serviceItem.position}>
                  <img
                    src={serviceItem.icon}
                    alt={serviceItem.title}
                    width={120}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.45,
                      fontSize: 21,
                      color:"primary.dark"
                    }}
                  >
                    {serviceItem.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.45,
                      fontSize: 25,
                      pb: 1,
                    }}
                  >
                    {serviceItem.subtitle}
                  </Typography>
 
                  {serviceItem.description &&
                    serviceItem.description.map((desc: string, index) => (
                      <Typography
                        variant="subtitle2"
                        key={index.toString()}
                        sx={{
                          pb: 1.5,
                          fontWeight: 400,
                          lineHeight: 1.45,
                        }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  <Button
                    disableElevation
                    variant="contained"
                    href={serviceItem.pageURL}
                    sx={{
                      pl: 4,
                      pr: 4,
                      mt: 2,
                      backgroundColor: "buttonGreen.main",
                      color: "buttonGreen.contrastText",
                    }}
                  >
                    Läs mer
                  </Button>
                </ServiceBox>
              )}
            </Item>
          </Box>
        </MainContainer>
      </Box>
    </Box>
  );
}

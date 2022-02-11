import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  useMediaQuery,
  Menu,
  MenuProps,
  MenuItem,
  useTheme,
  IconButton,
  Box,
  List,
  Collapse,
  Button
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { StyledLink } from "./theme";
import { MenuItemModal } from "../../interface/menuItem";
import menus from "../../data/menus.json";
import MobileMenus from "../../data/mobile-menus.json";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))(({ theme }) => ({
  "& .MuiBackdrop-root": {
    zIndex: 99
  },
  "& .MuiPaper-root": {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    top: 0,
    left: 0,
    zIndex: 99,
    marginLeft: 16,
    marginTop: 65,
    width: "100%",
    maxWidth: "100%",
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0"
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}));

interface MainMenuItemProps {
  itemObj: MenuItemModal;
  handleOnClick: Function;
  isChild?: boolean;
}
const MobileMenuItem = ({
  itemObj,
  handleOnClick,
  isChild = false
}: MainMenuItemProps) => {
  const [isCollaps, setIsCollaps] = useState(false);

  return (
    <MenuItem
      href={itemObj.urlLink}
      key={itemObj.id.toString()}
      sx={{ display: "block", p: 0 }}
    >
      <Link
        variant="inherit"
        underline="none"
        color="text.primary"
        href={itemObj.urlLink}
        target={itemObj.target}
        sx={{
          display: "flex",
          p: isChild ? 1.5 : 1,
          pt: 2,
          pl: isChild ? 8 : 4,
          pr: 4,
          justifyContent: "space-between",
          backgroundColor: isCollaps ? "#F7FAF8" : "#ffffff"
        }}
        onClick={(eve: any) => {
          if (itemObj.children && itemObj.children.length > 0) {
            setIsCollaps(!isCollaps);
          } else {
            handleOnClick(itemObj);
          }
          if (
            !itemObj.urlLink.startsWith("/") &&
            !itemObj.urlLink.startsWith("http") &&
            !itemObj.urlLink.startsWith("mailto")
          ) {
            eve.preventDefault();
          }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: isChild ? 14 : 18,
            fontWeight: "500",
            color: isChild ? "#748593" : "auto"
          }}
        >
          <Trans key={itemObj.id.toString()}>{itemObj.title}</Trans>
        </Typography>
        {itemObj.children.length > 0 ? (
          <img
            src="/images/CG-arrow_green.svg"
            width={30}
            alt="Sub Menu icon"
            style={{
              transform: isCollaps ? "rotate(180deg)" : "rotate(0deg)",
              marginTop: -5
            }}
          />
        ) : null}
      </Link>
      {itemObj.children && itemObj.children.length > 0 && (
        <Collapse in={isCollaps} timeout="auto" unmountOnExit>
          {itemObj.children.map((childItem: MenuItemModal) => (
            <Link
              key={childItem.id.toString()}
              variant="inherit"
              underline="none"
              color="text.primary"
              href={childItem.urlLink}
              sx={{
                my: 1,
                mx: 1.5,
                pl: 5,
                pr: 4,
                pt: 1,
                pb: 1,
                display: "block",
                fontSize: 13
              }}
              fontWeight={400}
              onClick={() => {
                handleOnClick(childItem);
              }}
            >
              {childItem.title}
            </Link>
          ))}
        </Collapse>
      )}
      <Box
        sx={{
          borderBottom: isChild ? 0 : 1,
          ml: 4,
          mr: 4,
          borderColor: "secondary.light"
        }}
      />
    </MenuItem>
  );
};

const MainMenuItem = ({
  itemObj,
  handleOnClick,
  isChild = false
}: MainMenuItemProps) => (
  <StyledLink
    key={itemObj.id.toString()}
    variant="inherit"
    underline="none"
    color="text.primary"
    target={itemObj.target}
    onMouseOver={() => {
      // eve.preventDefault();
      handleOnClick(itemObj);
    }}
    onClick={(eve: any) => {
      if (
        !itemObj.urlLink.startsWith("/") &&
        !itemObj.urlLink.startsWith("http") &&
        !itemObj.urlLink.startsWith("mailto")
      ) {
        eve.preventDefault();
      }
    }}
    href={itemObj.urlLink}
    sx={{ my: 1, mx: 1.5, fontSize: isChild ? 13 : 17 }}
    fontWeight={400}
  >
    {itemObj.title}
  </StyledLink>
);

const Header = () => {
  // const classes = useStyles();
  const isAll = useSelector((state: RootState) => state.cookies.isAll);
  // const isFunctional = useSelector((state: RootState) => state.cookies.isFunctional);
  const isMarketing = useSelector((state: RootState) => state.cookies.isMarketing);
  // const isNecessary = useSelector((state: RootState) => state.cookies.isNecessary);
  // const isStatistics = useSelector((state: RootState) => state.cookies.isStatistics);

  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const loadChatBot = () => {
    if (isAll || isMarketing) {
      (function loadHubSpot() {
        const d = document;
        // console.log(d.getElementsByTagName("body")[0]);
        const s = d.createElement("script");
        s.id = "hs-script-loader";
        s.src = "//js-eu1.hs-scripts.com/24998745.js";
        s.async = true;
        d.getElementsByTagName("body")[0].appendChild(s);
        // const cs = d.createElement("script");
        // cs.id = "Cookiebot";
        // cs.src = "//consent.cookiebot.com/uc.js";
        // cs.async = true;
        // cs.setAttribute("data-cbid", "04e164d5-3693-4f6e-9a85-48d33809b2a8");
        // cs.setAttribute("data-blockingmode", "auto");
        // d.getElementsByTagName("body")[0].appendChild(cs);
      })();
    } else {
      const ele = document.getElementById("hs-script-loader");
      if (ele) {
        ele.remove();
      }
    }
  };
  useEffect(() => {
    loadChatBot();
  }, [isAll, isMarketing]);

  const handleMenu = (event: any) => {
    // console.log(open);
    if (open) {
      setAnchor(null);
    } else {
      setAnchor(event.currentTarget);
    }
  };
  // const classes = useStyles();
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const handleMenuItemClick = (item: MenuItemModal, index: number) => {
    if (index === visibleIndex) {
      setVisibleIndex(-1);
    } else {
      setVisibleIndex(index);
    }
  };
  return (
    <>
      <AppBar
        elevation={0}
        sx={{ zIndex: 9999, boxShadow: "1px 2px 3px #afafaf44" }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link className="navbar-brand logo" href="/">
              <img
                alt="Logo"
                src="/images/logo-green.svg"
                width={200}
                height={70}
              />
            </Link>
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                aria-label="menu"
                style={{ zIndex: 999, position: "relative" }}
                sx={{ zIndex: 999, position: "relative" }}
                onClick={handleMenu}
              >
                {open ? (
                  <img
                    src="/images/CG-cross_green.svg"
                    width={40}
                    alt="Menu Icon"
                  />
                ) : (
                  <img
                    src="/images/CG-Menu_green.svg"
                    width={40}
                    alt="Menu Icon"
                  />
                )}
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button"
                }}
                anchorEl={anchor}
                open={open}
              // onClose={handleClose}
              >
                {MobileMenus &&
                  MobileMenus.map((item: MenuItemModal, index) => (
                    <MobileMenuItem
                      key={item.id.toString()}
                      itemObj={item}
                      handleOnClick={(itemParam: MenuItemModal) => {
                        handleMenuItemClick(itemParam, index);
                        if (anchor) {
                          setAnchor(null);
                        }
                      }}
                    />
                  ))}
                <MenuItem
                  href="#"
                  key="contactus"
                  sx={{
                    display: "block",
                    p: 0,
                    textAlign: "center",
                    mt: 2.1,
                    mb: 2
                  }}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    href="/contact/index.html"
                    sx={{
                      display: "block",
                      textAlign: "center",
                      pl: 4,
                      pr: 4,
                      ml: 4,
                      mr: 7.5,
                      pt: 1,
                      backgroundColor: "grey.500",
                      color: "primary.dark",
                      fontSize: 18
                    }}
                  >
                    Kontakt
                  </Button>
                </MenuItem>
              </StyledMenu>
            </>
          ) : (
            <nav>
              {menus &&
                menus.map((item: MenuItemModal, index) => (
                  <MainMenuItem
                    itemObj={item}
                    key={item.id.toString()}
                    handleOnClick={(itemParam: MenuItemModal) =>
                      handleMenuItemClick(itemParam, index)
                    }
                  />
                ))}
              <Box
                sx={{
                  position: "absolute",
                  top: 80,
                  left: 0,
                  pr: 3,
                  pl: 3,
                  right: 0,
                  height: 40,
                  textAlign: "right",
                  backgroundColor: "#F7FAF8",
                  boxShadow: "1px 2px 3px #afafaf44",
                  display:
                    visibleIndex >= 0 &&
                      menus[visibleIndex].children &&
                      menus[visibleIndex].children.length > 0
                      ? "block"
                      : "none"
                }}
              >
                {visibleIndex >= 0 && menus[visibleIndex].children && (
                  <List>
                    {menus[visibleIndex].children.map(
                      (submenu: MenuItemModal) => (
                        <MainMenuItem
                          isChild
                          itemObj={submenu}
                          key={submenu.id.toString()}
                          handleOnClick={() => { }}
                        />
                      )
                    )}
                  </List>
                )}
              </Box>
            </nav>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
MobileMenuItem.defaultProps = {
  isChild: false
};
MainMenuItem.defaultProps = {
  isChild: false
};
export default Header;

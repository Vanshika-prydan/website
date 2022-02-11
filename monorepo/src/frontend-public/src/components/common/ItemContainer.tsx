import { Box } from "@mui/material";

const  ItemContainer = (props: any) => {
  const { sx, children } = props;
  return (
    <Box
      sx={{
        color: "text.primary",
        p: 1,
        ...sx,
      }}
    >{children}</Box>
  );
}
export default ItemContainer;

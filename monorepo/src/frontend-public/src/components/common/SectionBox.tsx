import { Container, Box } from "@mui/material";

export default function SectionBox(props: any) {
  const { children, gridTemplateColumns } = props;
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "grid",
          gap: 1,
          pt: 10,
          pb: 10,
          gridTemplateColumns: gridTemplateColumns || "repeat(2, 1fr)"
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

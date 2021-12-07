import { Container, Paper } from "@mui/material";
import Image from "next/image";

const Model = () => {
  return (
    <Container maxWidth="xl">
      <Paper
        elevation={5}
        sx={{ my: 3, p: 3, position: "relative", height: 7000 }}
      >
        <Image src="/model.png" layout="fill" alt="model" />
      </Paper>
    </Container>
  );
};

export default Model;

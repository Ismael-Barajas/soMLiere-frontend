import { Container, Paper } from "@mui/material";
import { MetaTags } from "../components";

const About = () => {
  return (
    <Container maxWidth="xl">
      <MetaTags title="About" />
      <Paper align="center" elevation={5} sx={{ my: 3, py: 3 }}>
        UNDER CONSTRUCTION
      </Paper>
    </Container>
  );
};

export default About;

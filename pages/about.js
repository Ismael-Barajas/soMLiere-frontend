import { Container, Paper, Typography } from "@mui/material";
import { MetaTags } from "../components";
import Image from "next/image";

const styles = {
  links: { mt: 1 },
};

const About = () => {
  return (
    <Container maxWidth="xl">
      <MetaTags title="About" />
      <Paper align="center" elevation={5} sx={{ my: 3, py: 3 }}>
        <Typography variant="h3">Created By</Typography>
        <Typography variant="h6" sx={styles.links}>
          <a href="https://github.com/light1515" target="_blank">
            Andy Yen
          </a>
        </Typography>
        <Typography variant="h6" sx={styles.links}>
          <a href="https://github.com/Ismael-Barajas" target="_blank">
            Ismael Barajas
          </a>
        </Typography>
        <Typography variant="h6" sx={styles.links}>
          <a href="https://github.com/sudo-update" target="_blank">
            Sean Javiya
          </a>
        </Typography>
        <Typography variant="h5" sx={{ mt: 5 }}>
          Visit the repo here
        </Typography>
        <a href="https://github.com/Ismael-Barajas/somliere" target="_blank">
          <Image
            src="/github-logo.png"
            alt="logo"
            quality={100}
            width={60}
            height={60}
            layout="intrinsic"
          />
        </a>
      </Paper>
    </Container>
  );
};

export default About;

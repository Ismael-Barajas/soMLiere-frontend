import * as React from "react";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { MetaTags } from "../components";
import Image from "next/image";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <MetaTags title="Home" />
      <Container align="center" maxWidth="xl">
        <Paper elevation={5} sx={{ my: 3, py: 7 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row">
              <Typography align="center" variant="h2">
                <u>soMLiere</u>
              </Typography>
              <Image
                src="/logo-soMLiere.png"
                alt="logo"
                width="80"
                height="50"
              />
            </Stack>
          </div>
          <Container maxWidth="sm">
            <Typography variant="h6" sx={{ py: 5 }}>
              Wine experts usually differentiated wines according to its smell,
              flavor, and color. But what if you are not a wine expert or a{" "}
              <b>Sommelier</b> who specialize in all aspects of wine service as
              well as wine and food paring?
            </Typography>
            <Typography variant="h6">
              Well look no further, <b>soMLiere</b> (play on words on Sommelier)
              uses Machine Learning to check the quality of your wine. No need
              to spend your whole life acquiring a refined pallette just to rate
              some old grape juice.
            </Typography>
          </Container>
        </Paper>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push("/quality");
          }}
        >
          Get your wine rated
        </Button>
      </Container>
    </>
  );
};

export default Home;

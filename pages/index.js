import * as React from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { MetaTags } from "../components";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <MetaTags title="Home" />
      <Container align="center" maxWidth="xl">
        <Paper elevation={5} sx={{ my: 3, py: 3 }}>
          <Typography align="center" variant="h1">
            <u>soMLiere</u>
          </Typography>
        </Paper>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push("/quality");
          }}
        >
          Continue
        </Button>
      </Container>
    </>
  );
};

export default Home;

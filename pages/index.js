import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Paper } from "@mui/material";

export default function Home() {
  return (
    <Container className={styles.container}>
      <Head>
        <title>soMLiere</title>
        <meta name="description" content="soMLiere" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Paper sx={{ padding: 5 }} elevation={5}>
          <h1 className={styles.title}>
            Welcome to <u>soMLiere</u>
          </h1>
        </Paper>
      </main>
    </Container>
  );
}

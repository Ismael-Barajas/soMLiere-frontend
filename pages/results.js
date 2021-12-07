import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { MetaTags } from "../components";

const Results = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setErrorOpen] = useState(false);

  const {
    query: { quality_result, success },
  } = router;

  useEffect(() => {
    if (quality_result !== "" && success === "true") {
      setSuccessful(true);
      setOpen(true);
    } else if (quality_result === "" || success === "false") {
      setError(true);
      setErrorOpen(true);
    }
  }, [quality_result, success, successful, error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <MetaTags title="Results" />
      <Paper sx={{ my: 3, py: 3 }}>
        {successful && (
          <Box>
            <Container maxWidth="sm" align="center">
              <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                {"Given the features of your wine, it's quality rating is:"}
              </Typography>
              <Typography variant="h1" sx={{ py: 4 }}>
                <CountUp
                  start={10}
                  end={quality_result}
                  duration={4.5}
                  separator=","
                  decimals={5}
                />
                &frasl;
                <sub>10</sub>
              </Typography>
              {quality_result >= 5 && quality_result <= 8 ? (
                <Typography variant="h4">
                  Great quality wine you got there. 🍷👀
                </Typography>
              ) : quality_result < 5 && quality_result >= 3 ? (
                <Typography variant="h4">
                  Must be a Stella Rosa bottle... 🤔
                </Typography>
              ) : quality_result >= 9 ? (
                <Typography variant="h4">
                  EXCELLENT quality wine you got there. Can I have a glass? 🍷👀
                </Typography>
              ) : (
                <Typography variant="h4">
                  ECH are you sure you want to drink that? 🤢
                </Typography>
              )}
            </Container>
          </Box>
        )}
        {error && (
          <Box>
            <Container maxWidth="sm" align="center">
              <Typography variant="h3" align="center" sx={{ my: 3 }}>
                Something went really wrong, sorry about that.😅
              </Typography>
              <Typography variant="h5">
                {
                  "API might be down or its your fault, you're welcome to try again."
                }
              </Typography>
              <Button
                sx={{ fontSize: 30, mt: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/quality");
                }}
              >
                Try Again
              </Button>
            </Container>
          </Box>
        )}
        {successful === false && error === false && (
          <Box>
            <Container maxWidth="sm" align="center">
              <Typography variant="h3" align="center" sx={{ my: 3 }}>
                {"You shouldn't be here. 😤"}
              </Typography>
              <Typography variant="h5">
                {"Its your own fault, you're welcome to try again though c:"}
              </Typography>
              <Button
                sx={{ fontSize: 30, mt: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/quality");
                }}
              >
                Quality
              </Button>
            </Container>
          </Box>
        )}
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Success</AlertTitle>
          <strong>Looks like it worked!</strong>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Error</AlertTitle>
          <strong>Uh oh, something broke!</strong>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Results;

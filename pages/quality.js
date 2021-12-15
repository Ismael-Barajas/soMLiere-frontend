import {
  Container,
  Paper,
  Box,
  Slider,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Stack,
  Switch,
  Button,
  Modal,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { MetaTags } from "../components";
import InfoIcon from "@mui/icons-material/Info";
import wineFeatures from "../constants/wineFeatures.json";
import parse from "html-react-parser";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max(75%, 300px)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const InputRow = (props) => {
  const { label, description } = props;

  return (
    <Container sx={{ py: 3 }}>
      <Grid container item direction="row" alignItems="center" spacing={2}>
        <Grid item xs={3}>
          <Typography>
            <b>{label}</b>
            <Tooltip title={description} placement="right" arrow>
              <IconButton>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};

const Quality = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    fixed_acidity: "NA",
    volatile_acidity: "NA",
    citric_acid: "NA",
    residual_sugar: "NA",
    chlorides: "NA",
    free_sulfur_dioxide: "NA",
    total_sulfur_dioxide: "NA",
    density: "NA",
    pH: "NA",
    sulphates: "NA",
    alcohol: "NA",
    type: "red",
  });
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfoOpen(false);
  };

  const handleFormValues = (name, value) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  const handleType = (event) => {
    setFormValues((preValues) => {
      return {
        ...preValues,
        [event.target.name]: event.target.checked ? "white" : "red",
      };
    });
  };

  const getQualityRating = () => {
    setLoading(true);
    axios
      .post(
        "https://24z16yev6i.execute-api.us-west-1.amazonaws.com/default/somliere",
        formValues
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        router.push(
          {
            pathname: "/results",
            query: { quality_result: res.data.score, success: true },
          },
          undefined,
          { shallow: true }
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        router.push(
          {
            pathname: "/results",
            query: { quality_result: null, success: false },
          },
          undefined,
          { shallow: true }
        );
      });
  };

  return (
    <Container maxWidth="xl">
      <MetaTags title="Quality" description="Provide features of wine." />
      <Paper align="center" elevation={1} sx={{ my: 3, py: 3 }}>
        <Container>
          <Typography>
            <b>Type of Wine</b>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>Red</Typography>
              <Switch onChange={handleType} name="type" />
              <Typography>White</Typography>
            </Stack>
          </Box>
        </Container>
        <Divider />
        {wineFeatures.map((feature, index) => {
          return (
            <Box key={index}>
              <InputRow
                label={feature.feature}
                description={feature.description}
              >
                <Slider
                  defaultValue={0}
                  name={feature.form_name}
                  valueLabelDisplay="auto"
                  onChange={(e, value) =>
                    handleFormValues(e.target.name, value)
                  }
                  marks={feature.marks}
                  step={feature.step}
                  min={feature.min}
                  max={feature.max}
                />
              </InputRow>
              <Divider />
            </Box>
          );
        })}
        <Button onClick={handleOpen} sx={{ mt: 2 }}>
          Review
        </Button>
        <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
          <Box sx={style}>
            {!loading ? (
              <>
                <Typography variant="h6" align="center">
                  <b>Type of Wine</b>
                </Typography>
                <Typography align="center">
                  {formValues.type.toUpperCase()}
                </Typography>
                <Divider />
                {wineFeatures.map((feature, index) => {
                  return (
                    <Box key={index}>
                      <Typography variant="h6" align="center">
                        <b>{feature.feature}</b>
                      </Typography>
                      <Typography align="center">
                        {formValues[feature.form_name]} {parse(feature.unit)}
                      </Typography>
                      <Divider />
                    </Box>
                  );
                })}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button onClick={getQualityRating}>
                    Submit for Quality Rating
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" sx={{ mb: 5 }}>
                  Working on it.
                </Typography>
                <CircularProgress color="secondary" size={150} />
                <Typography variant="h4" sx={{ mt: 5 }}>
                  Chill out for a sec....
                </Typography>
                <Typography variant="h4" align="center">
                  {"You'll be redirected soon if nothing goes wrong :)"}
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>
        <Modal
          open={infoOpen}
          onClose={handleClose}
          sx={{ overflow: "scroll" }}
        >
          <Box sx={style}>
            <Typography variant="h3" align="center">
              How to use:
            </Typography>
            <Typography variant="h5" align="center" sx={{ py: 3 }}>
              Adjust sliders to respective chemical feature values of your
              choice of wine. If you are not sure what a chemical means, hover
              over the information icon to the right of the chemical feature for
              its description.
            </Typography>
            <Typography variant="h3" align="center">
              Dont know a value?
            </Typography>
            <Typography variant="h5" align="center" sx={{ py: 3 }}>
              Leave the the default value of the chemical feature you do not
              know. We handle the default value in our Machine Learning model.
            </Typography>
          </Box>
        </Modal>
      </Paper>
    </Container>
  );
};

export default Quality;

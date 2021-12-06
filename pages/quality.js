import {
  Container,
  Paper,
  Box,
  Slider,
  Grid,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { MetaTags } from "../components";
import InfoIcon from "@mui/icons-material/Info";
import wineFeatures from "../constants/wineFeatures.json";

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

const valueText = (value) => {
  return `${value}°C`;
};

const InputRow = (props) => {
  const { label, description } = props;

  return (
    <Container>
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
  const [formValues, setFormValues] = useState({
    fixed_acidity: 0,
    volatile_acidity: 0,
    citric_acid: 0,
    residual_sugar: 0,
    chlorides: 0,
    free_sulfur_dioxide: 0,
    total_sulfur_dioxide: 0,
    density: 0,
    pH: 0,
    sulphates: 0,
    alcohol: 0,
    type: "",
  });

  const handleFormValues = (name, value) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  return (
    <Container maxWidth="xl">
      <MetaTags title="Quality" description="Provide features of wine." />
      <Paper align="center" elevation={5} sx={{ my: 3, py: 3 }}>
        <Box>{formValues.fixed_acidity}</Box>
        {wineFeatures.map((feature, index) => {
          return (
            <InputRow
              label={feature.feature}
              description={feature.description}
              key={index}
            >
              <Slider
                defaultValue={0}
                name={feature.form_name}
                getAriaValueText={valueText}
                valueLabelDisplay="auto"
                onChange={(e, value) => handleFormValues(e.target.name, value)}
                marks={marks}
                min={feature.min}
                max={feature.max}
              />
            </InputRow>
          );
        })}
      </Paper>
    </Container>
  );
};

export default Quality;

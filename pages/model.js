import { Container, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const string = `<img src="https://bit.ly/3oxGdut" align="center" border="0" alt="Given $x_{1}$, $x_{2}$, ... $x_{n}$, and $y$" width="215" height="19" /><br><br>
><img src="https://latex.codecogs.com/png.latex?\LARGE&space;X=\begin{bmatrix}1&x_{1}&x_{2}&\dots&x_{n}\\1&x_{1}&x_{2}&\dots&x_{n}\\1&x_{1}&x_{2}&\dots&x_{n}\\\vdots&\vdots&\vdots\\1&x_{1_m}&x_{2_m}&\dots&x_{n_m}\end{bmatrix}" /><br>

<b>Recall: </b>Our target, or y, is the wine's quality score.<br>

Find the weight values w below:<br>
><img src="https://bit.ly/3DytBr7" align="center" border="0" alt="w=\begin{bmatrix}w_{0}\\w_{1}\\w_{2}\end{bmatrix}" width="81" height="68" /><br>

The equation of our model will be:<br>
><img src="http://www.sciweavers.org/tex2img.php?eq=y%20%3D%20%5Cbegin%7Bbmatrix%7D%20%20X%20%5Cend%7Bbmatrix%7D%20%5Cbegin%7Bbmatrix%7D%20w%20%5Cend%7Bbmatrix%7D&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=0" align="center" border="0" alt="y = \begin{bmatrix}  X \end{bmatrix} \begin{bmatrix} w \end{bmatrix}" width="94" height="24" /><br>

In the code we have the <code>w_weights</code> and <code>r_weights</code>, which are equivalent to $w$, dotted with <code>w_train</code> or <code>r_train</code>, which is equivalent to $X$ and <code>y_w_train</code> or <code>y_r_train</code> which are equivalent to $y$. <br>

>(white wine model) $y_w_train = w_weights \cdot w_train$<br>

>(red wine model) $y_r_train = r_weights \cdot r_train$<br>

When we do the dot product of these it gets the equation below:<br>
> $y = w_{0} + w_{1} * x_{1} + w_{2} * x_{2}$ + ...<br><br>

And when solving for $w$ we get:<br>
> <h1> $(X^T X)^{-1} X^T y = w$ </h1> <br>

We implement this equation in Python to get all the weights.<br>
In out implementation we solve for the weights in this fashion: <br>
<code>w_weights = np.linalg.inv(w_train.transpose().dot(w_train)).dot(w_train.transpose()).dot(y_w_train)</code><br></br>`;

const model = () => {
  return (
    <Container maxWidth="xl">
      <Paper elevation={5} sx={{ my: 3, p: 3 }}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{string}</ReactMarkdown>
      </Paper>
    </Container>
  );
};

export default model;

import Head from "next/head";

const MetaTags = ({
  title = "soMLiere",
  description = "Use Machine Learning to successfully predict and assign a 'quality' score rating too a bottle of wine",
  image = "https://images.unsplash.com/photo-1597043851759-3b383a6d1c14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVkJTIwd2luZXxlbnwwfHwwfHw%3D&w=1000&q=80",
}) => {
  return (
    <Head>
      <title>soMLiere - {title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default MetaTags;

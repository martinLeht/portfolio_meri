import { Html, Head, Main, NextScript } from 'next/document';

export default Document = () => {
  return (
    <Html lang="en">
       <Head>
         <link rel="preconnect" href="https://fonts.googleapis.com" />        
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
         <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400&family=Sail&display=swap" 
         rel="stylesheet" />
         <link href="./assets/fontawesome/css/fontawesome.css" rel="stylesheet" />
         <link href="./assets/fontawesome/css/brands.css" rel="stylesheet" />
         <link href="./assets/fontawesome/css/solid.css" rel="stylesheet" />
      </Head>
    </Html>
  )
}
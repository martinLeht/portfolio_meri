import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const HelmetMetaData = (props) => {

    const { quote, title, image, description, hashtag } = props;

    const location = useLocation();
    const currentUrlData = "https://www.merijohanna.com" + location.pathname;
    const quoteData = quote !== undefined ? quote : "";
    const titleData = title !== undefined ? title : "";
    const imageData = image !== undefined ? image : "";
    const descriptionData = description !== undefined ? description  : "";   
    const hashtagData = hashtag !== undefined ? hashtag : "";
   
    return ( 
        <Helmet>
            <title>{titleData}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta property="type" content="article" />
            <meta property="url" content={currentUrlData} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={titleData} />
            <meta property="quote" content={quoteData} />
            <meta name="description" content={descriptionData} />
            <meta property="image" content={imageData} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={titleData} />
            <meta property="og:quote" content={quoteData} />
            <meta property="og:hashtag" content={hashtagData} />
            <meta property="og:image" content={imageData} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrlData} />
            <meta property="og:site_name" content="MeriJohanna" />
            <meta property="og:description" content={descriptionData} />
        </Helmet>
    );
}

export default HelmetMetaData;
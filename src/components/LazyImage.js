import React, { useState } from "react";
import { Skeleton } from "@mui/material";

const LazyImage = ({ src, alt, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Skeleton animation="wave" variant="rectangular" width={210} height={118} />}
      <img 
        src={src} 
        alt={alt} 
        style={isLoaded ? {} : { display: 'none' }} 
        onLoad={() => setIsLoaded(true)}
        {...rest} 
      />
    </>
  );
};

export default LazyImage

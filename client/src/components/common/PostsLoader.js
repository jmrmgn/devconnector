import React from 'react';
import ContentLoader from 'react-content-loader';

const PostsLoader = () => {
   return (
      <React.Fragment>
         <ContentLoader 
            height={160}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
         >
            <rect x="20" y="113" rx="3" ry="3" width="73.1" height="5.5" /> 
            <rect x="104.56" y="34.52" rx="3" ry="3" width="248.5" height="8" /> 
            <rect x="104.42" y="49" rx="3" ry="3" width="247.23" height="7.87" /> 
            <circle cx="56" cy="57" r="30" /> 
            <rect x="103.42" y="65" rx="3" ry="3" width="247.23" height="7.87" /> 
            <rect x="104.42" y="81" rx="3" ry="3" width="247.23" height="7.87" /> 
            <rect x="29" y="101.18" rx="3" ry="3" width="55.25" height="5.63" /> 
            <rect x="108" y="111.18" rx="3" ry="3" width="55.25" height="5.63" /> 
            <rect x="171" y="111.18" rx="3" ry="3" width="55.25" height="5.63" />
         </ContentLoader>
      </React.Fragment>
   );
};

export default PostsLoader;
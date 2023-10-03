import React, { useEffect, useState } from 'react';
//import HomePageSection3 from './HomePageSection3';
import { AspectRatio, Box } from '@chakra-ui/react';
//import Map from './Map/Map';

function HomeMap() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         handleSuccess,
//         handleError
//       );
//     } else {
//       setError('Geolocation is not supported by your browser');
//     }
//   }, []);

  const handleSuccess = (position) => {
    const { latitude, longitude, accuracy } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
    setAccuracy(accuracy);
  };

  const handleError = (error) => {
    setError(error.message);
  };

  return (
    <Box backgroundColor={'white'} paddingTop={'100px'} >
         <AspectRatio  maxW='100%' ratio={7 / 3} h={'350px'}> 

{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.950673464524!2d73.88584087506145!3d18.48589338260092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea800f350aa9%3A0x84e4abbebcf0ab1c!2sMarvel%20Vista!5e0!3m2!1sen!2sin!4v1683790352665!5m2!1sen!2sin" 
width="80%" 
height="750" 
style={{border:0,margin:'auto',width:'80%'}}
allowfullscreen=""
loading="lazy" 
referrerpolicy="no-referrer-when-downgrade"
>
    </iframe>    */}
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3384.4543317380762!2d35.8568254!3d31.9756971!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca15193495db9%3A0x941ee96ac871dc9e!2zRHIuIEhpYmEgU2FhZGVoIERlbnRhbCBDbGluaWMg2LnZitin2K_YqSDYp9mE2K_Zg9iq2YjYsdipINmH2KjYqSDYs9i52KfYr9ip!5e0!3m2!1sen!2sin!4v1686821048575!5m2!1sen!2sin" 
    width="80%" 
    height="350" 
    // style={{border:0,margin:'auto',width:'80%',height:''}}
    allowfullscreen=""
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade"
     ></iframe>
     </AspectRatio> 
     </Box>
  );
}

export default HomeMap;

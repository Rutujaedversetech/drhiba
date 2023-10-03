// src/components/VerticalLine.js
// src/components/VerticalLineWithDots.js
// src/components/VerticalLineWithDots.js
// src/components/VerticalLineWithDots.js
import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const VerticalLineWithDots = ({ data }) => {
  const numItems = data.length;
  const lineHeight = 30; // Adjust the line height
  const dotSize = 10; // Adjust the dot size
  const spacing = lineHeight / (numItems - 1);

  return (
    <Flex alignItems="center">
      <Box
        width="1px"
        height={`${lineHeight}px`}
        backgroundColor="#333" // Customize the line color
        marginX="20px" // Adjust the distance between line and dots
        position="relative" // Enable absolute positioning of dots
      >
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <Box
              width={`${dotSize}px`}
              height={`${dotSize}px`}
              backgroundColor="#333" // Customize the dot color
              borderRadius="50%"
              position="absolute" // Position dots relative to the line
              left="50%" // Move dots horizontally to the center of the line
              transform={`translate(-50%, ${index * spacing}px)`} // Position dots vertically
            ></Box>
            {index < numItems - 1 && (
              <Box
                width="100%"
                height={`${spacing}px`}
                backgroundColor="#333" // Customize the line color
                position="absolute" // Position lines relative to the line
                top={`${(dotSize - 1) / 2}px`} // Adjust for dot size
              ></Box>
            )}
          </React.Fragment>
        ))}
      </Box>
      <Box>
        {data.map((item, index) => (
          <Text key={index} fontSize="18px" color="#333">
            {item}
          </Text>
        ))}
      </Box>
    </Flex>
  );
};

//export default VerticalLineWithDots;


//export default VerticalLineWithDots;


//export default VerticalLineWithDots;


const Abc=()=>{
  const data = ["Text 1", "Text 2", "Text 3"]; // Add more text items as needed

return(
  <div className="App">
  <Box  alignItems="center">
    <VerticalLineWithDots data={data} />
    {/* <VerticalLineWithDots text="Text 2" /> */}
    {/* <VerticalLineWithDots text="Text 3" /> */}
    {/* Add more VerticalLine components as needed */}
  </Box>
</div>
)
}
export default Abc;

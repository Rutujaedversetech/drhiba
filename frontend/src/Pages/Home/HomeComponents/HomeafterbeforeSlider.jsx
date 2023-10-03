import { Box, Square,Text,Flex ,SimpleGrid, Heading} from '@chakra-ui/react';
import React from 'react'
import ReactCompareImage from 'react-compare-image';

const HomeafterbeforeSlider = () => {
  return (
    <Box width={''} padding={''}>
      <Heading textAlign={'center'} padding={'10px'}>Transformation</Heading>
                 
                  <SimpleGrid columns={[1,1,1,2,2]} padding={'10px'} spacingX='60px' spacingY='60px' width={['100%']} margin={'auto'}>
  <Box bg='' height=''  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
                      <ReactCompareImage  leftImage="https://sculptperio.com/wp-content/uploads/2022/11/implants-case-1-before.jpg" 
                      rightImage='https://sculptperio.com/wp-content/uploads/2022/11/implants-case-1-after.jpg'
                      />
  </Box>
  <Box bg='' height=''  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
  <ReactCompareImage  leftImage="https://sculptperio.com/wp-content/uploads/2022/11/gum-recession-case-9-before.jpg" 
                      rightImage='https://sculptperio.com/wp-content/uploads/2022/11/gum-recession-case-9-after.jpg'
                      />
  </Box>
  <Box bg='' height=''  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
  <ReactCompareImage  leftImage="https://sculptperio.com/wp-content/uploads/2022/11/gum-recession-case-6-before.jpg" 
                      rightImage='https://sculptperio.com/wp-content/uploads/2022/11/gum-recession-case-6-after.jpg'
                      />
  </Box>
  <Box bg='' height='200px'  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
  <ReactCompareImage  leftImage="https://sculptperio.com/wp-content/uploads/2022/11/gummy-smile-case-1-before-1.jpg" 
                      rightImage='https://sculptperio.com/wp-content/uploads/2022/11/gummy-smile-case-1-after-1.jpg'
                      />
  </Box>
</SimpleGrid>
    </Box>
  )
}

export default HomeafterbeforeSlider
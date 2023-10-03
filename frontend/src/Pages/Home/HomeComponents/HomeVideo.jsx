import React from 'react'
import dental from '../../../assets/dental.mp4'
import { Button, Center, Container,Box, Heading,Link,Stack,Text,  useBreakpointValue, VStack,
} from '@chakra-ui/react'
const HomeVideo = () => {
  return (
    <Box height={''}>
        
        <video autoPlay loop muted id='video' preload="auto" >
        <source src={dental} type='video/mp4'/>

        </video>
        <Box className=''
         position={'absolute'}
         top={['10vh','10vh','10vh','40vh','40vh']}
          left={0}
        //  display={'flex'}
        // flexDirection={'column'}
        // alignItems={'center'}
        // justifyContent={'center'}
        // textAlign={'center'}
        width={'100%'}
        >
<VStack
        w={'full'}
        justify={'center'}
        bg=''
        // px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        >
        <Stack maxW={'2xl'} align={'flex-start'} >
          <Heading color={'white'} fontSize={['13px','13px','13px','60px','60px']} >TRUSTED  DENTIST</Heading>
          <Text
            color={'white'}
            // fontWeight={700}
            lineHeight={1.2}
            fontSize={['sm','sm','sm','2xl','2xl']} data-aos="fade-down">A smile is the universal welcome
          </Text>
          <Stack direction={'row'} spacing={''}>
            <Button
              bg={'#232E58'}
              // rounded={'full'}
              fontSize={['10px','10px','10px','xl','xl']}
              color={'white'}
              _hover={{ bg: 'blue.500' }}>
                book online
            </Button>
          </Stack>
          <Heading fontSize={['12px','12px','12px','xl','xl']}>Call/Text/+962 795258121</Heading>

        </Stack>
      </VStack>        </Box>



    </Box>
  )
}

export default HomeVideo
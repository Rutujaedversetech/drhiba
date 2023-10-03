import React from 'react'
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
const Specibackimaage = () => {
  return (
    <div>
              <Flex
        w={'full'}
        h={'80vh'}
        bg='red'
        filter={'brightness(90%)'}

        backgroundImage={
          'url(https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)'
        }
        backgroundSize={'cover'}
        backgroundColor={'red'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          spacing={'6'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={''} spacing={''}>
            <Text
              color={'white'}
              textAlign={'center'}
              fontWeight={600}
              lineHeight={2}
              fontSize={['23px','23px','23px','40px','50px']}              >
              THE SKYLINE DIFFERENCE
  
            </Text>
            <Text
              color={'white'}
              textAlign={'center'}

              fontWeight={600}
              lineHeight={1.2}
              fontSize={['sm','sm','sm','2xl','2xl']}              >
                Every dental clinic is different. Are we the right one for you?
  
            </Text>
            
          </Stack>
          <Stack direction={['column','column','column','row','row']} spacing={'2'}>
              <Button
                bg={'#232E58'}
                fontSize={['10px','10px','10px','lg','lg']}

                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}>
             REQUEST APPOINTMENT        
      </Button>
              <Button
                bg={'#232E58'}
                fontSize={['10px','10px','10px','lg','lg']}

                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}>
               CALL +962 795258121
  
  
              </Button>
            </Stack>
        </VStack>
      </Flex>
    </div>
  )
}

export default Specibackimaage
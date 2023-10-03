import React from 'react'
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
const ContaBack = () => {
  return (
    <div>
              <Flex
        w={'full'}
        h={'80vh'}
        bg='red'
  
        backgroundImage={
          'url(https://images.unsplash.com/photo-1559030623-0226b1241edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80)'}
        backgroundSize={'cover'}
        // filter={'brightness(70%)'}
        backgroundColor={'red'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'7xl'} align={'center'} spacing={''}>
            <Text
              color={'white'}
              fontWeight={600}
              lineHeight={2}
              fontSize={['23px','23px','23px','40px','50px']}              >
REQUEST YOUR APPOINTMENT TODAY!  
            </Text>
            <Text
              color={'white'}
              fontWeight={600}
              lineHeight={1.2}
              fontSize={['sm','sm','sm','2xl','2xl']}              >
Contact us online or call +962 795258121 to schedule.
  
            </Text>

          </Stack>
        </VStack>
      </Flex>
    </div>
  )
}

export default ContaBack
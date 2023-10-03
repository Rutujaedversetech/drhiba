import React from 'react'
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
const LoginBack = () => {
  return (
    <div>    <div>
    <Flex
w={'full'}
h={'80vh'}
bg='red'

backgroundImage={
'url(https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)'}
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
    lineHeight={1.2}
    fontSize={['sm','sm','sm','4xl','4xl']}              >
We look forward to hearing from you!

  </Text>

</Stack>
</VStack>
</Flex>
</div></div>
  )
}

export default LoginBack
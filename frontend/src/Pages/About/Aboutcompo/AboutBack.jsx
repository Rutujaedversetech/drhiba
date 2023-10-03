import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
  export default function WithBackgroundImage() {
    return (
      <Flex
        w={'full'}
        h={'80vh'}
        bg='red'
  
        backgroundImage={
          'url(https://images.unsplash.com/photo-1629909613638-0e4a1fad8f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80)'
        }
        backgroundSize={'cover'}
        // filter={'brightness(70%)'}
        backgroundColor={'red'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={'6'}>
            <Text
              color={'white'}
              fontWeight={600}
              lineHeight={2}
              fontSize={['23px','23px','23px','40px','50px']}              >
              THE SKYLINE DIFFERENCE
  
            </Text>
            <Text
              color={'white'}
              fontWeight={600}
              lineHeight={1.2}
              fontSize={['sm','sm','sm','2xl','2xl']}              >
  Every dental clinic is different. Are we the right one for you?
  
            </Text>
            <Stack direction={['column','column','column','row','row']} spacing={'1'}>
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
          </Stack>
        </VStack>
      </Flex>
    );
  }
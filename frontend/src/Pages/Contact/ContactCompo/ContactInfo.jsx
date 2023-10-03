import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
    Box,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import {
    Container,
    IconButton,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
  } from '@chakra-ui/react';
  import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';

  import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
  } from 'react-icons/md';
  
  export default function SplitScreen() {
    return (
      <Stack minH={'60vh'} direction={{ base: 'column', md: 'row' }} bg={''} padding={'10px'}>

        <Flex flex={1}>
        <Box bg='blue.50' padding={'30px'} width={'100%'}>
                  <Heading textAlign={'center'} size={'xl'} color={''}>Contact</Heading>
                  <Text textAlign={'center'} color={''}>
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start" bg=''>
                      <Button
                                                 size={'lg'}
                                                 color={''}

                        bg={'none'}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color="#1970F1" size="40px" />}>
                        +91-988888888                        

                      </Button>
                      <Button
                         size={'lg'}
                         bg={'none'}
                         color={''}

                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="#1970F1" size="40px" />}>
                        hello@abc.com
                      </Button>
                      <Button
                         size={'lg'}
                         bg={'none'}
                          color={''}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color="#1970F1" size="40px" />}>
Dr. Hiba Saadeh Dental Clinic عيادة الدكتورة هبة سعادة                      </Button>
                    </VStack>
                  </Box>
         </Box>
        </Flex>
        <Flex p={8} flex={1} align={''} justify={''} bg={''}>
        <Box bg="white" borderRadius="lg" width={'100%'}>
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}>
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                  </Box>

        </Flex>
      </Stack>
    );
  }
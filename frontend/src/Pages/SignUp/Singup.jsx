import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from '../../Redux/auth/action';

  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [date, setDate] = useState("");
    const [mobileNo, setMobileNo] = useState("");


    const dispatch = useDispatch();
    const handleRegister = (e) => {
      e.preventDefault();
//console.log({ name, email, password,age });
      dispatch(authRegister({ name, email, password,age,mobileNo }));
      
    };

    
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" onChange={(e) => setFullname(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                <FormControl id="age" isRequired>
                <FormLabel>Your Age</FormLabel>
                <Input type="number" onChange={(e) => setAge(e.target.value)}/>

              </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input type="number"                   onChange={(e) => setMobileNo(e.target.value)}/>

              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email"                   onChange={(e) => setEmail(e.target.value)}/>

              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                                         onChange={(e) => setPassword(e.target.value)}/>
                                         
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  onClick={handleRegister}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to='/login' color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
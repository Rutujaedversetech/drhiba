'use client'

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
  Link,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleContact, updateContactStatus } from '../../Redux/contact/action'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
export default function SignupCard() {
  const [reply, setReply] = useState('')
  const contact = useSelector((state)=>state.contact.singleData)
    console.log('contact',contact);
    const {id}=useParams();
    console.log(reply);
    const toast=useToast()


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getSingleContact(id))
      
      },[])

const handleReply=(open1,item,opening)=>{
  if(reply!==""){
  dispatch(updateContactStatus(open1, {...item,"status":'replied'}));
  }
  else if(reply ==""){
    toast({
      title: "Please add Reply",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });    }

}

  return (
    <Flex
      minH={'100vh'}
      // align={'center'}
      // justify={'center'}
      spacing='170px'
      bg={useColorModeValue('', 'gray.800')}>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('', 'gray.700')}
          width={'100%'}
          spacing='170px'

          boxShadow={'lg'}
          >
          <Text fontSize={'32px'} >Contact Message</Text>
          <Stack spacing={4} bg=''>
          <FormControl id="password" >
              <FormLabel color={'gray'}>Name</FormLabel>
              <Input type="text" value={contact.name} color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'}  isReadOnly/>

            </FormControl>
            <FormControl id="email" >
              <FormLabel color={'gray'}>Email address</FormLabel>
              <Input type="email" value={contact.email} color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'} isReadOnly />
            </FormControl>
           
            <FormControl id="password" >
              <FormLabel color={'gray'}>Subject</FormLabel>
              <Input type="text" value={contact.subject} color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'} isReadOnly/>

            </FormControl><FormControl id="password" >
              <FormLabel color={'gray'}>Message</FormLabel>
              <Input type="text" value={contact.message} color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'} isReadOnly/>

            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color={'gray'}>Reply</FormLabel>
              <Textarea type="text" border={'1px solid gray'} onChange={(e)=>{setReply(e.target.value)}} isRequired/>

            </FormControl>
            {/* <FormControl id="password" isRequired>
              <Checkbox defaultChecked>Replied</Checkbox>
            </FormControl> */}


            <HStack spacing={'10px'} pt={2}>
            <Checkbox defaultChecked>Replied</Checkbox>

              <Button
                loadingText="Submitting"
                onClick={()=>handleReply(contact._id,contact,contact.status)}                size="md"
                bg={'blue'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
             Reply              </Button>
            </HStack>
            
          </Stack>
        </Box>
    </Flex>
  )
}
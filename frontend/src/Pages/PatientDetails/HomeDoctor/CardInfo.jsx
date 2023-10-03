import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  InputGroup,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import { isExpired, decodeToken } from "react-jwt";
import { authRegister, deleteuser, getAllusers } from '../../../Redux/auth/action';
import { Table, TableCaption, TableContainer, Td,Box,Image, Thead, Tr ,Th,Tbody,Tfoot,Button,Text, HStack, Heading, Flex, Select, Spacer, Stack} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Grid,
    useColorModeValue
    
  } from "@chakra-ui/react";

import {
    AiFillDelete
  } from 'react-icons/ai';
  import { Collapse } from '@chakra-ui/transition';

  import {
    FaSlidersH
  } from 'react-icons/fa';
import { addcardetails, deletecarddata, getAllCard } from '../../../Redux/card/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState({});
    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.card.data)
    const token=localStorage.getItem('token')
const toast=useToast()
  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)




  useEffect(()=>{
  dispatch(getAllCard())
  },[])

  const handleDeleteopp=(id)=>{
    dispatch(deletecarddata(id))
    //onClose();
    // toast({
    //   title: "data deleted successfully",
    //   status: "info",
    //   duration: 2000,
    //   isClosable: true,
    //   position: "top",
    // }); 
          }

const handleSubmit=()=>{
    //console.log('product',product);
    dispatch(addcardetails({description:description}));
    onClose();
    // toast({
    //   title: "data added successfully",
    //   status: "info",
    //   duration: 2000,
    //   isClosable: true,
    //   position: "top",
    // }); 

}
  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>Card Information


</Heading>
            </Box>
            <Spacer />

            <Box>
                <Button bg='#4E73DF'     color={'white'}                  onClick={() => {
                        onOpen();
                     //   setProduct(item);
                      }}>Add</Button>
            </Box>

        </Flex>

        <Table
        d="inline-block"
               // borderColor="gray.200"
        // borderRadius="md"
        // rounded="20px"
        rounded="md"
        w="100%"
        //m="50px"
        variant="simple"
      >
        <Thead bg='orange' >
          <Tr >
        <Th >Description</Th>

        <Th >Delete</Th>

          </Tr>
        </Thead>
        <Tbody>
          {details?.map((item)=>{
return (
  <Tr>
		     
         <Td ><Text color={'blue'}></Text>{item.description}</Td>
  <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red'/></Button></Td>  
</Tr>
)
          })}


        </Tbody>

      </Table>
<Flex>
  {/* <Box p='4' bg=''>
    <Text>Showing 1 to 6 of 6 entries</Text>
  </Box> */}
  <Spacer />
  <Box p='4' bg=''>
  <HStack padding={'10px'}>
            {/* <Button bg={'gray.300'}>Previous</Button>
            <Text>1</Text>
            <Button bg={'gray.300'} >Next</Button> */}
            {/* <Text>showing 1 to ${} of ${} result</Text> */}

        </HStack>
          </Box>
</Flex>
<Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                 onChange={(e)=>setDescription(e.target.value)}
                  name="name"
                />
              </FormControl>


             
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>
  )
}

export default ViewPatient
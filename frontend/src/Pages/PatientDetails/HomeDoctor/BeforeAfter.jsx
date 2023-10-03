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
  useToast,
} from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import axios from 'axios';

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
import { addbeforeShow, deletebeforeimage, getAllbefore } from '../../../Redux/beforeafter/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
   // const [product, setProduct] = useState({});
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');


    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.before)
    const token=localStorage.getItem('token')
    const [message, setMessage] = useState('');
    const toast=useToast()

  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)
console.log('message',message);


  useEffect(()=>{
  dispatch(getAllbefore())
  },[])



// useEffect(()=>{
// //   if(details.AddProduct.message=='slide added'){
// //   toast({
// //     title: "Slide added successfully",
// //     status: "info",
// //     duration: 2000,
// //     isClosable: true,
// //     position: "top",
// //   });  
 
// // }
// // else if(details.DeleteProduct.message=='slide deleted'){
// //   toast({
// //     title: "data deleted successfully",
// //     status: "info",
// //     duration: 2000,
// //     isClosable: true,
// //     position: "top",
// //   });  
  
// // }
//  if(details.DeleteProduct.message==='data deleted'){
//   alert('hello')
//   // toast({
//   //   title: "data deleted successfully before after",
//   //   status: "info",
//   //   duration: 2000,
//   //   isClosable: true,
//   //   position: "top",
//   // });  
//   // setTimeout(()=>{
        
//   //    },1000)
// }
// else if(details.AddProduct.message==='data added'){
//   // toast({
//   //   title: "Data added successfully in before after",
//   //   status: "info",
//   //   duration: 2000,
//   //   isClosable: true,
//   //   position: "top",
//   // });  
//   return () => {
//     // Side Effect Cleanup
    
//     }
  
// }
// },[details])











  const handleDeleteopp=(id)=>{
    dispatch(deletebeforeimage(id))
    // toast({
    //       title: "data deleted successfully",
    //       status: "info",
    //       duration: 2000,
    //       isClosable: true,
    //       position: "top",
    //     }); 
          }
          
const handleSubmit=async()=>{
    //dispatch(authRegister(product));
    const formData = new FormData()
  formData.append('image1', image1)
  formData.append('image2', image2)

  if(image1.length===0 || image2.length===0){
    toast({
      title: "please choose file",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
  else{
    dispatch(addbeforeShow(formData))
    onClose();
    // toast({
    //   title: "data added successfully",
    //   status: "info",
    //   duration: 2000,
    //   isClosable: true,
    //   position: "top",
    // }); 

  }


  // try {
  //   const response = await axios.post('http://localhost:8080/before/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });

  //   setMessage(response.data);
  // } catch (error) {
  //   setMessage('Upload failed');
  //   console.error('Error:', error);
  // }

}
  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>SlideShow
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

        <TableContainer  >
  <Table>
    <Thead bg='orange'>
      <Tr>
      <Th >Before Image</Th>
        <Th >After Image</Th>

        <Th >Delete</Th>


      </Tr>
    </Thead>
    {
    details.data?.map((item)=>{


            return(
    <Tbody>
      <Tr>
      <Td ><Image margin={'auto'} src={`http://localhost:8080/${item?.image1}`} width='60%'/></Td>
        <Td ><Image margin={'auto'} src={`http://localhost:8080/${item?.image2}`} width='60%'/></Td>
       <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red'/></Button></Td>  

      </Tr>
     
    </Tbody>
    ) })
    }

  </Table>
</TableContainer> 

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
                <FormLabel>Before</FormLabel>
                <Input
                 onChange={(e) => setImage1(e.target.files[0])} type="file" 
                />
              </FormControl>
              <FormControl>
                <FormLabel>After</FormLabel>
                <Input
                 onChange={(e) => setImage2(e.target.files[0])} type="file" 


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
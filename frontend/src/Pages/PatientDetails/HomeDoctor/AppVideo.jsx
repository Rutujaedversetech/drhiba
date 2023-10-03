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
import { addVideodetails, deleteVideodata, getAllvideo } from '../../../Redux/videoadd/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [video, setVideo] = useState('');

    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
const toast=useToast();
    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.video.data)
    const token=localStorage.getItem('token')

  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)











  useEffect(()=>{
  dispatch(getAllvideo())
  },[])

  const handleDeleteopp=(id)=>{
    dispatch(deleteVideodata(id))
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
    // dispatch(addVideodetails(product));
    console.log('gfcfgc',video,video.length===0);
  const formData = new FormData()
  // formData.append('video', video)
  if(video.length===0){
    toast({
      title: "please choose file",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
  else{
    formData.append('video', video)

  dispatch(addVideodetails( formData))
  setVideo('')
  //onClose();
  // toast({
  //   title: "data added successfully",
  //   status: "info",
  //   duration: 2000,
  //   isClosable: true,
  //   position: "top",
  // }); 

  }

}
  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>Video App</Heading>
            </Box>
            
            <Spacer />

            <Box>
                <Button bg='#4E73DF'     color={'white'}                  onClick={() => {
                        onOpen();
                     //   setProduct(item);
                      }}>Add</Button>
            </Box>

        </Flex>
<Box padding={'12px'}> 


 </Box>

        <TableContainer  >
  <Table  borderCollapse={''}>
    <Thead bg='orange'>
      <Tr>
        <Th >Video</Th>
        <Th >Delete</Th>


      </Tr>
    </Thead>
    {
    details.map((item)=>{

            return(
    <Tbody>
      <Tr>

        <Td >
        <Box maxW="400px" mx="auto" p={4}>
        <video controls width="100%" height="auto">
          <source src={`http://localhost:8080/${item?.video}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
        </Td>

        {/* <Td  border={'1px solid black'} onClick={()=>handleOppointment(item._id,item,item.status)}>
          {!item.visited ?item.status ?(<Button backgroundColor={'green'}>confirmed</Button>):
          (<Button backgroundColor={'red'}>pending</Button>)
          
          :(<Button bg='orange'>Visited</Button>)}
          
          </Td> */}
          <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red' fontSize={'22px'}/></Button></Td>  

      </Tr>
     
    </Tbody>
    ) })
    }

  </Table>
</TableContainer> 
<Flex>

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
            <ModalHeader>Add Video</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>video</FormLabel>
                <Input
              onChange={(e) => setVideo(e.target.files[0])}   
               type="file"
                  accept='video/*'

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
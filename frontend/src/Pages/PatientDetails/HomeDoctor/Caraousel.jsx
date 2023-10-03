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
  CSSReset,
} from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import { isExpired, decodeToken } from "react-jwt";
import { authRegister, deleteuser, getAllusers } from '../../../Redux/auth/action';
import { Table, TableCaption, TableContainer, Td,Box,Image, Thead, Tr ,Th,Tbody,Tfoot,Button,Text, HStack, Heading, Flex, Select, Spacer, Stack} from '@chakra-ui/react';
import { Form, Link } from 'react-router-dom';
//import {image} from '../../../../../../backend/Slideshowmedia/1691737769386-364071630.png'
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
  import axios from 'axios';
  import {
    FaSlidersH
  } from 'react-icons/fa';
import { addSlideShow, deleteSlideimage, getAllSlides } from '../../../Redux/slideshow/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [image, setImage] = useState([]);
    const [title, SetTitle] = useState('');
    const [description, SetDescription] = useState('');

    const [allData, setAllData] = useState([]);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    
    const details = useSelector((state)=>state.slideshow)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const token=localStorage.getItem('token')
    const toast=useToast()

  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)



const handleAdd=()=>{
  console.log('gfcfgc',image,image.length===0);
  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)
  formData.append('image', image)
  if(image.length===0){
    toast({
      title: "please choose file",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
  else{
  dispatch(addSlideShow( formData))
  onClose();
  // toast({
  //   title: "data added successfully",
  //   status: "info",
  //   duration: 2000,
  //   isClosable: true,
  //   position: "top",
  // }); 

  }
  // axios.post('http://localhost:8080/slideshow/upload',
  //     formData,
  //     // {
  //     //     headers: { 'Authorization': localStorage.getItem('token') }
  //     // }
  // )
  //     .then((res) => {
  //         console.log(res.data)


  //     })
  //     .catch(err => {
  //         console.log(err, "err")
  //     })
}




  const handleDeleteopp=(id)=>{
    dispatch(deleteSlideimage(id))
    // toast({
    //   title: "data deleted successfully",
    //   status: "info",
    //   duration: 2000,
    //   isClosable: true,
    //   position: "top",
    // }); 
          }
          


useEffect(() => {
  console.log('helloooo i am here 5555555555555');

      dispatch(getAllSlides())

  
 }, []);


// useEffect(()=>{
//   console.log('helloooo i am here');
//   if(details.AddProduct.message=='slide added'){
//     console.log('helloooo i am here 22222222222222');

//     toast({
//       title: "Slide added successfully",
//       status: "info",
//       duration: 2000,
//       isClosable: true,
//       position: "top",
//     });  
   
//   }
//   else if(details.DeleteProduct.message=='slide deleted'){
//     console.log('helloooo i am here 777777777777');

//     toast({
//       title: "data deleted successfully",
//       status: "info",
//       duration: 2000,
//       isClosable: true,
//       position: "top",
//     });  
    
//   }


// },[details])








console.log('dsawert',allData);

  

console.log('title',title,description);



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
            <Th  > Title</Th>
            <Th>Description</Th>
            <Th  >Image</Th>
            <Th  >Delete</Th>

          </Tr>
        </Thead>
        <Tbody>
          {details.data?.map((item)=>{
return (
  <Tr>
 <Td  ><Link to={`/patient/${item._id}`}><Text color='blue'>{item.title}</Text></Link></Td>
        <Td  >
          <Text>{item.description}</Text>
          </Td>
        <Td ><Image src={`http://localhost:8080/${item?.image}`} width='100%'/></Td>

          <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red'/></Button></Td> 
</Tr>
)
          })}


        </Tbody>

      </Table>

<Modal
          // initialFocusRef={initialRef}
          // finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
  
<Box padding={'10px'}>
  <Text>Title</Text>
  <Input placeholder='Add Title' onChange={(e)=>SetTitle(e.target.value)}/>

</Box>
<Box padding={'10px'}>
  <Text>Description</Text>
  <Input placeholder='Add Description' onChange={(e)=>SetDescription(e.target.value)} />

</Box>
<Box padding={'10px'}>
<Input multiple onChange={(e) => setImage(e.target.files[0])} type="file" name="slide" accept='image/*' />
  {/* <Button  bg='blue'onClick={handleAdd}>submit</Button> */}
</Box>
             
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAdd}>
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
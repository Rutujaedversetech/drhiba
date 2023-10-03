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
import { addServicedetails, deleteServicedata, getAllService } from '../../../Redux/service/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [image, setImage] = useState([]);
    const [name, SetTitle] = useState('');
    const [description, SetDescription] = useState('');
    const [price, SetPrice] = useState('');

    const [allData, setAllData] = useState([]);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    
    const details = useSelector((state)=>state.service.data)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const token=localStorage.getItem('token')
const toast=useToast()
  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)



const handleAdd=()=>{
  const formData = new FormData()
  formData.append('name', name)
  formData.append('price', price)

  formData.append('description', description)
  formData.append('image', image)
  
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

// dispatch(addServicedetails(formData))
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
  dispatch(addServicedetails(formData))
  onClose();
// toast({
//   title: "data added successfully",
//   status: "info",
//   duration: 2000,
//   isClosable: true,
//   position: "top",
// }); 

}



}




  const handleDeleteopp=(id)=>{
    dispatch(deleteServicedata(id))
//     onClose();
// toast({
//   title: "data delete successfully",
//   status: "info",
//   duration: 2000,
//   isClosable: true,
//   position: "top",
// }); 
          }
          


useEffect(() => {

      dispatch(getAllService())

  
 }, []);


console.log('dsawert',allData);

  

console.log('title',name,description);



  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>Service</Heading>
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
          <Th >Name</Th>
        <Th >Description</Th>
        <Th>Image</Th>
        <Th >Price</Th>

        <Th >Delete</Th>

          </Tr>
        </Thead>
        <Tbody>
          {details?.map((item)=>{
return (
  <Tr>
		        <Td ><Link to={`/patient/${item._id}`}><Text color='blue'>{item.name}</Text></Link></Td>
        <Td ><Text color={'blue'}></Text>{item.description}</Td>
        <Td ><Image src={`http://localhost:8080/${item?.image}`} width='60%'/></Td>
        <Td ><Text color={'blue'}></Text>{item.price}</Td>

          <Td><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red'/></Button></Td>  
</Tr>
)
          })}


        </Tbody>

      </Table>

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
  
<Box>
  <Text>Title</Text>
  <Input placeholder='Add Title' 
  onChange={(e)=>SetTitle(e.target.value)}/>

</Box>
<Box>
  <Text>Description</Text>
  <Input placeholder='Add Description' onChange={(e)=>SetDescription(e.target.value)} />

</Box>
<Box>
  <Text>Price</Text>
  <Input placeholder='Add price' onChange={(e)=>SetPrice(e.target.value)} type='number'/>

</Box>

<Box>

<Input
 multiple onChange={(e) => setImage(e.target.files[0])} type="file" name="image" />
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
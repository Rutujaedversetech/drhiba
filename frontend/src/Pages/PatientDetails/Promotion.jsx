import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import axios from 'axios';
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
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { isExpired, decodeToken } from "react-jwt";
import { authRegister, deleteuser, getAllusers } from '../../Redux/auth/action';
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
import { addpromotion, deletepromotion, getAllpromotion } from '../../Redux/promotion/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [subject, setSubject] = useState('');
    const [pro_text, setText] = useState('');
    const [page, setPage] = useState(1)
    const[limit,setLimit]=useState(4)

    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);


    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };
    const [query, setQuery] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.promotion.data)
    const totalPages = useSelector((state)=>state.promotion.totalPage)
    const TotalData = useSelector((state)=>state.promotion.TotalData)
    const resultString = `The length of the data is: ${details.length}`;
   const result=`Showing 1 to ${details.length} of ${TotalData.length} entries`
console.log(result);

const toast=useToast()
    const token=localStorage.getItem('token')

  console.log('details',details,totalPages,TotalData.length);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)



  const generatePDF = async () => {
    try {
      const response = await fetch('http://localhost:8080/promotion/pdf');
      if (response.ok) {
        // Create a blob URL for the PDF
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
  
        // Create a download link and click it
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'servicedata.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error('Failed to fetch PDF:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleDownloadcsv = async () => {
    try {
      const response = await axios.get('http://localhost:8080/promotion/csv', {
        responseType: 'blob', // Important for binary data
      });
  
      const blob = new Blob([response.data], { type: 'text/csv' });
  
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'MongoDataservice.csv';
      link.click();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  const handleDownloadexcel = async () => {
    try {
      const response = await axios.get('http://localhost:8080/promotion/excel', {
        responseType: 'blob', // Important for binary data
      });
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      // Trigger download using FileSaver.js
      saveAs(blob, 'MongoDataservice.xlsx');
    } catch (error) {
      console.error('Error downloading Excel data:', error);
    }
  };


  const handlePage=()=>{
    setPage((prev)=>prev+1)
  }
  const handlePage2=()=>{
    setPage((prev)=>prev-1)
  }





  useEffect(()=>{
  dispatch(getAllpromotion(query,limit,page))
  },[query,limit,page])

  const handleDeleteopp=(id)=>{
    dispatch(deletepromotion(id))
    toast({
      title: "data deleted sucessfully",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
          }

const handleSubmit=()=>{
    //console.log('product',product);
    //dispatch(authRegister(product));
    const formData = new FormData()
    formData.append('image', image)
    formData.append('pro_text',pro_text )
    formData.append('subject', subject)
    if(image.length==0){
      toast({
        title: "please choose file",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }else{
      dispatch(addpromotion(formData));
      onClose();
      toast({
        title: "data added successfully",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      }); 

    }
}
  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>Promotion</Heading>
            </Box>
            <Spacer />

            <Box>
                <Button bg='#4E73DF'     color={'white'}                  onClick={() => {
                        onOpen();
                     //   setProduct(item);
                      }}>Add</Button>
            </Box>

        </Flex>

 
 
        <Box>
        <Flex spacing={'9'} padding={'12px'} alignItems={'space-between'}>
            <Box>
            <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='blue' variant='outline'rounded={'none'} onClick={handleDownloadcsv}>
    CSV
  </Button>
  <Button colorScheme='blue' variant='outline'rounded={'none'} onClick={handleDownloadexcel}>
EXCEL  </Button>
<Button colorScheme='blue' variant='outline'rounded={'none'} onClick={generatePDF} >
    PDF
  </Button>
  <Select placeholder='Select Result' onChange={(e)=>setLimit(e.target.value)}>
  <option value='10'>10</option>
  <option value='25'>25</option>
  <option value='50'>50</option>
  <option value='100'>100</option>

</Select>

</Stack>            </Box>
            <Spacer />

            <Box>
<Input placeholder='Search' border={'1px solid black'}
value={query} onChange={(e) => setQuery(e.target.value)}

/>
            </Box>

        </Flex>
        </Box>
        <Table
        d="inline-block"
        border=""
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
          <Th >Subject</Th>
        <Th >Promotion Text</Th>
        <Th >Promotion Image</Th>
        <Th >publish</Th>

        <Th >Delete</Th>
		
          </Tr>
        </Thead>
        <Tbody>
          {details?.map((item)=>{
return (
  <Tr>
		        <Td  ><Link><Text color='blue'>{item.subject}</Text></Link></Td>
        <Td ><Text color={'blue'}>{item.pro_text}</Text></Td>
        <Td bg='' width={'auto'}>
          <Image src={`http://localhost:8080/${item?.image}`}
        width={'50%'}
        /></Td>


        <Td >sent</Td>
        <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red'/></Button></Td>  
  
</Tr>
)
          })}


        </Tbody>

      </Table>
<Flex>
  <Box p='4' bg=''>
    <Text>{result}</Text>
  </Box>
  <Spacer />
  <Box p='4' bg=''>
  <HStack padding={'10px'}>
  <Button bg={'gray.300'} isDisabled={page==1} onClick={handlePage2}><ChevronLeftIcon/></Button>
            <Text>{page}</Text>
         <Button bg={'gray.300'} isDisabled={page==totalPages} onClick={handlePage}><ChevronRightIcon/></Button> 
        </HStack>  </Box>
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
                <FormLabel>Subject</FormLabel>
                <Input
                 onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Promotion Text</FormLabel>
                <Input
                 onChange={(e) => setText(e.target.value)}
                 // placeholder="Product Name"
                  name="email"
                />
              </FormControl>


              <FormControl mt={4}>
                <FormLabel>promotion Image</FormLabel>
                <Input
                 // placeholder="Add Your story"
                 multiple 
                 onChange={(e) => setImage(e.target.files[0])}
                  type="file" name="image" />

                
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
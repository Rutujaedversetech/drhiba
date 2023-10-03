import React, { useState } from 'react'
import { Table, TableCaption, TableContainer, Td, Thead, Tr ,Th,Tbody,Tfoot,Text,Button, Box, HStack, Flex, Spacer} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Select } from '@chakra-ui/react'
import { getAllContacts, getAllContacts2 } from '../../Redux/contact/action';
import axios from 'axios';
import { saveAs } from 'file-saver';
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
  useColorModeValue,
  MenuItem,MenuList,
  Menu,MenuButton,Stack,
} from "@chakra-ui/react";
import {
  FaSlidersH
} from 'react-icons/fa';
import { Collapse } from '@chakra-ui/transition';
import { PDFDocument } from 'pdf-lib';

import { ChevronDownIcon, AddIcon, WarningIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

//import e from 'express';
const ContactDoctor = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [name, setFullname] = useState('');
  const [email, setEmail] = useState('');
    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };



    





    const contact = useSelector((state)=>state.contact.data)
    const totalPage = useSelector((state)=>state.contact.totalPage)

    const TotalData = useSelector((state)=>state.contact.TotalData)
    const result=`Showing 1 to ${contact.length} of ${TotalData.length} entries`

    const [page, setPage] = useState(1)
    const[limit,setLimit]=useState(1)
const[subject,setSubject]=useState('')
const [Date, setDate] = useState('')
const [status, setStatus] = useState('')
const [query, setQuery] = useState('');

    const dispatch = useDispatch();
console.log('show',limit);
    useEffect(()=>{
        console.log('pageu',page);
        dispatch(getAllContacts2(page,limit,query))
      
      },[page,limit,query])


      console.log('contact1234',contact,totalPage*contact.length);
const entry=totalPage*contact.length
const Total= (totalPage - 1) *limit + page

console.log('Total',Total,totalPage);


      const query1 = new URLSearchParams({
        name,
        email,
        Date,
        subject,
        status,
      limit,page
       
        // Add more fields as needed
      }).toString();

      const handlePage=()=>{
        setPage((prev)=>prev+1)
      }
      const handlePage2=()=>{
        setPage((prev)=>prev-1)
      }
console.log('page',page);
const handleRegister=()=>{

  dispatch(getAllContacts(query1));
  setIsCollapsed(!isCollapsed)

}


const generatePDF = async () => {
  try {
    const response = await fetch('http://localhost:8080/contact/pdf');
    if (response.ok) {
      // Create a blob URL for the PDF
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create a download link and click it
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'data.pdf';
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


const handleDownload = async () => {
  try {
    const response = await axios.get('http://localhost:8080/contact/excel', {
      responseType: 'blob', // Important for binary data
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Trigger download using FileSaver.js
    saveAs(blob, 'MongoData.xlsx');
  } catch (error) {
    console.error('Error downloading Excel data:', error);
  }
};


const handleDownloadcsv = async () => {
  try {
    const response = await axios.get('http://localhost:8080/contact/csv', {
      responseType: 'blob', // Important for binary data
    });

    const blob = new Blob([response.data], { type: 'text/csv' });

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'MongoData.csv';
    link.click();
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
};


  return (
    <div>
              {/* <Button>show</Button> */}
              <Box padding={'12px'}> 
  <Button leftIcon={<FaSlidersH />} bg='#4E73DF' variant='solid'      color={'white'} onClick={handleToggleCollapse}>
Filter 
 </Button>
 <Collapse in={!isCollapsed}>
 {/* <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('red', 'gray.800')}> */}
        {/* <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}> */}

          <Box
          margin={'10px'}
            rounded={'lg'}
            bg={useColorModeValue('', 'gray.700')}
            // border={'1px solid gray'}
            boxShadow='rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
           // boxShadow={'lg'}
          // box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            p={8}
            >
            <Stack spacing={4}>
              <Flex  justifyContent='space-between'>
                <Box bg='' width={'30%'}>
                  {/* <FormControl id="firstName" isRequired> */}
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" 
                     onChange={(e) => setFullname(e.target.value)}
                    //width={'350px'}
                    width={'100%'}
                    border={'1px solid gray'}
                    />
                  {/* </FormControl> */}
                </Box>
                <Box bg='' width={'30%'}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="text" 
                     onChange={(e) => setEmail(e.target.value)}
                    //width={'350px'}
                    border={'1px solid gray'}


                     />
                  </FormControl>
                </Box>
                <Box bg='' width={'30%'}>
                <FormControl id="age" isRequired>
                <FormLabel>Subject</FormLabel>
                <Input type="text" 
                 onChange={(e) => setSubject(e.target.value)}
                //width={'350px'}
                border={'1px solid gray'}


                />

              </FormControl>
                </Box>
              </Flex>

              <Flex  justifyContent='space-between' bg=''>

              <Box bg='' width={'40%'}>
                  <FormControl id="firstName" >
                    <FormLabel>Message Date</FormLabel>
                    <Input type="date" 
                    onChange={(e) => setDate(e.target.value)}
                    //width={'350px'}
                    border={'1px solid gray'}

                     />
                  </FormControl>
                </Box>
                <Box bg='' width={'40%'}>
                  {/* <FormControl id="firstName" isRequired> */}
                    <FormLabel>Status</FormLabel>
                    <Select name='open this status menu'              
                         border={'1px solid gray'}
              //width={'350px'}                 
                    onChange={(e)=>setStatus(e.target.value)}
                    >
                <option >open this status menu</option>
                <option value='replied'>Replied</option>
                <option value='pending'>Pending</option>
                </Select>
                  {/* </FormControl> */}
                </Box>
              </Flex>


              {/* <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email"                   
                // onChange={(e) => setEmail(e.target.value)}
                />

              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={'text'} 
                                        //  onChange={(e) => setPassword(e.target.value)}
                                         />
                                         

                </InputGroup>
              </FormControl> */}
                <Button
                  loadingText="Submitting"
                   size="md"
                   width={'10%'}
                   onClick={handleRegister}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Search
                </Button>

            </Stack>
          </Box>
        {/* </Stack> */}
      {/* </Flex> */}
      </Collapse>
 
 </Box>
        <Box>
        <Flex spacing={'9'} padding={'12px'} alignItems={'space-between'}>
            <Box>
            <Stack direction='row' spacing={4} align='center'>
  <Button colorScheme='blue' variant='outline'rounded={'none'} onClick={handleDownloadcsv}>
    CSV
  </Button>
  <Button colorScheme='blue' variant='outline'rounded={'none'} onClick={handleDownload}>
EXCEL  </Button>
<Button colorScheme='blue' variant='outline'rounded={'none'} onClick={generatePDF}>

    PDF
  </Button>
  
  <Select placeholder='Select Result' onChange={(e)=>setLimit(e.target.value)}>
  <option value='10'>10</option>
  <option value='25'>25</option>
  <option value='50'>50</option>
  <option value='100'>100</option>

</Select>
  {/* <MenuList>
    <MenuItem>10</MenuItem>
    <MenuItem>25</MenuItem>
    <MenuItem>50</MenuItem>
    <MenuItem>100</MenuItem>
  </MenuList> */}


</Stack>            </Box>
            <Spacer />

            <Box>
<Input placeholder='Search' border={'1px solid black'} value={query} onChange={(e) => setQuery(e.target.value)}/>
            </Box>

        </Flex>
        </Box>

        <Table
        d="inline-block"
        // border="1px solid black"
               // borderColor="gray.200"
        // borderRadius="md"
        // rounded="20px"
        rounded="md"
        w="100%"
        //m="50px"
        variant="simple"
      >
        <Thead         bg='orange'
>
          <Tr >
          <Th >Name</Th>
      <Th >Email</Th>

        <Th>Subject</Th>
        <Th >Message</Th>
        <Th> Status</Th>
        <Th >Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contact?.map((item)=>{
return (
  <Tr>
	        <Td   color='blue'><Link to={`/doctor/contacts/${item._id}`} >{item.name}</Link></Td>
        <Td >{item.email}</Td>
        <Td >{item.subject}</Td>
        <Td >{item.message}</Td>
        {item.status=='replied'?(        <Td color={'green'} fontWeight={'bold'}>Replied</Td>
):( <Td  color={'red'} fontWeight={'bold'}>Pending</Td>)}

        <Td >{item.Date}</Td>
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
         <Button bg={'gray.300'} isDisabled={page==totalPage} onClick={handlePage}><ChevronRightIcon/></Button> 

        </HStack>  </Box>
</Flex>
   </div>
  )
}

export default ContactDoctor
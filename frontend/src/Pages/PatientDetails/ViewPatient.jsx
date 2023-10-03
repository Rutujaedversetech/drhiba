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
} from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import { FaHtml5 } from "react-icons/fa";

import { isExpired, decodeToken } from "react-jwt";
import { authRegister, deleteuser, getAllusers, getAllusers2 } from '../../Redux/auth/action';
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
  import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

  import {
    FaSlidersH
  } from 'react-icons/fa';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [date, setJoiDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [name, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [page, setPage] = useState(1)
    const[limit,setLimit]=useState(3)
    const[is_superAdmin,setIsSuperAdmin]=useState('')


    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [query, setQuery] = useState('');

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.auth.Alluser)
    const totalPages = useSelector((state)=>state.auth.totalPage)
    const TotalData = useSelector((state)=>state.auth.TotalData)
    const result=`Showing 1 to ${details.length} of ${TotalData.length} entries`

    const token=localStorage.getItem('token')

  console.log('details',details,totalPages);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)

console.log('date',date);


  const query1 = new URLSearchParams({
    name,
    email,
    role,
  limit,
  date,
  page,
  is_superAdmin
   
    // Add more fields as needed
  }).toString();


  
  







  const handleRegister=()=>{

    dispatch(getAllusers(query1));
    setIsCollapsed(!isCollapsed)

  }

  const handlePage=()=>{
    setPage((prev)=>prev+1)
  }
  const handlePage2=()=>{
    setPage((prev)=>prev-1)
  }
  const generatePDF = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/pdf');
      if (response.ok) {
        // Create a blob URL for the PDF
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
  
        // Create a download link and click it
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'data3.pdf';
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
      const response = await axios.get('http://localhost:8080/users/csv', {
        responseType: 'blob', // Important for binary data
      });
  
      const blob = new Blob([response.data], { type: 'text/csv' });
  
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'MongoDatausers.csv';
      link.click();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  const handleDownloadexcel = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/excel', {
        responseType: 'blob', // Important for binary data
      });
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      // Trigger download using FileSaver.js
      saveAs(blob, 'MongoDatausers.xlsx');
    } catch (error) {
      console.error('Error downloading Excel data:', error);
    }
  };







  useEffect(()=>{
  dispatch(getAllusers2(page,limit,query))
  },[page,limit,query])

  const handleDeleteopp=(id)=>{
    dispatch(deleteuser(id))
          }
          const handleformData=({target})=>{
            let val = target.value;
            
            setProduct({ ...product, [target.name]: val });
          }
const handleSubmit=()=>{
    console.log('product',product);
    dispatch(authRegister(product));

}
const currentDate = new Date();
console.log(currentDate);
  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>Users</Heading>
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
              <Flex spacing={14} justifyContent="space-between">
              <Box bg='' width={'30%'}>
                  {/* <FormControl id="firstName" isRequired> */}
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" 
                    onChange={(e) => setFullname(e.target.value)}
                    border={'1px solid gray'}
                    />
                  {/* </FormControl> */}
                </Box>
                <Box bg='' width={'30%'}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="text" 
                     onChange={(e) => setEmail(e.target.value)}
                    border={'1px solid gray'}


                     />
                  </FormControl>
                </Box>
                <Box bg='' width={'30%'}>
                <FormControl id="age" isRequired>
                <FormLabel>Is SuperUser</FormLabel>
                <Select onChange={(e)=>{setIsSuperAdmin(e.target.value)}} width={''}>
                <option >Is SuperUser</option>

                <option value='true'>Yes</option>
                <option value='false'>No</option>

               </Select>

              </FormControl>
                </Box>
              </Flex>

              <Flex spacing={14} justifyContent="space-between">
              <Box bg='' width={'40%'}>
                  {/* <FormControl id="firstName" isRequired> */}
                    <FormLabel>Is Staff</FormLabel>
                    <Select name='role'              
                         border={'1px solid gray'}
              width={''}                 
             onChange={(e)=>{setRole(e.target.value)}}
                    >
                <option >is Staff</option>

                <option value='staff'>yes</option>
                <option value='patient'>No</option>
                </Select>
                  {/* </FormControl> */}
                </Box>
                {/* <Box bg='' width={'30%'}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Last Login</FormLabel>
                    <Input type="date" 
                    // onChange={(e) => setFullname(e.target.value)}
                    width={''}
                    border={'1px solid gray'}

                     />
                  </FormControl>
                </Box> */}
                <Box bg='' width={'40%'}>
                <FormControl id="age" isRequired>
                <FormLabel>Joined Date</FormLabel>
                <Input type="date" 
               onChange={(e) => setJoiDate(e.target.value)}
                width={''}
                border={'1px solid gray'}

                />

              </FormControl>
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
<Input placeholder='Search' border={'1px solid black'} value={query} onChange={(e) => setQuery(e.target.value)} />
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
        <Thead bg='orange'>
          <Tr >
          <Th >Name</Th>
        <Th >Email</Th>
        <Th >Is SuperUser</Th>
        <Th >Is Staff</Th>
        <Th >Joined date</Th>
        <Th >Last login</Th>
        <Th >Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {details?.map((item)=>{
return (
  <Tr>
		{/* <Td  border={'1px solid black'}><Link to={`/patient/${item._id}`}><Text color='blue'>{item.name}</Text></Link></Td> */}
    <Td ><Text color='blue'>{item.name}</Text></Td>

        <Td ><Text color={'blue'}>{item.email}</Text></Td>
        <Td >{item.is_superAdmin ?("✅"):("❌")}</Td>
        <Td >{item.role=="staff" ?("✅"):("❌")}</Td>
        <Td >{item.date}</Td>
        <Td >
          {/* <Link to={`/doctors/contactss/fees/${item._id}`} color='blue' > */}
            <Text color='blue'>{item.isLoggedin ?(item.isLoggedinTime):('null')}</Text>
          {/* </Link> */}
          </Td>
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
                <FormLabel>Full Name</FormLabel>
                <Input
                 onChange={handleformData}
                  ref={initialRef}
                  type="url"
                  name="name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={handleformData}
                  ref={initialRef}
                 // placeholder="Product Name"
                  name="email"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>UserType</FormLabel>
                <Select name='role'                   onChange={handleformData}>
                <option > Add SuperAdmin</option>

                <option value='doctor'>SuperAdmin</option>
                <option value='staff'>staff</option>
                <option value='patient'>user</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>password</FormLabel>
                <Input
                  onChange={handleformData}
                  name="password"
                 // placeholder="Add Your story"
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
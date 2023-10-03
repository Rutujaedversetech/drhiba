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
} from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

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
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.auth.Alluser)
    const token=localStorage.getItem('token')

  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)





const getDate=(date1)=>{



  const timestampString = "2023-08-03T11:05:05.113+00:00";

  // Create a new Date object from the timestamp string
  const timestamp = new Date(date1);
  
  // Extract the components from the Date object
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, "0");
  const day = String(timestamp.getDate()).padStart(2, "0");
  const hours = String(timestamp.getHours()).padStart(2, "0");
  const minutes = String(timestamp.getMinutes()).padStart(2, "0");
  const seconds = String(timestamp.getSeconds()).padStart(2, "0");
  
  // Create the desired format
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedTimestamp = `${formattedDate}T${formattedTime}+00:00`;
  
  console.log(formattedDate ); // Output: "2023-08-03T11:05:05.113+00:00"
setDate(formattedDate)
}  
  
  //console.log('date',date);
  
  
  











  useEffect(()=>{
  dispatch(getAllusers())
  },[])

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
  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>UserFeedback</Heading>
            </Box>
            <Spacer />

            {/* <Box>
                <Button bg='#4E73DF'     color={'white'}                  onClick={() => {
                        onOpen();
                     //   setProduct(item);
                      }}>Add</Button>
            </Box> */}

        </Flex>
<Box padding={'12px'}> 

 
 </Box>
        <Box>
        <Flex spacing={'9'} padding={'12px'} alignItems={'space-between'}>
            <Box>
            <Stack direction='row' spacing={4} align='center'>
  <Button colorScheme='blue' variant='outline'rounded={'none'} >
    CSV
  </Button>
  <Button colorScheme='blue' variant='outline'rounded={'none'}>
EXCEL  </Button>
<Button colorScheme='blue' variant='outline'rounded={'none'}>
    PDF
  </Button>
  <Box>Show<Menu >
  <MenuButton as={Button} margin={'10px'} rightIcon={<ChevronDownIcon />} border={'1px solid black'}>
    10
  </MenuButton>
  <MenuList>
    <MenuItem>10</MenuItem>
    <MenuItem>25</MenuItem>
    <MenuItem>50</MenuItem>
    <MenuItem>100</MenuItem>
  </MenuList>
</Menu>entries</Box>

</Stack>            </Box>
            <Spacer />

            <Box>
<Input placeholder='Search' border={'1px solid black'}/>
            </Box>

        </Flex>
        </Box>
        <TableContainer  border={'1px solid black'}>
  <Table border={'1px solid black'} borderCollapse={''}>
    <Thead>
      <Tr>
      <Th border={'1px solid black'}>Name</Th>
        <Th border={'1px solid black'}>Email</Th>
        <Th border={'1px solid black'}>Rating</Th>
        <Th border={'1px solid black'}>Description</Th>
        <Th border={'1px solid black'}>Display</Th>



      </Tr>
    </Thead>
    {
    details.map((item)=>{
        //getDate(item.createdAt)

        const timestamp = new Date(item.createdAt);
  
        // Extract the components from the Date object
        const year = timestamp.getFullYear();
        const month = String(timestamp.getMonth() + 1).padStart(2, "0");
        const day = String(timestamp.getDate()).padStart(2, "0");
        const hours = String(timestamp.getHours()).padStart(2, "0");
        const minutes = String(timestamp.getMinutes()).padStart(2, "0");
        const seconds = String(timestamp.getSeconds()).padStart(2, "0");
        
        // Create the desired format
        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        const formattedTimestamp = `${formattedDate}T${formattedTime}+00:00`;
        
       // console.log(formattedDate );











            return(
    <Tbody>
      <Tr>
        <Td  border={'1px solid black'}><Link to={`/patient/${item._id}`}><Text color='blue'>{item.name}</Text></Link></Td>
        <Td border={'1px solid black'}><Text color={'blue'}>{item.email}</Text></Td>
        <Td border={'1px solid black'}>null</Td>
        <Td border={'1px solid black'}>null</Td>


        <Td border={'1px solid black'}>❌</Td>
        {/* <Td border={'1px solid black'}>{formattedDate}</Td> */}
        {/* <Td border={'1px solid black'}>
          <Link to={`/doctors/contactss/fees/${item._id}`} color='blue' >
            <Text color='blue'>{item.Appofees ?(item.Appofees):(0)}</Text>
          </Link>
          </Td> */}

        {/* <Td  border={'1px solid black'} onClick={()=>handleOppointment(item._id,item,item.status)}>
          {!item.visited ?item.status ?(<Button backgroundColor={'green'}>confirmed</Button>):
          (<Button backgroundColor={'red'}>pending</Button>)
          
          :(<Button bg='orange'>Visited</Button>)}
          
          </Td> */}
          {/* <Td border={'1px solid black'}><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red'/></Button></Td>   */}

      </Tr>
     
    </Tbody>
    ) })
    }

  </Table>
</TableContainer> 
<Flex>
  <Box p='4' bg=''>
    <Text>Showing 1 to 6 of 6 entries</Text>
  </Box>
  <Spacer />
  <Box p='4' bg=''>
  <HStack padding={'10px'}>
            <Button bg={'gray.300'}>Previous</Button>
            <Text>1</Text>
            <Button bg={'gray.300'} >Next</Button>
            {/* <Text>showing 1 to ${} of ${} result</Text> */}

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
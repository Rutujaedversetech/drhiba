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
import { ChevronDownIcon, AddIcon, WarningIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

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
  import { saveAs } from 'file-saver';
import axios from 'axios';

import {
    AiFillDelete
  } from 'react-icons/ai';
  import { Collapse } from '@chakra-ui/transition';

  import {
    FaSlidersH
  } from 'react-icons/fa';
import { addslotetails, deleteslotdata, getAllSlot } from '../../../Redux/slot/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [time, setTime] = useState('10:00');
    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [page, setPage] = useState(1)
    const[limit,setLimit]=useState(2)


    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.slot.data)
    const totalPages = useSelector((state)=>state.slot.totalPage)
    const TotalData = useSelector((state)=>state.slot.TotalData)
    const result=`Showing 1 to ${details.length} of ${TotalData.length} entries`

    const token=localStorage.getItem('token')
    const [query, setQuery] = useState('');

  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)
















  useEffect(()=>{
  dispatch(getAllSlot(query,limit,page))
  },[query,limit,page])

  const handleDeleteopp=(id)=>{
    dispatch(deleteslotdata(id))
          }

const handleSubmit=()=>{
    //console.log('product',product);
   // dispatch(addslotetails({time:time}));
    const selectedAMPM = parseInt(time.split(':')[0]) >= 12 ? 'PM' : 'AM';
    const combinedTime = time + " " + selectedAMPM;
    //alert("Selected Time: " + combinedTime);
    console.log( 'hgcngfcgnfcgffffff',parseInt(time.split(':')[0]));
    if(parseInt(time.split(':')[0])>=10 && parseInt(time.split(':')[0])<=19 ){

      const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':');
        const parsedHours = parseInt(hours);
        const ampm = parsedHours >= 12 ? 'PM' : 'AM';
        const adjustedHours = parsedHours % 12 || 12; // Convert 0 to 12
        return `${adjustedHours}:${minutes} ${ampm}`;
      };
      const formattedTime = convertTo12HourFormat(time);

          dispatch(addslotetails({time:formattedTime}));

console.log('formattedTime',formattedTime);
    }

else{
  alert("Selected Time: " + 'slect time');

}

}

const handlePage=()=>{
  setPage((prev)=>prev+1)
}
const handlePage2=()=>{
  setPage((prev)=>prev-1)
}



const generatePDF = async () => {
  try {
    const response = await fetch('http://localhost:8080/slot/pdf');
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
    const response = await axios.get('http://localhost:8080/slot/csv', {
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
    const response = await axios.get('http://localhost:8080/slot/excel', {
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





  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>Slot</Heading>
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
        <TableContainer  >
  <Table borderCollapse={''}>
    <Thead bg={'orange'}>
      <Tr>
        <Th >Timing</Th>
        <Th >Delete</Th>


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

        <Td>{item.time}</Td>

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
  <Box p='4' bg=''>
    <Text>{result}</Text>
  </Box>
  <Spacer />
  <Box p='4' bg=''>
  <HStack padding={'10px'}>
  <Button bg={'gray.300'} isDisabled={page==1} onClick={handlePage2}><ChevronLeftIcon/></Button>
            <Text>{page}</Text>
         <Button bg={'gray.300'} isDisabled={page==totalPages} onClick={handlePage}><ChevronRightIcon/></Button> 
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
                <FormLabel>Add Time</FormLabel>
                <Input
                  onChange={(e)=>setTime(e.target.value)}
                // ?ref={initialRef}
                  type="time"
                  name="name"
          id="time-input"
          min="10:00"
          max="19:00"
          step="900" // 15 minutes interval
          value={time}
          //onChange={handleTimeChange}
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



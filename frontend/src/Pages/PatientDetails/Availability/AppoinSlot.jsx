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
import { saveAs } from 'file-saver';
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
import { addslotholidayetails, deleteslotholidaydata, getAllSlotholiday, getAllSlotholiday2 } from '../../../Redux/slotholiday/action';
import { addDateHoliday, getAlldateholiday } from '../../../Redux/dateholiday/action';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [date1, setDatev] = useState('');
    //const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [page, setPage] = useState(1)
    const[limit,setLimit]=useState(10)
    const holiday = useSelector((state)=>state.holiday.TotalData)


    const [isCollapsed, setIsCollapsed] = useState(true);
    const [time1,setHolidaySlot ] = useState('');
    const [query, setQuery] = useState('');


    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const totalPages = useSelector((state)=>state.slotholiday.totalPage)
    const details = useSelector((state)=>state.slotholiday.data)
    const TotalData = useSelector((state)=>state.slotholiday.TotalData)
    const result=`Showing 1 to ${details.length} of ${TotalData.length} entries`
    const token=localStorage.getItem('token')

  console.log('details',details);
  const [selectedDate, setSelectedDate] = useState(null);
  const disabledDates = holiday&&holiday.map(item => new Date(item.dateH));
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)
  const [date, setDate] = useState(selectedDate ? formatDate(selectedDate) : '');

  const query1 = new URLSearchParams({
    limit,page,

  date,
  time
   
    // Add more fields as needed
  }).toString();




  //console.log('date',date);
  
  
  











  useEffect(()=>{
  dispatch(getAllSlotholiday(query,limit,page))
  dispatch(getAlldateholiday(query,limit,page))

  },[query,limit,page])

  const handleDeleteopp=(id)=>{
    dispatch(deleteslotholidaydata(id))
          }
          const handleformData=({target})=>{
            let val = target.value;
            
            setProduct({ ...product, [target.name]: val });
          }
const handleSubmit=()=>{
    console.log('product',product);
    dispatch(addslotholidayetails({time:time1,date:selectedDate ? formatDate(selectedDate) : '' }));

}

const generatePDF = async () => {
  try {
    const response = await fetch('http://localhost:8080/slotholiday/pdf');
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
    const response = await axios.get('http://localhost:8080/slotholiday/csv', {
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
    const response = await axios.get('http://localhost:8080/slotholiday/excel', {
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

const handleRegister=()=>{

 // dispatch(getAllusers(query1));
 dispatch(getAllSlotholiday2(query1))

  setIsCollapsed(!isCollapsed)

}


const handlePage=()=>{
  setPage((prev)=>prev+1)
}
const handlePage2=()=>{
  setPage((prev)=>prev-1)
}




  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>Slot Holiday</Heading>
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
                <Box>
                  {/* <FormControl id="firstName" isRequired> */}
                    <FormLabel>Date</FormLabel>
                    <Input type="date" 
                     onChange={(e) => setDate(e.target.value)}
                    width={'350px'}
                    border={'1px solid gray'}
                    />

                  {/* </FormControl> */}
                </Box>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Time</FormLabel>


<Select placeholder='Select option'   onChange={(e)=>setTime(e.target.value)}>
<option ></option>

  <option value='10 AM'>10 AM</option>
  <option value='11 AM'>11 AM</option>
  <option value='12 PM'>12 PM</option>
  <option value='01 PM'>01 PM</option>
  <option value='02 PM'>02 PM</option>
  <option value='03 PM'>03 PM</option>
  <option value='04 PM'>04 PM</option>
  <option value='05 PM'>05 PM</option>
  <option value='06 PM'>06 PM</option>
  <option value='07 PM'>07 PM</option>


</Select>
                  </FormControl>
                </Box>
              
              </Flex>



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
<Input placeholder='Search' border={'1px solid black'}
value={query} onChange={(e) => setQuery(e.target.value)}

/>
            </Box>

        </Flex>
        </Box>
        <TableContainer >
  <Table borderCollapse={''}>
    <Thead bg='orange'>
      <Tr>
      <Th >Date</Th>
        <Th >Time</Th>
        <Th >Delete</Th>


      </Tr>
    </Thead>
    {
    details.map((item)=>{










            return(
    <Tbody>
      <Tr>
      <Td >{item.date}</Td>

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
            <ModalHeader>Add </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <DatePicker
                      showIcon

        className="custom-datepicker"
        // placeholderText="Click to select a date"
        minDate={new Date()}
        selected={selectedDate}

        onChange={(date) => setSelectedDate(date)}
        excludeDates={disabledDates}
        filterDate={(date) => {return date.getDay() !== 0 && date.getDay() !== 7;
        }}/>
              </FormControl>
              <FormControl>
                <FormLabel>Slot</FormLabel>
               

<Select placeholder='Select option'   onChange={(e)=>setHolidaySlot(e.target.value)}>
<option ></option>

  <option value='10 AM'>10 AM</option>
  <option value='11 AM'>11 AM</option>
  <option value='12 PM'>12 PM</option>
  <option value='01 PM'>01 PM</option>
  <option value='02 PM'>02 PM</option>
  <option value='03 PM'>03 PM</option>
  <option value='04 PM'>04 PM</option>
  <option value='05 PM'>05 PM</option>
  <option value='06 PM'>06 PM</option>
  <option value='07 PM'>07 PM</option>


</Select>
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
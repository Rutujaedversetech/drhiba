import React, { useEffect, useState } from 'react'
import { deleteOppointment, getAllProducts, getAllProducts2, updateOppintmentStatus } from '../../Redux/blogs/action';
import { useDispatch, useSelector } from 'react-redux';
import About from '../About/About';
import { Table, TableCaption, TableContainer, Td, Thead, Tr ,Th,Tbody,Tfoot,Button,Text, Box, Input, Spacer, MenuItem, MenuList, MenuButton, Menu, Stack, Flex, FormLabel, FormControl, Select, useColorModeValue, HStack} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Collapse } from '@chakra-ui/transition';
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { saveAs } from 'file-saver';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {  Heading, IconButton} from '@chakra-ui/react';

  import {
    FaSlidersH
  } from 'react-icons/fa';
import {
  AiFillDelete
} from 'react-icons/ai';
import axios from 'axios';
import TodayAppointment from './Dashboard/TodayAppointment';
const PatientDetails = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [name, setFullname] = useState('');
  const [oemail, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [page, setPage] = useState(1)
  const[limit,setLimit]=useState(5)
  const [visited, setVisited] = useState('');
  const [status, setStatus] = useState('');

  const [query, setQuery] = useState('');

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [fee,setFee]=useState(0)
    const dispatch = useDispatch();
    // console.log(fullname,oemail,date,position);
    const details = useSelector((state)=>state.patient.data)
    const totalPage = useSelector((state)=>state.patient.totalPage)
    const TotalData = useSelector((state)=>state.patient.TotalData)
   const l= details.length?(details.length):"0"
   const t= TotalData.length?(TotalData.length):"0"
//console.log();
   const result=`Showing 1 to ${l} of ${t} entries`

//console.log('l',l,t);
console.log('details',details);


const query1 = new URLSearchParams({
  name,
  oemail,

  date,
  limit,page,
  mobileNo,
  visited,
status,
  // Add more fields as needed
}).toString();


console.log('query1',query,query1);

    useEffect(() => {

        dispatch(getAllProducts2(page,limit,query));
    
      }, [dispatch,page,limit,query]);


      const handleDeleteopp=(id)=>{
dispatch(deleteOppointment(id))
      }


      const handleOppointment=(open1,item,opening)=>{

        console.log('open0',open1,item,opening);
      
      if(opening){
       dispatch(updateOppintmentStatus(open1, {...item,"status":false}));
      
        }else{
          dispatch(updateOppintmentStatus(open1, {...item,"status":true}));
      
      
        }
      
      }
      const handleRegister=()=>{

        dispatch(getAllProducts(query1));
        setIsCollapsed(!isCollapsed)

      }



      const generatePDF = async () => {
        try {
          const response = await fetch('http://localhost:8080/blogs/pdf');
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

      const handlePage=()=>{
        setPage((prev)=>prev+1)
      }
      const handlePage2=()=>{
        setPage((prev)=>prev-1)
      }

      const handleDownloadcsv = async () => {
        try {
          const response = await axios.get('http://localhost:8080/blogs/csv', {
            responseType: 'blob', // Important for binary data
          });
      
          const blob = new Blob([response.data], { type: 'text/csv' });
      
          // Create a temporary link and trigger download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'MongoDatablog.csv';
          link.click();
        } catch (error) {
          console.error('Error downloading CSV:', error);
        }
      };

      const handleDownloadexcel = async () => {
        try {
          const response = await axios.get('http://localhost:8080/blogs/excel', {
            responseType: 'blob', // Important for binary data
          });
      
          // Create a Blob from the response data
          const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
      
          // Trigger download using FileSaver.js
          saveAs(blob, 'MongoDatablog.xlsx');
        } catch (error) {
          console.error('Error downloading Excel data:', error);
        }
      };

      const scrollContainerRef = React.useRef(null);

      const scrollLeft = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
        }
      };
    
      const scrollRight = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
        }
      };
    
      const sortedData = details.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();

  return (
    <div>
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
              <Flex spacing={4} justifyContent="space-between">
              <Box bg='' width={'30%'}>
                  {/* <FormControl id="firstName" isRequired> */}
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" 
                   onChange={(e) => setFullname(e.target.value)}
                    // width={'350px'}
                    border={'1px solid gray'}
                    />
                  {/* </FormControl> */}
                </Box>
                <Box bg='' width={'30%'}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="text" 
                     onChange={(e) => setEmail(e.target.value)}
                    // width={'350px'}
                    border={'1px solid gray'}


                     />
                  </FormControl>
                </Box>
                <Box bg='' width={'30%'}>
                <FormControl id="age" isRequired>
                <FormLabel>Mobile Number</FormLabel>
               
                <Input type="text" 
                     onChange={(e) => setMobileNo(e.target.value)}
                    // width={'350px'}
                    border={'1px solid gray'}


                     />
              </FormControl>
                </Box>
              </Flex>

              <Flex  justifyContent="space-between">

              <Box bg='' width={'30%'}>
                <FormControl id="age" isRequired>
                <FormLabel>Visited</FormLabel>
<Select onChange={(e)=>{setVisited(e.target.value)}}>
<option >set visited</option>

  <option value={true}>Yes</option>
  <option value={false}>No</option>

</Select>

              </FormControl>


                </Box>

                <Box bg='' width={'30%'}>
                <FormControl id="age" isRequired>
                <FormLabel>Appointment Status</FormLabel>
<Select onChange={(e)=>{setStatus(e.target.value)}} width={''}>
<option >set status</option>

  <option value={true}>Confirmed</option>
  <option value={false}>Pending</option>

</Select>

              </FormControl>


                </Box>
                <Box bg='' width={'30%'}>
                <FormControl id="age" isRequired>
                <FormLabel>Appointment Date</FormLabel>
                <Input type="date" 
                 onChange={(e) => setDate(e.target.value)}
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
<Input placeholder='Search' border={'1px solid black'} value={query} onChange={(e) => setQuery(e.target.value)}/>
            </Box>

        </Flex>
        </Box>

    
{/* <TableContainer  >
  <Table borderRadius={'10px'} borderCollapse={''}>
    <Thead bg='orange' borderRadius={'10px'}>
      <Tr>
      <Th>Name</Th>
        <Th>Appointment Date</Th>
        <Th >Email</Th>
        <Th >Mobile Number</Th>
        <Th >Age</Th>
        <Th >upload Docs</Th>
        <Th>Add Fees</Th>

        <Th >Appointment</Th>
        <Th>Delete</Th>


      </Tr>
    </Thead>
    
    {details.map((item)=>{
            return(
    <Tbody>
      <Tr>
        <Td ><Link to={`/patient/${item._id}`}><Text color='blue'>{item.name}</Text></Link></Td>
        <Td >{item.date}</Td>
        <Td ><Text color={'blue'}>{item.oemail}</Text></Td>
        <Td >{item.mobileNo}</Td>
        <Td >{item.age}</Td>
        <Td >
          {
           !item.visited ? item.status ?(<Text backgroundColor={''}>Not Visited</Text>):
            (<Text backgroundColor={''}>Pending</Text>)          :(<Link to={`/patient/${item._id}`}>
              <Button bg={'#5579c6'}>Documents</Button></Link>
            )

          }
                        </Td>

        <Td >
          <Link to={`/doctors/contactss/fees/${item._id}`} color='blue' >
            <Text color='blue'>{item.Appofees ?(item.Appofees):(0)}</Text>
          </Link>
          </Td>

        <Td   onClick={()=>handleOppointment(item._id,item,item.status)}>
          {!item.visited ?item.status ?(<Button backgroundColor={'green'}>confirmed</Button>):
          (<Button backgroundColor={'red'}>pending</Button>)
          
          :(<Button bg='orange'>Visited</Button>)}
          
          </Td>
          <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete/></Button></Td>

      </Tr>
     
    </Tbody>
    ) })}

  </Table>
</TableContainer> 
        */}
              <TodayAppointment details={sortedData}/>

<Flex>
  <Box p='4' bg=''>
      <Text>{result ?(result):"0"}</Text>  
  </Box>
  <Spacer />
  <Box p='4' bg=''>
  <HStack padding={'10px'}>
  <Button bg={'gray.300'} isDisabled={page==1} onClick={handlePage2}><ChevronLeftIcon/></Button>
            <Text>{page}</Text>
         <Button bg={'gray.300'} isDisabled={page==totalPage} onClick={handlePage}><ChevronRightIcon/></Button> 
            {/* <Text>showing 1 to ${} of ${} result</Text> */}


        </HStack>  </Box>
</Flex>
    </div>
  )
}

export default PatientDetails
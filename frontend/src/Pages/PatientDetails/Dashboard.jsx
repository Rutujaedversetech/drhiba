'use client'

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Heading,
  Stack,
  Container,
  Input,
  HStack,
  Button,
  Spacer,
  VStack,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import { BsFillCalendarFill,BsCurrencyDollar,BsMessenger } from 'react-icons/bs'
import { FaCalendarAlt } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import Graph from './Dashboard/Graph'
import TodayAppointment from './Dashboard/TodayAppointment'
import AppointmenFees from './Dashboard/AppointmenFees'
import axios from 'axios';
import { getAllProducts, getAllProducts2, getAllProducts3 } from '../../Redux/blogs/action'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon,ChevronDownIcon } from '@chakra-ui/icons';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { Collapse } from '@chakra-ui/transition';
import GraphEarning from './Dashboard/GraphEarning'


function StatsCard(props) {
  const { title, stat, icon,color } = props
  const dispatch = useDispatch();


  // Sample MongoDB data

  return (
    <Stat
      px={{ base: 2, md: 4 }}

      py={'5'}
      shadow={'xl'}
      borderLeft={`5px solid ${color}`}
      //borderColor={useColorModeValue('', 'gray.500')}
      //boxShadow= 'rgb(38, 57, 77) 0px 20px 30px -10px'
     // boxShadow=  'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
      boxShadow= 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset'
      rounded={'lg'}>
      <Flex justifyContent={'space-between'} bg=''>
        <Box pl={{ base: 2, md: 4 }}>
          <Text  isTruncated fontSize={'13px'} color={color}>
            {title}
          </Text>
          <StatNumber fontSize={'xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default function BasicStatistics() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate()-7);

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endDate, setEndDate] = useState('');

  const [startDate1, setStartDate1] = useState(sevenDaysAgo.toISOString().split('T')[0]);
  const [endDate1, setEndDate1] = useState(today.toISOString().split('T')[0]);


  const [filteredData, setFilteredData] = useState([]);
console.log('startDate',startDate,endDate);
const details = useSelector((state)=>state.patient.data)
console.log('details',details);
const dispatch = useDispatch();
const [page, setPage] = useState(1)
  const[limit,setLimit]=useState(5)
  const [visited, setVisited] = useState('');
  const [status, setStatus] = useState('');

  const [query, setQuery] = useState('');


const query1 = new URLSearchParams({
  startDate,endDate
}).toString();
console.log('query1',query1);

const handleSubmit = async (event) => {
  dispatch(getAllProducts3(startDate,endDate));

  // event.preventDefault();

  // try {
  //   const response = await axios.get(`http://localhost:8080/blogs/data?startDate=${startDate}&endDate=${endDate}`);
  //   setFilteredData(response.data);
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }
};
console.log('filteredData',startDate,endDate);


useEffect(() => {

  //dispatch(getAllProducts2(page,limit,query));
  dispatch(getAllProducts3(startDate1,endDate1));


}, [dispatch,startDate1,endDate1]);


const incompleteTasks1 = details.filter(task => task.status === false &&task.visited===false);

var monthlyAmt=0
for(var i=0;i<details.length;i++){
  //monthlyAmt=monthlyAmt+parseInt(details[i].Appofees)
  var a=Number(details[i].Appofees)
  console.log('monthlyAmt',typeof details[i].Appofees,typeof a);
  monthlyAmt=monthlyAmt+a

}
console.log('monthlyAmt',monthlyAmt);


const mongoData = [
  { date: "2023-08-01", fee: 100 },
  { date: "2023-08-01", fee: 150 },
  { date: "2023-08-02", fee: 200 },
  // ... more data ...
];
const sortedData = details.reverse().sort((a, b) => new Date(b.date) - new Date(a.date));
//return new Date(a.date) - new Date(b.date);

console.log('sortedData',sortedData);
// Create a map to aggregate fees by date
const aggregatedDataMap = new Map();

sortedData.forEach(entry => {
  const { date, Appofees } = entry;
  const feeAmount = parseInt(Appofees)
  if (aggregatedDataMap.has(date)) {
    aggregatedDataMap.set(date, aggregatedDataMap.get(date) + feeAmount);
  } else {
    aggregatedDataMap.set(date, feeAmount);
  }
});

const visitedCountByDate = {};

sortedData.forEach(entry => {
  const { date, visited } = entry;
  
  if (!visitedCountByDate[date]) {
    visitedCountByDate[date] = 0;
  }
  
  if (visited) {
    visitedCountByDate[date]++;
  }
});

const currentDate = new Date();


const statusCountByDate = {};

  sortedData.forEach(entry => {

    const { date, status,visited } = entry;
    const appointmentDate = new Date(date);

    if (!statusCountByDate[appointmentDate]) {
      statusCountByDate[appointmentDate] = {
        confirmed: 0,
        pending: 0,
        not_visited:0
      };
    }

    // if (status && !visited ) {
      //if(appointmentDate < currentDate){
        if((appointmentDate < currentDate && appointmentDate.toDateString() !== currentDate.toDateString()) 
       && !visited ){
        statusCountByDate[appointmentDate].not_visited++;

      }
      else {
        if((appointmentDate > currentDate ||
          appointmentDate.toDateString() === currentDate.toDateString()) && status){
          statusCountByDate[appointmentDate].confirmed++;
  
        }
        else if((appointmentDate > currentDate ||
          appointmentDate.toDateString() === currentDate.toDateString()) && !status){
          statusCountByDate[appointmentDate].pending++;
  
        }
      }
    // } 
    // else if(!status && !visited) {
    //   statusCountByDate[appointmentDate].pending++;
    // }
  });
console.log('statusCountByDate',statusCountByDate);

const chartLabels = Object.keys(visitedCountByDate);
const chartData = Object.values(visitedCountByDate);

// Convert aggregated data map into arrays for Chart.js
const aggregatedDates = Array.from(aggregatedDataMap.keys());
const aggregatedFees = Array.from(aggregatedDataMap.values());
console.log('aggregatedDates',chartLabels,chartData,aggregatedDates,aggregatedFees);


const incompleteTasks=Object.values(statusCountByDate).map(data => data.pending)
console.log('incompleteTasks',incompleteTasks);
var pen=0
for(var i=0;i<incompleteTasks.length;i++){
  if(incompleteTasks[i]==1){
    pen++

  }
}
console.log('pen',pen);


const [userData, setUserData] = useState(details);
  const asd=    {
    labels: aggregatedDates?.map((data) => data),

    datasets: [
      {
        label: "Earning",
        data: aggregatedFees?.map((data) => data),
        backgroundColor: 'rgba(239, 83, 80, 0.2)',
        borderColor: '',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  }
  //setUserData(asd)
  console.log('asd',userData,asd);

  const asd2=    {
    labels: chartLabels?.map((data) => data),

    datasets: [
      {
        label: "appointment",
        data: chartData?.map((data) => data),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",

          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
        tension:0.4
      },
    ],
  }




 const appointmentsData = sortedData.map((entry) => ({
    date: entry.date,
    pending: entry.visited === false && entry.status === false,
    visited: entry.visited === true,
    confirmed: entry.status === true && entry.visited === false,
  }));
console.log('appointmentsData',appointmentsData);
  // Organize the data for different categories
  const chartLabels1 = appointmentsData.map((entry) => entry.date);
  const pendingData = appointmentsData.map((entry) => entry.status ? 0 : 1);
  const visitedData = appointmentsData.map((entry) => entry.visited ? 1 : 0);
  const confirmedData = appointmentsData.map((entry) => entry.status ? 1 : 0);

  const chartData1 = {
    labels: chartLabels,

    datasets: [
      {
        label: 'Pending',
        data: Object.values(statusCountByDate).map(data => data.pending),
         backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'red',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Visited',
        data: chartData?.map((data) => data),
        backgroundColor: 'rgba(239, 83, 80, 0.2)',
        borderColor: 'orange',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Not Visited',
        data: Object.values(statusCountByDate).map(data => data.not_visited),
        backgroundColor: 'rgba(239, 83, 80, 0.2)',
        borderColor: 'blue',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Confirmed',
        data: Object.values(statusCountByDate).map(data => data.confirmed),
        backgroundColor: 'rgba(63, 195, 128, 0.2)',
        borderColor: 'green',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };



  









  return (

    <Box 
    maxW="7xl" bg='' mx={''} pt={5} px={{ base: 2, sm: 12, md: 17 }} 
    >
      <Box margin={'10px'} bg=''>
        
      {/* <Flex justifyContent={'space-between'}> */}

         {/* <Heading>Dashboard</Heading>  */}
         {/* <Spacer/>  */}
         <Flex direction="column" align="" p={4}  width={'100%'} bg=''>
        <Flex justifyContent={'space-between'} gap={''} bg=''>
          <Box>        <Heading>Dashboard</Heading> </Box>
<Box>
<Button  bg='#4E73DF'  position={'right'} variant='solid'  marginRight={''}   color={'white'} onClick={handleToggleCollapse}>
         Filter 
         </Button>
</Box>


        </Flex>
  
 <Box position="relative" bg='' width={'100%'}>
 <Collapse in={!isCollapsed} bg=''>
 

          <Box

          margin={'10px'}
            rounded={'lg'}
            //width={'100%'}
            bg={useColorModeValue('', 'gray.700')}
             border={'1px solid gray'}
            //boxShadow='rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
           // boxShadow={'lg'}
          // box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            p={4}
            >
            {/* <Stack spacing={4}> */}


              <Flex gap={''} justifyContent="space-between">

                <Box>
                  {/* <FormControl id="firstName" isRequired> */}
                    <FormLabel>Start Date</FormLabel>
                    <Input type="date" 
                    onChange={(e) => setStartDate(e.target.value)}
                    width={'250px'}
                    border={'1px solid gray'}

                     />
                  {/* /</FormControl> */}
                </Box>
                <Box>
                {/* <FormControl id="age" isRequired> */}
                <FormLabel>End Date</FormLabel>
                <Input type="date" 
               onChange={(e) => setEndDate(e.target.value)}
                width={'250px'}
                border={'1px solid gray'}

                />

              {/* </FormControl> */}
                </Box>
<Box>
<FormLabel color={'white'}>S</FormLabel>

               <Button
                  loadingText="Submitting"
                   size="md"
                   width={'auto'}
                   onClick={handleSubmit}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>

                  Apply
                </Button>
</Box>
 

              </Flex>



                {/* <Button
                  loadingText="Submitting"
                   size="md"
                   width={'20%'}
                  // onClick={handleRegister}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>

                  Search
                </Button> */}

            {/* </Stack> */}
          </Box>

 </Collapse>
 </Box>
 </Flex>



{/* </Flex> */}
      </Box>
{/* <Box margin={'30px'}>
<TodayAppointment details={details}/>

</Box> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} >
        <StatsCard title={'EARNINGS'} stat={monthlyAmt} color='blue' icon={<BsCurrencyDollar size={'2em'} color='gray'  />} />
        <StatsCard title={'APPOINTMENT'} stat={details.length} color='#36B9CC' icon={<FaCalendarAlt size={'2em'} color='gray' />} />
        <StatsCard title={'PENDING REQUESTS'} stat={pen} color='#F6C23E' icon={<BsMessenger size={'2em'} color='gray' />} />

      </SimpleGrid>
      <Box margin={'30px'}>
{/* <TodayAppointment details={sortedData}/> */}

</Box>
      <Container maxW={'7xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} bg=''>
        <Stack width={'100%'} spacing={4} bg='' colSpan={2} padding={'10px'}
        boxShadow= 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset'
        >
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
Appointment          </Text>
 {/* <GraphEarning UserData={details}/>  */}
 {/* <Line data={asd2} />  */}
 <Line data={chartData1}/>

        </Stack>
        <Stack spacing={4}  width={'100%'}  bg='' padding={'10px'}
        boxShadow= 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset'
        >        <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
Earning          </Text>

          
           {/* <SecondColo/>  */}
             {/* <GraphEarning /> */}
        
             <Line data={asd} /> 
        
        
        
        
        
        </Stack>
      </SimpleGrid>
    </Container>
      <Box>
      <TodayAppointment details={sortedData}/>
      </Box>
      <Box>
        {/* <AppointmenFees/> */}
      </Box>
    </Box>
  )
}
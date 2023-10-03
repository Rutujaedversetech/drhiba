import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    Select,
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { addOppointment, getSingleUser } from '../../../Redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAlldateholiday } from '../../../Redux/dateholiday/action';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllSlotholiday } from '../../../Redux/slotholiday/action';
import { decodeToken } from 'react-jwt';

  export default function SignupCard() {
    const  data = useSelector((store) => store.auth);
    const holiday = useSelector((state)=>state.holiday.TotalData)
    const[datsd,setDatedd]=useState([])
    const data2 = [
      {
        "date": "2023-09-15",
      },
      {
        "date": "2023-09-20",
      }
    ];
console.log('datr',holiday);

const disabledDates = holiday&&holiday.map(item => new Date(item.dateH));
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const toast=useToast()
const navigate=useNavigate()
const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);
const authState2 = useSelector((state)=>state.auth.singleData)
const authState = useSelector((state)=>state.auth.data)

console.log('====================================');
console.log('authState267',authState2);
console.log('====================================');


    const [showPassword, setShowPassword] = useState(false);
    const [name, setFullname] = useState("");
    const [oemail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1)
    const [selectedDate, setSelectedDate] = useState(null);
    const [time, setTime] = useState('')

    const[limit,setLimit]=useState(1)
    const [age, setAge] = useState("");
    const dispatch = useDispatch();
    const [date, setDate] = useState(selectedDate ? formatDate(selectedDate) : '');
   // const [date, setDate] = useState(selectedDate);
   const myDecodedToken = decodeToken(authState.token);
   console.log('myDecodedToken123',myDecodedToken,authState2);
console.log('date', date);

const TotalData = useSelector((state)=>state.slotholiday.TotalData)
console.log('time',time);
console.log('selectedDate ? formatDate(selectedDate) : ',selectedDate ? formatDate(selectedDate) : '');

    const handleOppointment = (e) => {
      e.preventDefault();
          console.log('aaaaaaaaaaaaa',name, age, time,mobileNo,selectedDate );

      if(name==''||age==''|| time==''|| mobileNo=="" ||selectedDate==null){
        toast({
          title: "please fill all the feilds",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });  
      }
        else{
          //ole.log({ name, email, password,age });
          dispatch(addOppointment({ name,age,time,family_id:authState2._id,
            mobileNo,date:selectedDate ? formatDate(selectedDate) : '' }));
          
        }
  //cons
      };


      useEffect(()=>{
        dispatch(getAllSlotholiday(query,limit,page))
        dispatch(getAlldateholiday(query,limit,page))
        dispatch(getSingleUser(myDecodedToken.id))

            },[query,limit,page])
      






        const aggregatedData = {};
  
        // Loop through the slotData array
        TotalData && TotalData.forEach(item => {
          const { date, time } = item;
        
          // Check if the date is already in the aggregatedData object
          if (aggregatedData[date]) {
            // If the date exists, push the slot to the existing array
            aggregatedData[date].push(time);
          } else {
            // If the date doesn't exist, create a new array with the slot
            aggregatedData[date] = [time];
          }
        });
        
        // Convert the aggregatedData object to an array of objects
        const slotData = Object.keys(aggregatedData).map(date => ({
          date,
          time: aggregatedData[date],
        }));

        const bookedSlots = ['10 AM','11 AM','12 PM','01 PM','02 PM','03 PM','04 PM','05 PM','06 PM','07 PM']; // Replace with your booked slots array

        // Function to get slots that are not already booked for the selected date
        const getAvailableSlots = (date) => {
          //console.log('date',date,slotData[0].date===date);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const a= `${year}-${month}-${day}`;
           const slotInfo = slotData.filter(slotData => slotData.date === a);
           console.log('====================================a',slotInfo);
           if(slotInfo.length !== 0){
      //    // console.log('slotInfo',slotInfo.slots);
      //     console.log('====================================');
          // console.log('slotInfo.slots?.filter((slot) => !bookedSlots.includes(slot))',
          // slotInfo && slotInfo[0].time?.filter(slot => !bookedSlots.includes(slot)));
      
          console.log('slotInfo.slots?.filter((slot) => !bookedSlots.includes(slot))',
          slotInfo && slotInfo[0].time?.filter(slot => !bookedSlots.includes(slot)));
          const availableSlots = bookedSlots.filter(slot => !slotInfo[0].time.includes(slot));
      console.log('availableSlots',availableSlots);
         // return slotInfo[0] ? slotInfo[0].time?.filter((slot) => !bookedSlots.includes(slot)) : ['12pm'];
        return   availableSlots
      }
           else{
              return bookedSlots
           }  
      };

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Book Appointment
            </Heading>

          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" onChange={(e) => setFullname(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>your Age</FormLabel>
                    <Input type="number" onChange={(e) => setAge(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>

              {/* <FormControl id="email" isRequired>
                <FormLabel>appointment date</FormLabel>
                <Input type="date"      min={minDate}
             onChange={(e) => setDate(e.target.value)}/>

              </FormControl> */}
              <HStack>
                            <FormControl id="email" isRequired>
                <FormLabel>appointment date</FormLabel>
                
                <DatePicker
                      showIcon

        className="custom-datepicker"
        // placeholderText="Click to select a date"
        minDate={new Date()}
        selected={selectedDate}

        onChange={(date) => setSelectedDate(date)}
        excludeDates={disabledDates}
        filterDate={(date) => {return date.getDay() !== 0 && date.getDay() !== 7;
        }}
      />
     
{/*       
      <Input
        type="text"
        value={selectedDate ? formatDate(selectedDate) : ''}
        readOnly // Prevent editing of the input
      /> */}
              </FormControl>



              <FormControl id="mobile" isRequired>
                <FormLabel>Select a time slot:</FormLabel>
                {selectedDate && (
        <Box>
          <Select onChange={(e)=>setTime(e.target.value)} >
            {getAvailableSlots(selectedDate)?.map((slot) => (
              <option key={slot} value={slot} onChange={(slot)=>setTime(slot)}>
                {slot}
              </option>
            ))}
          </Select>

        </Box>
      )}
              </FormControl>

              </HStack>

              <FormControl id="mobile" isRequired>
                <FormLabel>mobile number</FormLabel>
                <Input type="text"    maxlengt="10"              
                 onChange={(e) => setMobileNo(e.target.value)}/>

              </FormControl>
              {/* <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type='text'                       
                                     onChange={(e) => setPassword(e.target.value)}/>

                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl> */}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleOppointment}

                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Book Oppointment
                </Button>
              </Stack>

            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
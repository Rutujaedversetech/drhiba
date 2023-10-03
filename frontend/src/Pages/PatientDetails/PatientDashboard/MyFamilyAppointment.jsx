import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Updatefamilyinfo, Updatefamilyinfostatus, addfamilymember, deleteFamilymember, getfamilymember } from '../../../Redux/family/action';
import { Flex, IconButton, useColorModeValue ,Text,Stack, Box, Spacer, Heading, ButtonGroup, Button, useToast, Select, Textarea} from '@chakra-ui/react'
import {  useState } from 'react'
//import { Updatejobs, getAlljobpost } from '../../Redux/jobpost/actionTypes'
import { useNavigate ,Link} from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import {
  
  
  

  InputGroup,
  HStack,
  InputRightElement,
  

  
  
  
} from '@chakra-ui/react';

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
  
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { isExpired, decodeToken } from "react-jwt";

import { AiFillPlusCircle } from 'react-icons/ai'
import { getAllSlotholiday } from '../../../Redux/slotholiday/action';
import { getAlldateholiday } from '../../../Redux/dateholiday/action';
import DatePicker from 'react-datepicker';
import { addOppointment, getSingleUser } from '../../../Redux/auth/action';


const MyFamilyAppointment = () => {
  const  data = useSelector((store) => store.family.data);
  const TotalData = useSelector((state)=>state.slotholiday.TotalData)
  const holiday = useSelector((state)=>state.holiday.TotalData)
  const authState = useSelector((state)=>state.auth.data)
  const authState2 = useSelector((state)=>state.auth.singleData)

  const token=localStorage.getItem('token')

  const myDecodedToken = decodeToken(authState.token);
console.log('myDecodedToken123',myDecodedToken,authState2);
  const cancelRef = React.useRef()

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('')
  const [name, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [family_email, setFamily_email] = useState("");
  const [nickname, setNickname] = useState("");


  const handleSubmitfamily = (e) => {
    e.preventDefault();
        console.log('aaaaaaaaaaaaa',name, age, time,mobileNo,date );

    if(name==''||age==''|| nickname==''|| mobileNo=="" ||family_email==''){
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
        dispatch(addfamilymember({ name,age,
          mobileNo,nickname,family_email}));
        onCloseModal2()
      }
//cons
    };
const handleDeletefamily=(id)=>{
dispatch(deleteFamilymember(id))
onCloseModal4()
}

  const disabledDates = holiday&&holiday.map(item => new Date(item.dateH));
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
  const [date, setDate] = useState(selectedDate ? formatDate(selectedDate) : '');
  const toast=useToast()

  const[limit,setLimit]=useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure()
 // const { isOpen1, onOpen1, onClose1 } = useDisclosure()
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure();
  const { isOpen: isOpenModal3, onOpen: onOpenModal3, onClose: onCloseModal3 } = useDisclosure();
  const { isOpen: isOpenModal4, onOpen: onOpenModal4, onClose: onCloseModal4 } = useDisclosure();
  const { isOpen: isOpenModal5, onOpen: onOpenModal5, onClose: onCloseModal5 } = useDisclosure();


  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [product, setProduct] = useState({});
  const [product2, setProduct2] = useState({});
  const [product3, setProduct3] = useState({});


  console.log('====================================');
  console.log('poduct',product);
  console.log('====================================');
  
console.log('data',data);
  const dispatch = useDispatch();

const handleupdateSubmitfamily=()=>{
  console.log('product',product);
  dispatch(Updatefamilyinfo(product._id, product));
  onCloseModal3()
}
  
const handleupdateSubmitfamily2=(id,status,item)=>{
  console.log('product',id,status);
  if(status){
      dispatch(Updatefamilyinfo(product._id, {...item,"status":false}));

  }
  //dispatch(Updatefamilyinfo(product._id, product));
 // onCloseModal3()
}
  

  useEffect(()=>{
    dispatch(getfamilymember())
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







console.log('====================================');
console.log('nickname',nickname);
console.log('====================================');






    const handleChange=({target})=>{
      let val = target.value;

      console.log('val2',val)
      setProduct({ ...product, [target.name]: val });
    }
    const handleSubmit=(item)=>{
//console.log('=ppppppppppppppppp======',selectedDate,selectedDate==null,item);
//console.log('time,date',time,selectedDate ? formatDate(selectedDate) : '' );
console.log('111111111111111111111111111111111',item,product);
      if( time=='' || selectedDate==null){
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
          console.log('====================================111111111111111111111111111111111',item);

          dispatch(addOppointment({ name:product.name,age:product.age,time,family_id:product._id,
            mobileNo:product.mobileNo,date:selectedDate ? formatDate(selectedDate) : '' }));
            dispatch(Updatefamilyinfo(product._id, {...product,status:true}));

          
        }
    }



    const handleSubmit2=(item)=>{
      console.log('====================================');
      console.log('hello',item,product2);
      console.log('====================================');
     // console.log('=ppppppppppppppppp======',selectedDate,selectedDate==null,item);
     // console.log('time,date',time,selectedDate ? formatDate(selectedDate) : '' );
     // console.log('====================================111111111111111111111111111111111',item);
            if( time=='' || selectedDate==null){
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
                console.log('====================================111111111111111111111111111111111',product,item);
      
                dispatch(addOppointment({ name:item.name,age:item.age,time,family_id:product2._id,is_admin:true,
                  mobileNo:item.mobileNo,date:selectedDate ? formatDate(selectedDate) : '' }));
                  //dispatch(Updatefamilyinfo(product._id, {...product,status:true}));
      
                
              }
          }

          console.log('====================================');
          console.log('is_bookedAppo',authState2&&authState2.name);
          console.log('====================================');
    // if(data.length==0){
    //   return <Heading>No Family Members Added</Heading>
    // }
    const currentDate = new Date();

  return (
    <>
    <Stack>

<Flex bg='' alignItems={'right'} justifyContent={'right'}>
<Text textAlign={'right'}><AiFillPlusCircle cursor={'pointer'} color='#42A5F5'
      onClick={onOpenModal2} fontSize={'35px'}/></Text> 
</Flex>
<Flex  alignItems='center' gap='2' border={'1px solid rgba(0,0,0,0.75)'} 
 borderRadius={'10px'} padding={'10px'}     width={['100%','100%','100%','100%','100%']}          >
 
  <Box p='2'>

     <Box backgroundColor={''} padding={'5px'}>  
        <Heading size='md' backgroundColor={''}>{myDecodedToken?myDecodedToken.name:""}</Heading>
 </Box>
   </Box>
  <Spacer />
  <ButtonGroup gap='' backgroundColor={''} >
    

               
                  




            {/* <Button           onClick={() => {
                       onOpenModal3();
                       setProduct(myDecodedToken);
                    }}         
                    bg={'blue.400'} color={'white'} >Edit
            </Button> */}

                    {authState2&&authState2.is_bookedAppo ?<Button bg='green'
                     ///onClick={()=>handleupdateSubmitfamily2(item._id,item.status,item)}
                     >Booked</Button>:
                     <Button  bg={'blue.400'} color={'white'}     
                      onClick={() => {
                       onOpenModal5();
                       setProduct2(authState2);
                    }}
                    >Book</Button>
                     } 
 </ButtonGroup>
</Flex>

<Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          backgroundColor={''}
          isOpen={isOpenModal5}
           size={'xl'}
           width={'40%'}
          onClose={onCloseModal5}
        >
          <ModalOverlay />
          <ModalContent backgroundColor={''}>
            <ModalHeader>Add Appointment</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

            <Flex
      // minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      {/* <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}> */}

        <Box
        width='100%'
          rounded={'lg'}
          //boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>

 <FormControl>
 <FormLabel fontWeight={'bold'}>Appointment Date</FormLabel>
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
                <FormLabel fontWeight={'bold'}>Appointment Time</FormLabel>
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
              </Stack>
</Box>
              </Flex>



              
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={()=>handleSubmit2(myDecodedToken)}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

{data && data.map((item)=>{
  const dateString = item.date;
  const dateParts = dateString && dateString.split('-');
  const year =dateParts && parseInt(dateParts[0]);
  const month =dateParts && parseInt(dateParts[1]) - 1; // Month is zero-based
  const day = dateParts&& parseInt(dateParts[2]);
  const dateToCheck = new Date(year, month, day);
  console.log(      'poiu',              (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString()) 
);
    return(
      <>
<Flex  alignItems='center' gap='2' border={'1px solid rgba(0,0,0,0.75)'} 
 borderRadius={'10px'} padding={'10px'}     width={['100%','100%','100%','100%','100%']}          >
 
  <Box p='2'>

     <Box backgroundColor={''} padding={'5px'}>  
        <Heading size='md' backgroundColor={''}>{item.name}</Heading>
 </Box>
   </Box>
  <Spacer />
  <ButtonGroup gap='' backgroundColor={''} >
    <Button     
       //onClick={onOpenModal4}  
       onClick={() => {
        onOpenModal4();
        setProduct3(item);
     }}                
     bg={'blue.400'} color={'white'} >
      Delete
            </Button>

                     

               
                     <AlertDialog
                       isOpen={isOpenModal4}
                       leastDestructiveRef={cancelRef}
                       onClose={onCloseModal4}
                     >
                       <AlertDialogOverlay>
                         <AlertDialogContent>
                           <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                           Ready to Leave?
                           </AlertDialogHeader>
               
                           <AlertDialogBody>
{item.status ?"This Appointment is already booked do you really want to continue":"Do You really want to delete your family member"}                                                      </AlertDialogBody>
               
                           <AlertDialogFooter>
                             <Button ref={cancelRef} onClick={onCloseModal4}>
                               Cancel
                             </Button>
                             <Button colorScheme='red'      
                               onClick={()=>handleDeletefamily(product3._id)}          
 ml={3}>
                                 Yes                             
                                 </Button>

                           </AlertDialogFooter>
                         </AlertDialogContent>
                       </AlertDialogOverlay>
                     </AlertDialog>







            <Button           onClick={() => {
                       onOpenModal3();
                       setProduct(item);
                    }}         
                    bg={'blue.400'} color={'white'} >Edit
            </Button>

                    {/* {   
                     !(dateToCheck < currentDate && 
                      dateToCheck.toDateString() !== currentDate.toDateString()) ?

                    // &&
                    (item.status ?(<Button bg='green'
                     ///onClick={()=>handleupdateSubmitfamily2(item._id,item.status,item)}
                     >Booked</Button>):("")):<Button  bg={'blue.400'} color={'white'}     
                      onClick={() => {
                       onOpen();
                       setProduct(item);
                    }}
                    >Book</Button>} */}
                    {
                      (dateToCheck < currentDate && 
                        dateToCheck.toDateString() !== currentDate.toDateString()) ?(<Button  bg={'blue.400'} color={'white'}     
                        onClick={() => {
                         onOpen();
                         setProduct(item);
                      }}
                      >Book</Button>)
                        :(item.status ?(<Button bg='green'
                        ///onClick={()=>handleupdateSubmitfamily2(item._id,item.status,item)}
                        >Booked</Button>):(<Button  bg={'blue.400'} color={'white'}     
                         onClick={() => {
                          onOpen();
                          setProduct(item);
                       }}
                       >Book</Button>))
  

                    }
 </ButtonGroup>
</Flex>

<Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          backgroundColor={''}
          isOpen={isOpen}
           size={'xl'}
           width={'40%'}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent backgroundColor={''}>
            <ModalHeader>Add Appointment</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

            <Flex
      // minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      {/* <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}> */}

        <Box
        width='100%'
          rounded={'lg'}
          //boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>

 <FormControl>
 <FormLabel fontWeight={'bold'}>Appointment Date</FormLabel>
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
                <FormLabel fontWeight={'bold'}>Appointment Time</FormLabel>
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
              </Stack>
</Box>
              </Flex>



              
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={()=>handleSubmit(item)}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
</>

)    
    })
}

    
</Stack>
<Modal isOpen={isOpenModal2} onClose={onCloseModal2} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add family member</ModalHeader>
          <ModalBody >
            {/* Add your content for Modal 2 here */}
 <Box
            rounded={'lg'}
            //bg={useColorModeValue('white', 'gray.700')}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel> Name</FormLabel>
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
                <FormLabel>Email</FormLabel>
                
                <Input type="text"  
             onChange={(e) => setFamily_email(e.target.value)}/>

     
{/*       
      <Input
        type="text"
        value={selectedDate ? formatDate(selectedDate) : ''}
        readOnly // Prevent editing of the input
      /> */}
              </FormControl>



              <FormControl id="mobile" isRequired>
                <FormLabel>Add Nickname</FormLabel>
                <Input type="text"  
             onChange={(e) => setNickname(e.target.value)}/>

              </FormControl>

              </HStack>

              <FormControl id="mobile" isRequired>
                <FormLabel>mobile number</FormLabel>
                <Input type="text"    maxlengt="10"              
                 onChange={(e) => setMobileNo(e.target.value)}/>

              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleSubmitfamily}

                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Add Family Member
                </Button>
              </Stack>

            </Stack>
          </Box>          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>






      <Modal isOpen={isOpenModal3} onClose={onCloseModal3} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fill the information</ModalHeader>
          <ModalBody >
            {/* Add your content for Modal 2 here */}
 <Box
            rounded={'lg'}
            //bg={useColorModeValue('white', 'gray.700')}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel> Name</FormLabel>
                    <Input type="text"    
                                     value={product.name}
                                     name="name"
                                     onChange={handleChange}  />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>your Age</FormLabel>
                    <Input type="number" 
                                        value={product.age}

                                        name="age"
                                        onChange={handleChange}                    />
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
                <FormLabel>Email</FormLabel>
                
                <Input type="text"                     value={product.family_email}
 
 name="family_email"
 onChange={handleChange}             />

     
{/*       
      <Input
        type="text"
        value={selectedDate ? formatDate(selectedDate) : ''}
        readOnly // Prevent editing of the input
      /> */}
              </FormControl>



              <FormControl id="mobile" isRequired>
                <FormLabel>Add Nickname</FormLabel>
                <Input
  type="text"
  value={product.nickname}
  //onChange={(e) => setNickname(e.target.value)}
  name="nickname"
  onChange={handleChange}
  readOnly={false}  // Make sure this is not set to true
  disabled={false}  
/>


              </FormControl>

              </HStack>

              <FormControl id="mobile" isRequired>
                <FormLabel>mobile number</FormLabel>
                <Input type="text"    maxlengt="100"         
                               ref={initialRef}

                               onChange={handleChange}
name='mobileNo'
                 //onChange={(e) => setMobileNo(e.target.value)}
                 value={product.mobileNo}

                 />
 
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleupdateSubmitfamily}

                  _hover={{
                    bg: 'blue.500',
                  }}>
                    save
                </Button>
              </Stack>

            </Stack>
          </Box>          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

</>
  )
}

export default MyFamilyAppointment
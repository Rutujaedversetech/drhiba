import React from 'react'
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Center,
  Avatar,
  Box,
  Button,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  PinInputField,
  HStack,
  PinInput,
  VStack,
  useToast,
  useDisclosure,
  
} from '@chakra-ui/react';
import axios from 'axios';

import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import {
  AiFillDelete
} from 'react-icons/ai';
import { ReactElement, useEffect, useState } from 'react';
import { Table, TableCaption, TableContainer, Td, Thead, Tr ,Th,Tbody,Tfoot} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOppointment, updateOppintmentStatus } from '../../../Redux/blogs/action';
import CountdownTimer from '../CountdownTimer';
import { Link, useNavigate } from 'react-router-dom';
import { getautherblog } from '../../../Redux/contact/action';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { deleteslotholidaydata } from '../../../Redux/slotholiday/action';
import { Updatefamilyinfo } from '../../../Redux/family/action';
import { updateUserStatus } from '../../../Redux/auth/action';


const ClinicalSummary = () => {
  const dispatch = useDispatch();
  const details = useSelector((state)=>state.patient.data)
  const token=localStorage.getItem('token')
  const [timerExpired, setTimerExpired] = useState(false);
  const toast=useToast()
  const navigate=useNavigate()
  const [isOpenn, setIsOpenn] = useState(false);
  const { isOpen, onOpen, onClose} = useDisclosure()
  const cancelRef = React.useRef()
  const [product, setProduct] = useState({});

  useEffect(()=>{
    dispatch(getautherblog())
    },[])
    const currentDate = new Date();
  
    const handleOtp=async(mobileNo)=>{
      console.log('mobileno',mobileNo);
      
     // setIsOpen(true);
  
      try {
        const response = await axios.post('http://localhost:8080/blogs/sendotp', {  mobileNo});
        // Handle success (e.g., display a success message)
        console.log(response.data);
        if(response.data=='OTP sent successfully'){
          setIsOpenn(true);
  
          console.log('hello');
        //const otp=  prompt("Please enter your otp", "");
       // console.log('otp',otp);
        }
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.error(error);
        toast({
          title: "something went wrong while sending the otp",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        }); 
      }
    }
    const handleCloseModal = () => {
      setIsOpenn(false);
    };
    const [otp, setOtp] = useState("");
    
    const handlePinChange = (value) => {
      setOtp(value);
    };
    const handleTimeout = () => {
      setTimerExpired(true);
      setIsOpenn(false);
  
      // You can handle what happens when the timer expires (e.g., show a message or allow the user to request a new OTP).
    };
  
  
    const handleSubmit = async(mobileNo,otp2,id) => {
      console.log("Entered PIN:", mobileNo,otp2,typeof otp2);
      // Add your logic to handle the PIN here
      const otp=parseInt(otp2)
      console.log("Entered PIN23:", mobileNo,otp,typeof otp);
  
      handleCloseModal();
  
      try {
        const response = await axios.post('http://localhost:8080/blogs/validate-otp', { mobileNo, otp });
        // Handle success (e.g., display a success message)
        console.log(response.data);
        if(response.data=='OTP validated successfully'){
          setTimeout(()=>{
          
            navigate(`/mypatientdocs/${id}`)
             },1000)
           
           
        }
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.log(error.message);
        toast({
          title: "Please enter valid OTP",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });  
      }
  
    };
    const handleDeleteopp=(open1,id,item,opening)=>{
      //dispatch(deleteOppointment(id))
      console.log('====================================');
      console.log('id',open1,id,item,opening,product);
      console.log('====================================');
      if(opening){
        dispatch(updateOppintmentStatus(product._id, {...product,"is_cancelled":false}));

        dispatch(deleteslotholidaydata(product.slotholiday_id));
        dispatch(Updatefamilyinfo(product._id, {...product,status:false}));
        if(product.is_admin){
          dispatch(updateUserStatus(product.family_id, {"is_bookedAppo":true}));

        }

        onClose()
       //dispatch(Updatefamilyinfostatus(product._id, {...product,"status":false}));
      
         }else{
        dispatch(updateOppintmentStatus(product._id, {...product,"is_cancelled":true}));
        dispatch(deleteslotholidaydata(product.slotholiday_id));
        dispatch(Updatefamilyinfo(product._id, {...product,status:true}));
        if(product.is_admin){
          dispatch(updateUserStatus(product.family_id, {"is_bookedAppo":false}));

        }
        

           onClose()
         //dispatch(Updatefamilyinfostatus(open1, {...item,"status":true}));
       
       
         }
            }
    
  

  return (
    <div>
      <Flex>
        <TableContainer bg='' width={'100%'}>
  <Table variant='simple' width={'100%'}>
    <Thead bg='orange'>
      <Tr>
      <Th>Name</Th>
        <Th>Appointment Date</Th>
        <Th>Appointment Time</Th>

        {/* <Th >Email</Th> */}
        <Th >docs</Th>

        
        <Th>doctor's Status</Th>
         <Th>Confirm/Cancel appointment</Th>
      </Tr>
    </Thead>
    {details.map((item)=>{
      console.log('item,item',item);
      const dateString = item.date;
      const dateParts = dateString && dateString.split('-');
      const year =dateParts && parseInt(dateParts[0]);
      const month =dateParts && parseInt(dateParts[1]) - 1; // Month is zero-based
      const day = dateParts&& parseInt(dateParts[2]);
      const dateToCheck = new Date(year, month, day);
            return(
    <Tbody>
      <Tr>
       <Td>{item.name}</Td>
        <Td>{item.date}</Td>
        <Td>{item.time}</Td>
        
        {/* <Td>{item.oemail}</Td> */}
        <Td>
          {
            (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString())  && !item.visited ?(<Text >Not visited</Text>)
            :
           (!item.visited ? item.status ?(<Text backgroundColor={''}>Not Visited</Text>):
            (<Text backgroundColor={''}>pending</Text>)       
               :(
                // <Link to={`/mypatientdocs/${item._id}`}>
              <Button bg={'gray'}
              onClick={()=>handleOtp(item.mobileNo)}
               >Documents</Button>
              //  </Link> 
            ))
            
          }
                        </Td>

                        <Td  >
          {
          (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString()) 
           && !item.visited ?(<Button backgroundColor={'red'}>Not visited</Button>)
          :
          (!item.visited ? !item.is_cancelled ?
            item.status ?(<Button backgroundColor={'#2a9df4'} 
          >confirmed</Button>):
          //  :appointmentDate < currentDate ?(<Button backgroundColor={'red'}>Not visited</Button>):
          (<Button backgroundColor={'orange'} 
          >pending</Button>):(<Button bg='red'>Cancelled</Button>)
          
          :(<Button bg='green'>Visited</Button>))}
          
          </Td>
          {
            item.is_cancelled ? (<Td ><Button bg='red' 
            >Cancelled</Button>
            

            
            </Td> 
            ):(<Td ><Button bg=''                       onClick={() => {
              onOpen();
              setProduct(item);
           }} >Cancel</Button>
                        <AlertDialog
                       isOpen={isOpen}
                       leastDestructiveRef={cancelRef}
                       onClose={onClose}
                     >
                       <AlertDialogOverlay>
                         <AlertDialogContent>
                           <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                           Ready to Leave?
                           </AlertDialogHeader>
               
                           <AlertDialogBody>
                           Do You Really want to cancel your appointment?    
                                                  </AlertDialogBody>
               
                           <AlertDialogFooter>
                             <Button ref={cancelRef} onClick={onClose}>
No                         
    </Button>
                             <Button colorScheme='red'
                             onClick={()=>handleDeleteopp(item._id,item.slotholiday_id,item,item.is_cancelled)}
                             ml={3}>
                                 Yes                            
                                 </Button>

                           </AlertDialogFooter>
                         </AlertDialogContent>
                       </AlertDialogOverlay>
                     </AlertDialog>
            </Td>)
          }

      </Tr>
      <Modal isOpen={isOpenn} onClose={handleCloseModal} size="sm">
      <ModalOverlay />
      <ModalContent position="" top="0" >
        <ModalHeader textAlign={'center'}>OTP Verification</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
           <VStack spacing={4}>
            {/* <Input
              type="password"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOTPChange}
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>  */}
            <HStack>
            <PinInput size="lg" onComplete={handlePinChange}>
        <PinInputField/>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />

      </PinInput>
</HStack>
<Button onClick={()=>handleSubmit(item.mobileNo,otp,item._id)} colorScheme="blue">Verify & Proceed</Button>
{/* {timerExpired && <Box onClick={()=>handleOtp(item.mobileNo)} cursor={'pointer'}>Time expired. Request a new OTP</Box>} */}
      {!timerExpired && <CountdownTimer initialTime={60} onTimeout={handleTimeout} />}
           </VStack> 
        </ModalBody>
      </ModalContent>
    </Modal>
    </Tbody>
    
    ) })}

  </Table>
</TableContainer>   
        </Flex>
    </div>
  )
}

export default ClinicalSummary
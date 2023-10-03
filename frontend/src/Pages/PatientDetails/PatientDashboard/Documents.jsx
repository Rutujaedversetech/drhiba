import { Box, Button,HStack,VStack, ButtonGroup, Flex, Heading, Spacer, useToast ,PinInputField,PinInput} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getautherblog } from '../../../Redux/contact/action'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

import axios from 'axios';
import CountdownTimer from '../CountdownTimer';

const Documents = () => {
  const dispatch = useDispatch();
  const details = useSelector((state)=>state.patient.data)
  const toast=useToast()
  const navigate=useNavigate()
  const [isOpenn, setIsOpenn] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

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
  useEffect(()=>{
    dispatch(getautherblog())
    },[])

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
    if(details&&details.filter((item)=>!item.is_cancelled && item.visited).length==0){
      return <Heading>No uploaded documents</Heading>
    }
  return (
    <>
    {details&&details.filter((item)=>!item.is_cancelled && item.visited).map((item)=>{
      return(
        <Flex minWidth='max-content' alignItems='center' gap='2'>
  <Box p='2'>
    <Heading size='md'>{item.name}</Heading>
  </Box>
  <Spacer />
  <ButtonGroup gap='2'>
  {/* <Link to={`/mypatientdocs/${item._id}`}> */}

    <Button colorScheme='teal' margin={'10px'}       
            onClick={()=>handleOtp(item.mobileNo)}
>Documents</Button>      
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
             {/* </Link>  */}

  </ButtonGroup>
</Flex>
      )
    })}
    </>
    
    
  )
}

export default Documents
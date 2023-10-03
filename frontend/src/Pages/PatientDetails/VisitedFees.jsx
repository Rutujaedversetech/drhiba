'use client'

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
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleContact, updateContactStatus } from '../../Redux/contact/action'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { getSingleProduct, updateOppintmentStatus } from '../../Redux/blogs/action'
export default function VisitedFees() {
  const [reply, setReply] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [fee, setFees] = useState('');
  const [desc, setDesc] = useState('');


  const contact = useSelector((state)=>state.patient.singleData)
  const visitedfees = useSelector((state)=>state.patient)
  const navigate=useNavigate()

    console.log('visitedfees',visitedfees);
    const {id}=useParams();

    console.log(id);
    const toast=useToast()
     const dispatch = useDispatch();

     const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
    

    useEffect(()=>{
        //dispatch(getSingleContact(id))
        dispatch(getSingleProduct(id))

      },[])

const handleReply=(open1,item,opening)=>{
    console.log('isChecked',isChecked,item);
   if(isChecked){
    console.log('jhvhghgcfcfxccccccccckkkkkkkkkkkkkkkk');
    if(fee){
      dispatch(updateOppintmentStatus(open1, {...item,"visited":true,"Appofees":fee,"AppDesc":desc}));
      navigate('/doctors/dashboard')
    
    }else{
      dispatch(updateOppintmentStatus(open1, {...item,"visited":true,"AppDesc":desc}));
      navigate('/doctors/dashboard')
    
    }
  }
  else{
    if(fee){
      dispatch(updateOppintmentStatus(open1, {...item,"visited":false,"Appofees":fee,"AppDesc":desc}));
      navigate('/doctors/dashboard')
    }else{
      dispatch(updateOppintmentStatus(open1, {...item,"visited":false,"AppDesc":desc}));
      navigate('/doctors/dashboard')
    }
   

  }

//   else if(reply ==""){
//     toast({
//       title: "Please add Reply",
//       status: "info",
//       duration: 2000,
//       isClosable: true,
//       position: "top",
//     }); 
//    }

}

  return (
    <Flex
      minH={'100vh'}
      // align={'center'}
      // justify={'center'}
      spacing='170px'
      bg={useColorModeValue('', 'gray.800')}>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('', 'gray.700')}
          width={'100%'}
          spacing='170px'

          boxShadow={'lg'}
          >
          <Text fontSize={'32px'} >Detail Appointment</Text>
          <Stack spacing={4} bg=''>
          <FormControl id="password" >
              <FormLabel color={'gray'}>Name</FormLabel>
              <Input type="text" value={contact.name} color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'}  isReadOnly/>

            </FormControl>
            <FormControl id="email" >
              <FormLabel color={'gray'}>Email address</FormLabel>
              <Input type="email" value={contact.oemail} color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'} isReadOnly />
            </FormControl>
            <FormControl id="email" >
              <FormLabel color={'gray'}>Mobile Number</FormLabel>
              <Input type="email" value={contact.mobileNo} color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'} isReadOnly />
            </FormControl>
           
            <FormControl id="password" >
              <FormLabel color={'gray'}>Appointment Date</FormLabel>
              <Input type="text" value={contact.date} color={'gray'} 
              border={'1px solid gray'} backgroundColor={'#EAECF4'} isReadOnly/>


            </FormControl>

            <FormControl id="password" >
              <FormLabel color={'gray'}>Appointment Time</FormLabel>
              <Input type="text" value={contact.time} color={'gray'} 
              border={'1px solid gray'} backgroundColor={'#EAECF4'} isReadOnly/>


            </FormControl>

            <FormControl id="password" >
              <FormLabel color={'gray'}>Appointment Fees</FormLabel>
              <Input type="text"  color={'gray'} border={'1px solid gray'} backgroundColor={'#EAECF4'}
               onChange={(e)=>setFees(e.target.value)} />

            </FormControl>
            
            <FormControl id="password" >
              <FormLabel color={'gray'}>Appointment Description</FormLabel>
              <Textarea type="text" border={'1px solid gray'} onChange={(e)=>{setDesc(e.target.value)}} isRequired/>

            </FormControl>

            {/* <FormControl id="password" isRequired>
              <Checkbox defaultChecked>Replied</Checkbox>
            </FormControl> */}


            <HStack spacing={'10px'} pt={2}>
            <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>Visited </Checkbox>

              <Button
                loadingText="Submitting"
                onClick={()=>handleReply(contact._id,contact,contact.status)}                size="md"
                bg={'blue'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
             Add</Button>
            </HStack>
            
          </Stack>
        </Box>
    </Flex>
  )
}
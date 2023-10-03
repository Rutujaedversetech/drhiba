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
    HStack,
    ListItem,
    List,
    Spacer,
    ButtonGroup,
    useDisclosure,
    Input,
    ModalFooter,
  } from '@chakra-ui/react';
  import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  import { AiFillPlusCircle } from 'react-icons/ai'

  import { ReactElement, useEffect, useRef, useState } from 'react';
  import { Table, TableCaption, TableContainer, Td, Thead, Tr ,Th,Tbody,Tfoot} from '@chakra-ui/react';
  import { useDispatch, useSelector } from 'react-redux';
  //import { getautherblog } from '../../Redux/blogs/action';
  import { isExpired, decodeToken } from "react-jwt";
  import { Link, useParams } from 'react-router-dom';
import { getSingleProduct, getautherblog, getperticulaPatientDocs, updatepatientdocs } from '../../../Redux/blogs/action';
import { BsDownload } from "react-icons/bs";
import axios from 'axios';
//import { addPatientDocs } from '../../../Redux/contact/action';
import Upload from '../../PatientDetails/Upload';
import { addPatientDocs } from '../../../Redux/blogs/action';
//import { addPatientDocs } from '../../../Redux/contact/action';

  
  
  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };
  
  export default function SplitWithImage() {
  
    const dispatch = useDispatch();
     // const details = useSelector((state)=>state.patient.data)
      const token=localStorage.getItem('token')
      const  data = useSelector((store) => store.patient.data);
      const  data1 = useSelector((store) => store.patient.singleData);

    console.log('details',data,data1);
    const myDecodedToken = decodeToken(token);
    console.log('myDecodedToken',myDecodedToken)
  
    useEffect(()=>{
    //dispatch(getautherblog())
    dispatch(getperticulaPatientDocs(id))
    dispatch(getSingleProduct(id))
    },[])

    const downloadFile = async (id,name) => {
        try {
console.log('name',name);
          const res = await axios.get(
            `http://localhost:8080/application/download/${id}`,
            { responseType: "blob" }
          );
          const blob = new Blob([res.data], { type: res.data.type });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${name}.pdf`;
          // link.download = res.headers["content-disposition"].split("filename=")[1];
          link.click();
        } catch (error) {
          console.log(error);
        }
      };

      const { id } = useParams();

        //   useEffect(() => {
        //     dispatch(getperticulaPatientDocs(id))
        //     // dispatch(getSingleProduct(id))
        //   }, []);
    const currentDate = new Date();
    const [name, setName] = useState("");
    const fileInputRef = useRef(null);

  const details=data.filter((item)=>item.role=='patient')
  const details2=data.filter((item)=>item.role=='doctor')
  const addItem=(e)=>{
    e.preventDefault();
           console.log('id123',id);
    //         try {
              //  window.location.reload()
  
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", fileInputRef.current.files[0]);
            console.log('formData',formData);
            dispatch(addPatientDocs(formData,id));
          //  window.location.reload()
  
  }
  const addItem2=(id2)=>{
    //e.preventDefault();
           console.log('id123',id2);
    //         try {
              //  window.location.reload()
  
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", fileInputRef.current.files[0]);
            console.log('formData',formData);
            dispatch(updatepatientdocs(formData,id2));
            onCloseModal3()
          //  window.location.reload()
  
  }



  console.log('====================================');
  console.log('details',details2);
  console.log('====================================');
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure();
  const { isOpen: isOpenModal3, onOpen: onOpenModal3, onClose: onCloseModal3 } = useDisclosure();
  const [product, setProduct] = useState({});

    return (
      <Container maxW={'8xl'} py={12} bg='' marginTop={''}>
       

              <Flex bg=''  justifyContent={'space-between'}>
                             <Text
                fontSize={{ base: '16px', lg: '18px' }}
                // color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Patient Documents
              </Text> 
<Text textAlign={''}><AiFillPlusCircle cursor={'pointer'} color='#42A5F5'
      onClick={onOpenModal2} fontSize={'35px'}/></Text> 

<Modal isOpen={isOpenModal2} onClose={onCloseModal2} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal 2</ModalHeader>
          <ModalBody >
            {/* Add your content for Modal 2 here */}
           <Box as={'form'} mt={10}>

            <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>

          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Name of document"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                 onChange={(e) => setName(e.target.value)}

              />
              <Input
              type='file'
                placeholder=""
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                ref={fileInputRef}
              />


            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              onClick={addItem}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Submit
            </Button>
          </Box>
          
        </Stack> 
        </Box> 
        {/* <Upload/>  */}
           </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>




</Flex>
            
              <HStack>
              
              {/* {data1.status ?(<Button backgroundColor={'orange'}>Booked</Button>):
              (<Button backgroundColor={'red'}> pending</Button>)} */}

{/* {!data1.visited ?data1.status ?(<Button backgroundColor={'green'}>confirmed</Button>):
          (<Button backgroundColor={'red'}>pending</Button>)
          
          :(<Button bg='orange'>Visited</Button>)}
 */}




              </HStack>



            
      
        <Stack>
  {details2 && details2.map((item)=>{
    return(
  //     <HStack>
  //                   <Button colorScheme='facebook' leftIcon={<BsDownload />} onClick={() => downloadFile(item._id,item.name)}>
  //   {item.name }
  // </Button>
  //     </HStack>

  <Flex minWidth='max-content' alignItems='center' gap='2'>
  <Box p='2'>
    <Text size='md'>{item.name}</Text>
  </Box>
  <Spacer />
  <ButtonGroup gap='2'>
  {/* <Link to={`/mypatientdocs/${item._id}`}> */}

    <Button colorScheme='facebook' leftIcon={<BsDownload />} onClick={() => downloadFile(item._id,item.name)}>
      Download       </Button> 

  </ButtonGroup>
</Flex>

  )
  })}


{details && details.map((item)=>{
    return(
  //     <HStack>
  //                   <Button colorScheme='facebook' leftIcon={<BsDownload />} onClick={() => downloadFile(item._id,item.name)}>
  //   {item.name }
  // </Button>
  //     </HStack>

  <Flex minWidth='max-content' alignItems='center' gap='2'>
  <Box p='2'>
    <Text size='md'>{item.name}</Text>
  </Box>
  <Spacer />
  <ButtonGroup gap='2'>
  {/* <Link to={`/mypatientdocs/${item._id}`}> */}

 

      <Button colorScheme='facebook'  onClick={() => {
                       onOpenModal3();
                       setProduct(item);
                    }}        >
      reupload       </Button> 


      <Modal isOpen={isOpenModal3} onClose={onCloseModal3} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload documents</ModalHeader>
          <ModalBody >
            {/* Add your content for Modal 2 here */}
           <Box as={'form'} mt={10}>

            <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>

          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Name of document"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                 onChange={(e) => setName(e.target.value)}

              />
              <Input
              type='file'
                placeholder=""
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                ref={fileInputRef}
              />


            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              onClick={()=>addItem2(product._id)}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Submit
            </Button>
          </Box>
          
        </Stack> 
        </Box> 
        {/* <Upload/>  */}
           </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseModal3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>










      <Button colorScheme='facebook' leftIcon={<BsDownload />} onClick={() => downloadFile(item._id,item.name)}>
      Download       </Button>

  </ButtonGroup>
</Flex>

  )
  })}



  


</Stack>
      </Container>
    );
  }
  
  
  
  
  
  
  
  // const dispatch = useDispatch();
  //   const details = useSelector((state)=>state.patient.data)
  // console.log('details',details);
  // useEffect(()=>{
  // dispatch(getautherblog())
  // },[])
  
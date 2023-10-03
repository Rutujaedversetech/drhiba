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
  useToast,
} from '@chakra-ui/react'
import ReactQuill from 'react-quill';

import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

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
  import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import { addaboutetails, deleteaboutdata, getAllAbout } from '../../../Redux/aboutus/action';
const ViewPatient = () => {
    const dispatch = useDispatch();
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const details = useSelector((state)=>state.about.data)
    const token=localStorage.getItem('token')
const toast=useToast()
  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)






  //console.log('date',date);
  
  
  










console.log('desc',desc);
  useEffect(()=>{
  dispatch(getAllAbout())
  },[])

  const handleDeleteopp=(id)=>{
    dispatch(deleteaboutdata(id))

          }

const handleSubmit=()=>{
    //console.log('product',product);
    dispatch(addaboutetails({desc:desc}));
    onClose();

}


const contentFieldChanaged = (data) => {

  setDesc(data)


}
  return (
    <div>
        <Flex spacing={'9'} padding={'10px'} alignItems={'space-between'}>
            <Box>
                <Heading color={'#4E73DF'}>About</Heading>
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


 <Table
        d="inline-block"
               // borderColor="gray.200"
        // borderRadius="md"
        // rounded="20px"
        rounded="md"
        w="100%"
        //m="50px"
        variant="simple"
      >
        <Thead bg='orange'>
          <Tr >
          <Th>About Us</Th>

<Th >Added On</Th>

<Th >Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {details?.map((item)=>{
return (
  <Tr>

<Td  dangerouslySetInnerHTML={{ __html: item.desc}}></Td> 


<Td >{item.addedDate}</Td>


  <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete color='red' fontSize={'22px'}/></Button></Td>  



</Tr>
)
          })}


        </Tbody>

      </Table> 

<Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          bg={'red'}
        >
          <ModalOverlay />
          <ModalContent  width={''}>
            <ModalHeader>Add User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} maxW={'100%'} bg={''}>

             
            <ReactQuill
       placeholder='Add Job Description'
       size='sm'
       height={'300px'}
       boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
       name="jobdescription"
       onChange={(newContent) => contentFieldChanaged(newContent)}
       formats={[
        'header', 'font', 'size', 'color',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align',
      ]}
       modules={{

            toolbar: [
              [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
              //[toolbar: [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]]


              [{size: []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, 
               {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image', 'video'],
              ['left', 'center', 'right', 'justify']              ['clean']
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            }
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],

      }}

      // ref={editor}
                  // value={formData.jobdescription}

                                // onChange={(newContent) => contentFieldChanaged(newContent)}
                            />

             
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
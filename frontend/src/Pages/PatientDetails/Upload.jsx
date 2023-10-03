// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// const Upload = () => {
//     const [items, setItems] = useState([]);
//     const [name, setName] = useState("");

//     const { id } = useParams();
//     const fileInputRef = useRef(null);



//     const getItems = async () => {
//         //setLoading(true);


//         try {
//           const res = await axios.get(`http://localhost:8080/application/getall/${id}`);
//           setItems(res.data);
//           //setLoading(false);
//           console.log(res.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       useEffect(() => {
//         getItems();
//       }, []); 



//       const addItem = async (e) => {
//         e.preventDefault();
//         console.log('id123',id);
//         try {
//           const formData = new FormData();
//           formData.append("name", name);
//           formData.append("file", fileInputRef.current.files[0]);
//           console.log('formData',formData);
//           const res = await axios.post(
//             `http://localhost:8080/application/uploads/${id}`,
//                         formData

//           );
//           console.log(res.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       const downloadFile = async (id,name) => {
//         try {
// console.log('name',name);
//           const res = await axios.get(
//             `http://localhost:8080/application/download/${id}`,
//             { responseType: "blob" }
//           );
//           const blob = new Blob([res.data], { type: res.data.type });
//           const link = document.createElement("a");
//           link.href = window.URL.createObjectURL(blob);
//           link.download = `${name}.pdf`;
//           // link.download = res.headers["content-disposition"].split("filename=")[1];
//           link.click();
//         } catch (error) {
//           console.log(error);
//         }
//       };

//   return (

//     <div>
//                 <input
//           type="text"
//           placeholder="add name"
//           onChange={(e) => setName(e.target.value)}
//         />

//                 <input type="file" ref={fileInputRef} />
//                 <button onClick={addItem}>Add</button>

// <div>
//     {
//         items && items.map((item)=>{
//             return(
//                 <div>
//                     <h1 onClick={() => downloadFile(item._id,item.name)}>{item.name}</h1>
//                 </div>
//             )
//         })
//     }
// </div>
//     </div>
//   )
// }

// export default Upload
















import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  ListItem,
  List,
  HStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
   import axios from 'axios';
import { addPatientDocs, deleteProduct, getSingleProduct, getautherblog, getperticulaPatientDocs, updateOppintmentStatus } from '../../Redux/blogs/action';
import { useDispatch, useSelector } from 'react-redux';
import { BsDownload } from "react-icons/bs";


export default function JoinOurTeam() {
 // import React, { useEffect, useRef, useState } from 'react'
  // import axios from 'axios';
  // import { useParams } from 'react-router-dom';
  // const Upload = () => {
       const [items, setItems] = useState([]);
      const [name, setName] = useState("");
      const  data = useSelector((store) => store.patient.data);
      const  data1 = useSelector((store) => store.patient.singleData);

console.log('data789',data);
     const { id } = useParams();
      const fileInputRef = useRef(null);
      const dispatch = useDispatch();

  const hgetItemstnn = async () => {
    //         //setLoading(true);
    
    
            try {
              const res = await axios.get(`http://localhost:8080/application/getall/${id}`);
              setItems(res.data);
              //setLoading(false);
              console.log(res.data);
            } catch (error) {
              console.log(error);
            }
          };

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


          useEffect(() => {
            dispatch(getperticulaPatientDocs(id))
            dispatch(getSingleProduct(id))
          }, []); 

          const onDelete=(ide)=>{
            dispatch(deleteProduct(ide))
          }

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




          const patient=items[0]
         // console.log(patient);
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
        <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                // color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Patient Details
              </Text>
              <HStack>
              {/* {data1.status ?(<Button backgroundColor={'orange'}>Booked</Button>):
              (<Button backgroundColor={'red'}> pending</Button>)} */}

{!data1.visited ?data1.status ?(<Button backgroundColor={'green'}>confirmed</Button>):
          (<Button backgroundColor={'red'}>pending</Button>)
          
          :(<Button bg='orange'>Visited</Button>)}




          <Link to={`/doctors/contactss/fees/${data1._id}`} >
          <Button backgroundColor={'gray.600'}>Add Fees</Button>

              </Link>
              </HStack>

              <List spacing={2}>


                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Name:
                  </Text>{' '}
                  {data1.name}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Email:
                  </Text>{' '}
                  {data1.oemail}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Oppointment Date:
                  </Text>{' '}
                  {data1.date}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Age:
                  </Text>{' '}
                  {data1.age}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                  Mobile Number
                  </Text>{' '}
                  {data1.mobileNo}
                </ListItem>

                {/* <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet){' '}
                </ListItem> */}
               </List>
<Stack>
  {data && data.map((item)=>{
    return(
      <HStack>
                    <Button colorScheme='facebook' leftIcon={<BsDownload />} onClick={() => downloadFile(item._id,item.name)}>
    {item.name }
  </Button>
  <Button onClick={()=>onDelete(item._id)}>Delete</Button>
      </HStack>

  

  )
  })}


</Stack>
            </Box>
        </Stack>
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
          form
        </Stack>
      </Container>
      {/* <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      /> */}
    </Box>
  );
}

// export const Blur = () => {
//   return (
//     <Icon
//       width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
//       zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
//       height="560px"
//       viewBox="0 0 528 560"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}>
//       <circle cx="71" cy="61" r="111" fill="#F56565" />
//       <circle cx="244" cy="106" r="139" fill="#ED64A6" />
//       <circle cy="291" r="139" fill="#ED64A6" />
//       <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
//       <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
//       <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
//       <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
//     </Icon>
//   );
// };
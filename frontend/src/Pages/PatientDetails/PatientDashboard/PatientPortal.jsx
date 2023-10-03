import React, { ReactNode, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  ListIcon,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {AiOutlinePlusCircle,AiFillMessage,AiOutlineLogout} from 'react-icons/ai';
import {RiFileUserLine} from 'react-icons/ri';
import { Collapse } from '@chakra-ui/transition';
import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs'

import {MdNoteAdd} from 'react-icons/md';
import {AiOutlineSound} from 'react-icons/ai';

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
        AiOutlineUnlock ,AiFillSetting   } from 'react-icons/ai';
    import {
      BiUserPlus

    } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';

import { useDispatch, useSelector } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon,ChevronDownIcon } from '@chakra-ui/icons';
//import { signout } from '../../Redux/hrportal/actionTypes';
import { GiFamilyHouse } from 'react-icons/gi';
import { IoDocumentsOutline } from 'react-icons/io5';
import { RiBillLine } from 'react-icons/ri';
import { signout } from '../../../Redux/auth/action';

const LinkItems= [

  { name: "Dashboard", icon: FiTrendingUp, url: "/patient/timeline" },
  { name: 'Appointment', icon: MdNoteAdd, url: "/patient/personal/appointment" },
  { name: 'Family', icon: GiFamilyHouse, url: "/patient/family" },

  { name: 'Documents', icon: IoDocumentsOutline, url: "/patient/document" },
  { name: "Visits", icon: BiUserPlus, url: "/patient/visit" },




  // { name: "Billing", icon: RiBillLine, url: "/patient/billing" },
  // { name: "User Feedback", icon: AiFillMessage, url: "/doctors/userFeedback" },
  //{ name: "Logout", icon: AiOutlineLogout, url: "" },


];




export default function SidebarWithHeader({
  children,

}) {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const authState = useSelector((state)=>state.auth.data)
  const  data = useSelector((store) => store.auth.data);

  console.log('====================================');
  console.log('authState',authState,data);
  console.log('====================================');
  const token=localStorage.getItem('token')

  const myDecodedToken = decodeToken(authState.token);
console.log('myDecodedToken',myDecodedToken);
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ onClose2, ...rest }) => {
  const [isCollapsed, setIsCollapsed] = useState('');
  const [isCollapsed2, setIsCollapsed2] = useState('');
  const [isCollapsed3, setIsCollapsed3] = useState('');
  const [isCollapsed4, setIsCollapsed4] = useState('');
  const [isCollapsed5, setIsCollapsed5] = useState('');
  const [isCollapsed6, setIsCollapsed6] = useState('');

  const { isOpen, onOpen, onClose} = useDisclosure()
  const cancelRef = React.useRef()
  const dispatch = useDispatch();

  const handleToggleCollapse = () => {
    setIsCollapsed('blue');

  };
  const handleToggleCollapse2 = () => {
    setIsCollapsed2('blue');

  };
  const handleToggleCollapse3 = () => {
    setIsCollapsed3('blue');

  };
  const handleToggleCollapse4 = () => {
    setIsCollapsed4('blue');

  };
  const handleToggleCollapse5 = () => {
    setIsCollapsed5('blue');

  };
  const handleToggleCollapse6 = () => {
    setIsCollapsed6('blue');

  };
  
//   const handlelogout=()=>{
//     dispatch(signout())
//   }
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" color='black' fontFamily="monospace" fontWeight="bold" backgroundColor={''} textAlign={''} padding={''}>
        Patient Portal
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem  color='black' icon={link.icon} >

            <Link to={link.url}  bg='blue.400'
> 
          {/* <Link > */}

            {
            link.name=="Timelinem" ? (
            
<>
<Button

variant="link"
_hover={{ textDecoration: 'none' }} w={{ base: 'full', md: 40 }}
//rightIcon={<ChevronRightIcon />}
p='8px'
justifyContent="space-between"
fontWeight="normal"
onClick={handleToggleCollapse2}
 bg={isCollapsed2}

fontSize="md"
color={''}
>
  Timeline
  {/* {isCollapsed2 ? <ChevronRightIcon /> : <ChevronDownIcon />} */}

</Button>

                      </>
          ) :link.name=="Clinical Summary," ? (
<Button

variant="link"
_hover={{ textDecoration: 'none' }} w={{ base: 'full', md: 40 }}
justifyContent="space-between"
fontWeight="normal"
onClick={handleToggleCollapse3}
 bg={isCollapsed3}
fontSize="md"
color={'black'}
>
Family</Button>          

                   
                    ):link.name=="Familym" ? (        
                          <Menu>
                    <Button

variant="link"
_hover={{ textDecoration: 'none' }} 
w={{ base: 'full', md: 40 }}
//rightIcon={<ChevronRightIcon />}
justifyContent="space-between"
fontWeight="normal"
bg=''
fontSize="md"
onClick={handleToggleCollapse4}
color={'white'}

>
Availability Tab
{isCollapsed4 ? <ChevronRightIcon /> : <ChevronDownIcon />}

</Button>



                      <Collapse in={!isCollapsed4} bg='red' mt='4'>
                                            <Box bg={'white'}  marginTop={'10px'} rounded={'md'} width={'100%'} padding={''}>

<Link to='/doctors/slot'><Text color={'black'} padding={'10px'} >Slot</Text></Link>
<Link to='/doctors/appoinholiday'><Text color={'black'} padding={'10px'} >Date Holiday</Text></Link>

<Link to='/doctors/appoinslot'><Text color={'black'} padding={'10px'} >Slot Holiday</Text></Link>

</Box>
                      </Collapse>       





                              </Menu>)
                    :link.name=="Documentsm" ? ( 
                                 <Menu>
  <Button
variant="link"
_hover={{ textDecoration: 'none' }} 
w={{ base: 'full', md: 40 }}
//rightIcon={<ChevronRightIcon />}
justifyContent="space-between"
fontWeight="normal"
bg=''
onClick={handleToggleCollapse}
fontSize="md"
color={'white'}
>
  Promotion
  {isCollapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}

</Button>
                      <Collapse in={!isCollapsed} bg='red' mt='4'>
                        <Box bg={'white'}  marginTop={'10px'} rounded={'md'} width={'100%'} padding={'20px'}>

                        <Link to='/doctors/promotion'><Text color={'black'} icon={link.icon}>promotion</Text></Link>

                        </Box>
                      </Collapse>


                              </Menu>)
                              :link.name=="Logoutm" ? ( 
                            <> 
                     <Text color={''} onClick={onOpen} >{link.name}</Text>
                     

               
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
                           Select "Logout" below if you are ready to end your current session.                           </AlertDialogBody>
               
                           <AlertDialogFooter>
                             <Button ref={cancelRef} onClick={onClose}>
                               Cancel
                             </Button>
                             <Button colorScheme='red'  ml={3}>
                                 Logout                             
                                 </Button>

                           </AlertDialogFooter>
                         </AlertDialogContent>
                       </AlertDialogOverlay>
                     </AlertDialog>
                   </>
                     
                   
                    )                              :link.name=="Visitsm" ? ( 
<Button

variant="link"
_hover={{ textDecoration: 'none' }} w={{ base: 'full', md: 40 }}
//rightIcon={<ChevronRightIcon />}
p='8px'
justifyContent="space-between"
fontWeight="normal"
onClick={handleToggleCollapse2}
 bg={isCollapsed2}

fontSize="md"
color={''}
>
  Visits
  {/* {isCollapsed2 ? <ChevronRightIcon /> : <ChevronDownIcon />} */}

</Button>
                             
                    
                     )
                    :link.name=="User Feedback" ? ( 
                             
                      <Text color={''}>{link.name}</Text>
                    
                     )

                    :link.name=="Admin Panel" ?(
                       <Menu>
  <Button

variant="link"
_hover={{ textDecoration: 'none' }} 
w={{ base: 'full', md: 40 }}
//rightIcon={<ChevronRightIcon />}
justifyContent="space-between"
fontWeight="normal"
onClick={handleToggleCollapse3}

bg=''
fontSize="md"

color={'white'}
>
Admin Panel
{isCollapsed3 ? <ChevronRightIcon /> : <ChevronDownIcon />}

</Button>



                                            <Collapse in={!isCollapsed3} bg='' mt='4'>
                                            <Box bg={'white'}  marginTop={'10px'} rounded={'md'} width={'100%'} padding={''}>

<Link to='/patientDetails'><Text color={'black'} padding={'10px'} >Appointment</Text></Link>
<Link to='/doctors/viewpatient'><Text color={'black'} padding={'10px'} >User</Text></Link>


</Box>
                      </Collapse>       
                              </Menu>
                              ):
                              (   <Text color={''}>{link.name}</Text>
         
                                //           <Menu>
                                // <MenuButton as={''} rightIcon={''}>
                                // <Text color={''}>{link.name}</Text>
                              
                                // </MenuButton>
                                // <MenuList>
                                //   <MenuItem color={'black'}>nbn</MenuItem>
                                //   <MenuItem color={'black'}>Creat</MenuItem>
                                //   <MenuItem color={'black'}>Mark</MenuItem>
                                //   <MenuItem color={'black'}>De</MenuItem>
                                //   <MenuItem color={'black'}>Atte</MenuItem>
                                // </MenuList>
                                       
                                //         </Menu>
                                        )
          }

            </Link>

        </NavItem>
      ))
    }
       
    </Box>
  );
};


const NavItem = ({ icon, children, ...rest }) => {
  
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        // align="center"
        p="4"
        bg=''
        mx=""
        borderRadius="lg"
        cursor="pointer"
        _hover={{
          color: 'black',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            bg={''}
            marginTop={'5px'}
            fontSize="16"
            _groupHover={{
              color: 'black',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  const authState = useSelector((state)=>state.auth.data)
  const token=localStorage.getItem('token')

  const myDecodedToken = decodeToken(authState.token);
console.log('myDecodedToken',myDecodedToken,authState);
const dispatch = useDispatch();
const navigate=useNavigate()

const handleSignOut=()=>{
  dispatch(signout())
  navigate('/login')
}
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Patient Portal
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<AiFillSetting />}
        />
         <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<AiOutlineUnlock />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  {/* <Text fontSize="sm">{myDecodedToken.email}</Text> */}
                  <Text fontSize="xs" color="gray.600">{myDecodedToken ?myDecodedToken.name:""}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>

              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Link to='/patientProfile'>
                Profile

                </Link>
              {/* <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
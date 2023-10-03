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
      IoIosNotifications
    } from 'react-icons/io';
    import {
      FaUserCircle
    } from 'react-icons/fa';
    import {
      BiUserPlus
    } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { signout } from '../../Redux/auth/action';
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon,ChevronDownIcon } from '@chakra-ui/icons';
//import { signout } from '../../Redux/hrportal/actionTypes';

const LinkItems= [

  { name: "Dashboard", icon: FiTrendingUp, url: "/doctors/dashboard" },
  { name: 'Home', icon: FiHome, url: "" },
  { name: 'Availability Tab', icon: MdNoteAdd, url: "" },
  { name: "Admin Panel", icon: BiUserPlus, url: "" },

  { name: 'Promotion', icon: AiOutlineSound, url: "" },




  { name: "Contact us", icon: RiFileUserLine, url: "/doctor/contacts" },
  // { name: "User Feedback", icon: AiFillMessage, url: "/doctors/userFeedback" },
  { name: "Logout", icon: AiOutlineLogout, url: "" },


];

const handleSignOut=()=>{
  
}

export default function SidebarWithHeader({
  children,

}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authState = useSelector((state)=>state.auth.data)
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
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isCollapsed3, setIsCollapsed3] = useState(true);
  const [isCollapsed4, setIsCollapsed4] = useState(true);
  const { isOpen, onOpen, onClose} = useDisclosure()
  const cancelRef = React.useRef()
  const dispatch = useDispatch();

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);

  };
  const handleToggleCollapse2 = () => {
    setIsCollapsed2(!isCollapsed2);

  };
  const handleToggleCollapse3 = () => {
    setIsCollapsed3(!isCollapsed3);

  };
  const handleToggleCollapse4 = () => {
    setIsCollapsed4(!isCollapsed4);

  };
  const handlelogout=()=>{
    dispatch(signout())
  }
  return (
    <Box
      transition="3s ease"
     // bg=''
      height='auto'
    bg={useColorModeValue('#4E73DF', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      {...rest}>
      <Flex h="20"       bg=''
 alignItems="center"  mx="8" justifyContent="space-between">
        <Text fontSize="2xl" color='white' fontFamily="monospace" fontWeight="bold" backgroundColor={''} textAlign={''} padding={''}>
        Doctor Portal
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem  color='white'       bg='gre'
        icon={link.icon}>

            <Link to={link.url} > 
          {/* <Link > */}

            {
            link.name=="Home" ? (
            
<>
<Button

variant="link"
_hover={{ textDecoration: 'none' }} w={{ base: 'full', md: 40 }}
//rightIcon={<ChevronRightIcon />}

justifyContent="space-between"
fontWeight="normal"
onClick={handleToggleCollapse2}
bg=''
fontSize="md"
color={'white'}
>
  Home
  {isCollapsed2 ? <ChevronRightIcon /> : <ChevronDownIcon />}

</Button>
<Collapse in={!isCollapsed2} bg='red' mt='4'>
                        <Box bg={'white'}  marginTop={'10px'} rounded={'md'} width={'100%'} padding={''}>

                        <Link to='/doctors/caraousel'><Text color={'black'} padding={'10px'} >SlideShow</Text></Link>
                        <Link to='/doctors/beforeafter'><Text color={'black'} padding={'10px'} >Before-After</Text></Link>
                        <Link to='/doctors/service'><Text color={'black'} padding={'10px'} >Service</Text></Link>
                        <Link to='/doctors/serviceDetails'><Text color={'black'} padding={'10px'} >Service Details</Text></Link>
                        <Link to='/doctors/cardinfo'><Text color={'black'} padding={'10px'} >Card Information</Text></Link>
                        <Link to='/doctors/about'><Text color={'black'} padding={'10px'} >About</Text></Link>
                        <Link to='/doctors/appvideo'><Text color={'black'} padding={'10px'} >App Video</Text></Link>

                        </Box>
                      </Collapse>
                      </>
          ) :link.name=="Dashboard" ? (
<Button

variant="link"
_hover={{ textDecoration: 'none' }} w={{ base: 'full', md: 40 }}
justifyContent="space-between"
fontWeight="normal"
bg=''
fontSize="md"
color={'white'}
>
Dashboard
</Button>          

                   
                    ):link.name=="Availability Tab" ? (        
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
                    :link.name=="Promotion" ? ( 
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
                              :link.name=="Logout" ? ( 
                            <> 
                     <Button color={''} onClick={onOpen} >{link.name}</Button>
                     

               
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
                             <Button colorScheme='red' onClick={handlelogout} ml={3}>
                                 Logout                             
                                 </Button>

                           </AlertDialogFooter>
                         </AlertDialogContent>
                       </AlertDialogOverlay>
                     </AlertDialog>
                   </>
                     
                   
                    )                              :link.name=="Contact us" ? ( 
                      <Text color={''}>{link.name}</Text>
                             
                    
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
                              ):(             
                                          <Menu>
                                <MenuButton as={''} rightIcon={''}>
                                <Text color={''}>{link.name}</Text>
                              
                                </MenuButton>
                                <MenuList>
                                  <MenuItem color={'black'}>nbn</MenuItem>
                                  <MenuItem color={'black'}>Creat</MenuItem>
                                  <MenuItem color={'black'}>Mark</MenuItem>
                                  <MenuItem color={'black'}>De</MenuItem>
                                  <MenuItem color={'black'}>Atte</MenuItem>
                                </MenuList>
                                       
                                        </Menu>)
          }

            </Link>

        </NavItem>
      ))
    }
       {/* <Flex direction={'column'} justifyContent={'space-evenly'} gap={'10px'} marginTop={''}>
            
                        <Box backgroundColor={''}>
                          <Link to='/'></Link>
                         <FaUserCircle 
                       style={{color: 'black', border:'1px', fontSize: '45px',margin:'auto'}}/>
                       <Text>j</Text>
                       </Box>
            
                 <Box backgroundColor={''} alignItems={'center'}>
                   <Link to='/dashboard/hrportal'>     
                      <BsFillPlusCircleFill  style={{color: 'orange', border:'1px', fontSize: '45px',margin:'auto'}}/>
           </Link>
                 </Box>
                 <Box>
                   <IoIosNotifications style={{color: 'orange', border:'1px', fontSize: '50px',margin:'auto'}}/>
            
            
                  </Box>
                </Flex>  */}
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
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            bg={''}
            marginTop={'5px'}
            fontSize="16"
            _groupHover={{
              color: 'white',
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
        Doctor Portal
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
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
                  src={'C:\Users\rutuj\OneDrive\Pictures\login images3.png'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  {/* <Text fontSize="sm">{myDecodedToken.email}</Text> */}
                  <Text fontSize="xs" color="gray.600">
                    DOCTOR
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
              <MenuItem>Profile</MenuItem>
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
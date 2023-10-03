import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  
  Popover,
  Image,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  MenuButton,
  MenuItem,
  Menu,
  MenuList,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import logo from '../../assets/DRlogo.png'
import './Navbar.css'
//import Video from '../Pages/Video';
import { useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../Redux/auth/action';

const token=localStorage.getItem('token')


export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [hasScrolled, setHasScrolled] = useState(false);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 10) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };
  
  const navbarClassName =hasScrolled ? 'header' : 'header2';










  return (
    <Box className={navbarClassName} backgroundColor={''}>
      <Flex
       bg={useColorModeValue('', 'gray.800')}
      // background={'none'}
        // minH={'50px'}
opacity={'78'}
// position={'fixed'}
// width={'100%'}

        py={{ base: 2 }}
        px={{ base: 4 }}
        justifyContent={'space-between'}
         align={'center'}>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          flex={{  md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}

          >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
         <Box backgroundColor={''} border={''} width={''}> 
<Link to='/'>
    <Avatar src={logo}  size={['lg','lg','lg','lg','xl']}/>
</Link>

       </Box> 
        <Flex display={{ base: 'none', md: 'flex' }} 
          bg={useColorModeValue('', 'gray.800')}
          justifyContent={'space-between'}
          // width={'30%'}
          ml={''}
          >
            <DesktopNav />
          </Flex>


      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('black', 'gray.200');
  const linkHoverColor = useColorModeValue('black', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const  data = useSelector((store) => store.auth.data);
  const myDecodedToken = decodeToken(data.token);
  console.log('myDecodedToken',myDecodedToken)
  console.log('hjk',data);
const dispatch=useDispatch()
const handlelogout=()=>{
  dispatch(signout())
}

  return (
    <Stack direction={'row'} spacing={10}  backgroundColor={''}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}
        >
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              {/* <Link
                p={2}
                 to={navItem.href ?? '#'}
              //   fontSize={'sm'}
              // fontSize={['sm', 'sm', 'sm', 'sm']}

                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'black',
                   color: linkHoverColor,
                  borderBottom:' 3px solid black'
                }}> */}

                 {data.isAuthenticated && navItem.label=="Login" ? 
                 (
                  
                  <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={''}
                    />
                   </MenuButton> 
                  <MenuList>
                  {myDecodedToken.role =='doctor'?(<Link to='/patientDetails'><MenuItem>Profile</MenuItem></Link>
):(<Link to='/patientProfile'><MenuItem>Profilepp</MenuItem></Link>
)} 
                    <MenuItem onClick={handlelogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
            )
            :(<Link           
                     to={navItem.href ?? '#'}
            ><Text as='b' fontSize={'18px'}>{navItem.label}</Text></Link>)}



                 
                 
              {/* </Link> */}
              
            </PopoverTrigger>
            

            {/* {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )} */}
          </Popover>
        </Box>
      ))}
      <Link to='/oppointment'>
  <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            marginTop={'-4px'}
            padding={'10px'}
            fontWeight={600}
            color={'white'}
            bg={'#232E58'}
            href={'#'}
            _hover={{
              bg: 'blue.300',
            }}>
 
  APPOINTMENT         
   </Button>
   </Link>
       </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const  data = useSelector((store) => store.auth.data);
  console.log('datrNav',data.isAuthenticated);
  const dispatch=useDispatch()
  const handlelogout=()=>{
    dispatch(signout())
  }
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
              <Link key={label} py={2} to={href} >
              <Text color='black' _hover={{
                  textDecoration: 'black',
                   color: 'black',
                  borderBottom:' 3px solid black'
                }} >{data.isAuthenticated && label=="Login" ?                 (<Button      
                  as={'a'}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'sm'}
      onClick={handlelogout}
      marginTop={'-4px'}
      padding={'10px'}
      fontWeight={600}
      color={'white'}
      bg={'#232E58'}
      href={'#'}
      _hover={{
        bg: 'blue.300',
      }}>Logout</Button>):(<Text>{label}</Text>)}</Text>
              </Link>
              
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} to={child.href} >
              <Text color=''>{child.label}</Text>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

//   interface NavItem {
//     label: string;
//     subLabel?: string;
//     children?: Array<NavItem>;
//     href?: string;
//   }

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',

  },
  {
    label: 'About',
    href: '/about',

  },
 {
    label: 'Specialization',
    href: '/specialization',
  },  
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Login',
    href: '/login',
  },
  // {
  //   label: 'Products',
  //   href: '/products',
  // },
  // {
  //     label: 'Support',
  //     href: '/support',
  //   },
];
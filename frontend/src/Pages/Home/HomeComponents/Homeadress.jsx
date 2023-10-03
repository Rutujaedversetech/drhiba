import { ReactElement, useEffect } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Heading } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';
import { AiFillPhone } from 'react-icons/ai';
import { BsStopwatchFill } from 'react-icons/bs';
import { MdDashboardCustomize } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Feature = ({ title, text, icon }) => {
  return (
    <Stack bg='' width={'80%'} margin={'auto'} data-aos="zoom-out-down">

      <Flex

        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        // bg={'red.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600} fontSize={'22px'} textAlign={'center'}>{title}</Text>
      <Text color={'gray.600'} textAlign={'center'} fontSize={'20px'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  useEffect(() => {
    AOS.init({
      duration: 800,  // Duration of animation
      easing: 'ease-out',  // Easing function for animation
      once: false,  // Only animate elements once while scrolling
    });
  }, []);
  return (
    <Box p={4}>
        <Box padding={'80px'}>     
               <Heading textAlign={'center'} data-aos="fade-down-left">Visit our dental office near Omaha
</Heading>
</Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} bg='' border={'1px solid black'}
       padding={'50px'} width={'80%'} margin={'auto'}> 
        <Feature
          icon={<Icon as={MdDashboardCustomize} w={10} h={10} color='#232E58' />}
          title={'Address'}
          text={'Dr. Hiba Saadeh Dental Clinic عيادة الدكتورة هبة سعادة‭'}
        />
        <Feature
          icon={<Icon as={AiFillPhone} w={10} h={10} color='#232E58'/>}
          title={'Phone'}
          text={
            '+962 795258121'          }
        />
        <Feature
          icon={<Icon as={BsStopwatchFill} w={10} h={10} color='#232E58' />}
          title={'Hours'}
          text={
            'Mon-Wed 10:00 am - 7:00 pm      Thursday 10:00 am  -  4:00 pm       Sat  - Sun 10:00 am - 7:00 pm'}
        />
      </SimpleGrid>
    </Box>
  );
}
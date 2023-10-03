import {
    Box,
    chakra,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  import AOS from 'aos';
  import 'aos/dist/aos.css';
import { useEffect } from 'react';
  
  function StatsCard(props) {
    useEffect(() => {
      AOS.init({
        duration: 800,  // Duration of animation
        easing: 'ease-out',  // Easing function for animation
        once: false,  // Only animate elements once while scrolling
      });
    }, []);
    const { title, stat } = props;
    return (
      <Stat
        px={{ base: 4, md: 8 }}
        py={'5'}
        data-aos="zoom-out"
        shadow={'xl'}
        padding={'40px'}
        width={'90%'}
        margin={'auto'}
        bg=''
        border={'1px solid #232E58'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={''}>
        <Text fontWeight={'600'} fontSize={'2xl'}textAlign={'center'} >
          {title}
        </Text>
        <Text fontSize={'19px'}  textAlign={'center'}>
          {stat}
        </Text>
      </Stat>
    );
  }
  
  export default function BasicStatistics() {
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'You-First Approach'} stat={'We don’t push treatments. By educating and explaining, we empower our patients to make the right decision for them.'} />
          <StatsCard title={'Affordable Care'} stat={'We believe everyone deserves high-quality care and offer a number of payment options to make that a reality.'} />
          <StatsCard title={'Comfortable Experience'} stat={'Feeling nervous? Ask about nitrous oxide and in-office conscious sedation. Kick back while we take care of the rest'} />
        </SimpleGrid>
      </Box>
    );
  }
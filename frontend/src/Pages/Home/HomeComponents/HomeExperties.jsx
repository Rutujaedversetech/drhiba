import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
  } from '@chakra-ui/react';
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  import AOS from 'aos';
import 'aos/dist/aos.css';
  import { ReactElement, useEffect } from 'react';
  
  
  
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
    useEffect(() => {
      AOS.init({
        duration: 800,  // Duration of animation
        easing: 'ease-out',  // Easing function for animation
        once: true,  // Only animate elements once while scrolling
      });
    }, []);

    return (
      <Container maxW={'5xl'} py={12} bg='' 
      data-aos="zoom-in" 
  data-aos-easing="linear"
 data-aos-duration="500"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>

            <Heading>General Dentistry</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
            We Offer The Best Quality Dental Services.

            Experience the best of dentistry.
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
              <Feature
                icon={
                  <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Dental Bridges ($200)'}
              />
              <Feature
                icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'Teeth Whitening ($40)'}
              />
              <Feature
                icon={
                  <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Root Canal Treatment ($100)'}
              />
                            <Feature
                icon={
                  <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Cosmetic Dentistry ($200)'}
              />              <Feature
              icon={
                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Dental implants ($90)'}
            />
            </Stack>
          </Stack>
          <Flex>
            <Image
            //   rounded={'md'}
              alt={'feature image'}
              
              src={'https://pearldentistrynebraska.com/wp-content/uploads/2023/01/patient-visit-pearl-dentistry.jpg'
              }
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    );
  }
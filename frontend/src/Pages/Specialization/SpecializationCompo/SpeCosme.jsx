import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
  
  export default function SplitScreen() {
    useEffect(() => {
      AOS.init({
        duration: 800,  // Duration of animation
        easing: 'ease-out',  // Easing function for animation
        once: false,  // Only animate elements once while scrolling
      });
    }, []);
    return (
      <Stack minH={'60vh'} direction={{ base: 'column', md: 'row' }} bg={''} padding={'10px'}>

        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            data-aos="zoom-out-down"
            objectFit={'cover'}
            src={'https://plus.unsplash.com/premium_photo-1682097288491-7e926a30cd0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            }
          />
        </Flex>
        <Flex p={8} flex={1} align={''} justify={''} bg={'black'} >
          <Stack spacing={''} w={''} maxW={''}>
            <Text fontSize={{ base: '3xl', md: '4xl', lg: '4xl' }} color={'white'} fontWeight={600}>
             
              
                Design Projects
            </Text>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'white'}>
            A smile is a form of communication that speaks all languages. It says,
             “hello” and is a projection of confidence. The smile is often undervalued or overlooked when 
             individuals are looking to make a change to improve their appearance and quality of life.
              Modern dental technology has made it easier than ever to enjoy the benefits of an improved 
              smile and comfortably undergo treatment.</Text>
              <br/>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'white'}>

Now is a perfect time to get started on your smile makeover. You’ll experience:

E
Improved self-esteem and self-image
E
Confidence to smile and laugh without hesitation or fear of judgment
E
An attractive smile that looks natural and not fake
E
Improved personal and professional relationships
E
The ability to say “hello” with a radiant and healthy smile



            </Text>

          </Stack>
        </Flex>
      </Stack>
    );
  }
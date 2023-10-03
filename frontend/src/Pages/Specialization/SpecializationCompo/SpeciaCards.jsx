import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react';
import AOS from 'aos';
import 'aos/dist/aos.css';


// const BlogTags = (props) => {
//   return (
//     <HStack spacing={2} marginTop={props.marginTop}>
//       {props.tags.map((tag) => {
//         return (
//           <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
//             {tag}
//           </Tag>
//         );
//       })}
//     </HStack>
//   );
// };



export const BlogAuthor = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 800,  // Duration of animation
      easing: 'ease-out',  // Easing function for animation
      once: false,  // Only animate elements once while scrolling
    });
  }, []);
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center"  bg={'red'}  data-aos="zoom-out-down"    >
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const data=[
    {
        'title':"Teeth Whitening",
        "img":"https://images.unsplash.com/photo-1609207825181-52d3214556dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q09TTUVUSUMlMjBERU5USVNUfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",

        "content":"Teeth whitening, also known as dental bleaching, is a cosmetic dental procedure that aims to lighten the color of your teeth and remove stains or discoloration. There are several methods available for teeth whitening, ranging from professional treatments performed by dentists to over-the-counter products that you can use at home. Here are some common options:"
    },
    {
        'title':"Dental Bridges",
        "img":"https://plus.unsplash.com/premium_photo-1661436659702-c7daff5466c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fENPU01FVElDJTIwREVOVElTVHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

        "content":"Dental bridges are a type of dental restoration used to replace one or more missing teeth. They are called bridges because they the gap created by the missing teeth, using the neighboring teeth for support. Here's how dental bridges work:"
    }, {
        'title':"Dental Implants",
        "img":"https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q09TTUVUSUMlMjBERU5USVNUfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",

        "content":"Dental implants are a popular and effective tooth replacement option for individuals who have lost one or more teeth. Unlike dental bridges that rely on adjacent teeth for support, dental implants are standalone tooth replacements that mimic the look, feel, and function of natural teeth. Here's an overview of dental implants:"
    },
    // {
    //     'title':"khbhjb jhbj",
    //     "img":"https://images.unsplash.com/photo-1684607632941-2ca3b6234fb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fENPU01FVElDJTIwREVOVElTVHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

    //     "content":"Veneers are  your teeth and can transform your teeth in nearly any way you can imagine. From shape to size to color, dental veneers give you the power to recreate your ideal smile. We utilize advanced smile preview software and work with you to design your ideal smile."
    // }, {
    //     'title':"khbhjb jhbj",
    //     "img":"https://images.unsplash.com/photo-1626736903650-2289a3b32ed8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q09TTUVUSUMlMjBERU5USVNUfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",

    //     "content":"Veneers are  your teeth and can transform your teeth in nearly any way you can imagine. From shape to size to color, dental veneers give you the power to recreate your ideal smile. We utilize advanced smile preview software and work with you to design your ideal smile."
    // }, {
    //     'title':"khbhjb jhbj",
    //     "img":"https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q09TTUVUSUMlMjBERU5USVNUfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",

    //     "content":"Veneers are  your teeth and can transform your teeth in nearly any way you can imagine. From shape to size to color, dental veneers give you the power to recreate your ideal smile. We utilize advanced smile preview software and work with you to design your ideal smile."
    // },
]

const ArticleList = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,  // Duration of animation
      easing: 'ease-out',  // Easing function for animation
      once: false,  // Only animate elements once while scrolling
    });
  }, []);
  return (
    <Container maxW={'7xl'} p="12" bg=''  data-aos="fade-down" >

<Text fontSize="2xl" marginTop="2" fontWeight={500}>
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            OUR COSMETIC DENTISTRY TREATMENT OPTIONS

          </Link>
          </Text>
          
          <Text as="p" fontSize="md" marginTop="2">
          At Skyline Dental, we offer a variety of different procedures that can help give you a 
          beautiful smile. Dr. James Raymond performs a variety of procedures including veneers,
           composite bonding, teeth whitening,
           and gum line revision to improve your appearance and boost your self-esteem          </Text>
      <Wrap spacingX="40px"  spacingY="50px" marginTop="5" bg=''>
{data.map((item)=>{
    return(
        <WrapItem marginTop={'50px'} width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }} data-aos="zoom-out-down"  padding='20px'bg='' border={'2px solid black'}>
        <Box w="100%">
          <Box borderRadius="" overflow="hidden">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                transform="scale(1.0)"
                src={item.img}
                alt="some text"
                objectFit="contain"
                width="100%"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: 'scale(1.05)',
                }}
              />
            </Link>
          </Box>
          {/* <BlogTags tags={['Engineering', 'Product']} marginTop="3" /> */}
          <Heading fontSize="xl" marginTop="2">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
{item.title}            </Link>
          </Heading>
          <Text as="p" fontSize="md" marginTop="2">
          {item.content}    
          </Text>

        </Box>
      </WrapItem>)
})}

        
      </Wrap>

    </Container>
  );
};

export default ArticleList;
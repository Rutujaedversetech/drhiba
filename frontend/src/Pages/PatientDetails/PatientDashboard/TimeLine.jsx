'use client'

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { BsDot } from 'react-icons/bs'

const options = [
  { id: 1, desc: 'Appointment schedule with Dr hiiba at 12 pm' },
  { id: 2, desc: 'Lorem, ipsum dolor.' },
  { id: 3, desc: 'Monthly Updates' },
]

const PackageTier = ({ title, options, typePlan, checked = false }) => {
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'

  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'

  return (
    <Stack
      //p={3}
      //py={3}
      // justifyContent={{
      //   base: 'flex-start',
      //   md: 'space-around',
      // }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      //alignItems={{ md: 'center' }}
      >
                    {/* <Icon as={FaCheckCircle} color="green.500" /> */}
      <Heading size={'sm'} bg='' width={'10%'}>{title}</Heading>
      <List spacing={3} textAlign="start" bg=''>
      {/* <FaCheckCircle/> */}

      <Flex gap='10px'>
       <FaRegCalendarAlt color='pink' fontSize={'26px'}/>
       
      <Text fontSize={'20px'}>Appointment</Text>
          </Flex>

        {options.map((desc, id) => (

<Flex gap='10px'>
{/* <ListIcon as={BsDot} color="green.500" /> */}
<BsDot  fontSize={'26px'}/>

<Text as={''} fontSize={''}>{desc.desc}</Text>

          </Flex>
        ))}
      </List>
      <Heading size={'xl'}>{typePlan}</Heading>
      {/* <Stack>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}>
          Get Started
        </Button>
      </Stack> */}
    </Stack>
  )
}
const ThreeTierPricingHorizontal = () => {
  return (
    <Box py={6} px={5} width="full" bg=''>
      <Stack spacing={4} width={'100%'}  direction={'column'}>
       
        <PackageTier title={'March 28 2019'} typePlan="" options={options} />
        <Divider />
        <PackageTier
          title={'March 28 2019'}
          checked={true}
          typePlan=""
          options={options}
        />
        <Divider />
        <PackageTier title={'March 28 2019'} typePlan="" options={options} />
      </Stack>
    </Box>
  )
}

export default ThreeTierPricingHorizontal
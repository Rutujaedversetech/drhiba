'use client'

import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'


function StatsCard(props) {
  const { title, stat } = props
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      borderBottom={'5px solid blue '}
      boxShadow= 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset'

      //borderColor={useColorModeValue('gray.50', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  )
}

export default function BasicStatistics() {
  return (
    <Box width={'100%'} mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} bg='' >

      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Today'} stat={'0'} />
        <StatsCard title={'Week'} stat={'3'} />
        <StatsCard title={'Month'} stat={'1'} />
        <StatsCard title={'Year'} stat={'10'} />

      </SimpleGrid>
    </Box>
  )
}
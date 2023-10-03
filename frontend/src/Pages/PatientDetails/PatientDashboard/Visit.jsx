import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getautherblog } from '../../../Redux/blogs/action'
import TodayAppointment from '../Dashboard/TodayAppointment'
import { Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

const Visit = () => {
  const details = useSelector((state)=>state.patient.data)
  const dispatch = useDispatch();
  const [data, setData] = useState(details.filter(item => item.visited));
  console.log('====================================');
  console.log(details,details.filter(item => item.visited));
  console.log('====================================');
  const currentDate = new Date();

  useEffect(()=>{
    dispatch(getautherblog())
    },[])
   const data1= details.filter(item => item.visited)
    if(data1.length==0){
      return <Heading>No Visited Appointment</Heading>
    }
  return (
    <div>
   <Flex>
        <TableContainer bg='' width={'100%'}>
  <Table variant='simple'>
    <Thead bg='orange'>
      <Tr>
      <Th>Name</Th>
        <Th>Appointment Date</Th>
        <Th>Appointment Time</Th>

        {/* <Th >Email</Th> */}
        {/* <Th >docs</Th> */}

        
        <Th>Status</Th>
        {/* <Th>Delete</Th> */}



      </Tr>
    </Thead>
    {details && details.filter(item => item.visited).map((item)=>{
      const dateString = item.date;
      const dateParts = dateString && dateString.split('-');
      const year =dateParts && parseInt(dateParts[0]);
      const month =dateParts && parseInt(dateParts[1]) - 1; // Month is zero-based
      const day = dateParts&& parseInt(dateParts[2]);
      const dateToCheck = new Date(year, month, day);
            return(
    <Tbody>
      <Tr>
       <Td>{item.name}</Td>
        <Td>{item.date}</Td>
        <Td>{item.time}</Td>
        
        {/* <Td>{item.oemail}</Td> */}
      
<Td  >
          {
          (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString())  && !item.visited ?(<Button backgroundColor={'red'}>Not visited</Button>)
          :
          (!item.visited ?item.status ?(<Button backgroundColor={'#2a9df4'} >confirmed</Button>):
          //  :appointmentDate < currentDate ?(<Button backgroundColor={'red'}>Not visited</Button>):
          (<Button backgroundColor={'orange'} >pending</Button>)
          
          :(<Button bg='green'>Visited</Button>))}
          
          </Td>
          {/* <Td ><Button onClick={()=>handleDeleteopp(item._id)}><AiFillDelete/></Button></Td> */}

      </Tr>
      
    </Tbody>
    
    ) })}

  </Table>
</TableContainer>   
        </Flex>    </div>
  )
}

export default Visit
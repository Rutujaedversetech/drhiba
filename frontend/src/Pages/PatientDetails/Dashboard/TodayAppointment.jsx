import React from 'react'
import { Table, TableCaption, TableContainer, Td, Thead, Tr ,Th,Tbody,Tfoot,Button,Text, Heading, Box} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
    AiFillDelete
  } from 'react-icons/ai';
import { updateOppintmentStatus } from '../../../Redux/blogs/action';
import { deleteOppointment } from '../../../Redux/contact/action';
import { useDispatch } from 'react-redux';
import { Updatefamilyinfo, Updatefamilyinfostatus } from '../../../Redux/family/action';
const TodayAppointment = ({details}) => {
  const dispatch = useDispatch();
console.log('details',details);

  const data = [
    { id: 1, date: '2023-08-15' },
    { id: 2, date: '2023-08-20' },
    { id: 3, date: '2023-08-25' },
    { id: 4, date: '2023-08-26' },
    { id: 5, date: '2023-08-27' },
    { id: 6, date: '2023-08-28' },



    // ... more data
];



const handleOppointment=(open1,item,opening)=>{

  console.log('open0',open1,item,opening);

if(opening){
 dispatch(updateOppintmentStatus(open1, {...item,"status":false}));
//dispatch(Updatefamilyinfostatus(open1, {...item,"status":false}));


  }else{
    dispatch(updateOppintmentStatus(open1, {...item,"status":true}));
  //dispatch(Updatefamilyinfostatus(open1, {...item,"status":true}));


  }

}



const handleDeleteopp=(id,item)=>{
  dispatch(deleteOppointment(id))
  // dispatch(Updatefamilyinfo(id, {...item,status:false}));

        }






if(details.length==0){
  return(
    <Heading>No data available</Heading>
  )
}

const currentDate = new Date();


  return (
    <div>
        <Box margin={'10px'} ><Heading fontSize={'lg'}> Appointment</Heading></Box>
        <TableContainer  >
  <Table  borderCollapse={''}>
    <Thead bg='orange'>
      <Tr>
      <Th >Name</Th>
        <Th>Appointment Date</Th>
        <Th>Appointment Time</Th>

        <Th >Email</Th>
        <Th >Mobile Number</Th>
        <Th >Age</Th>
        <Th >upload Docs</Th>
        <Th >Add Fees</Th>

        <Th >Appointment</Th>
        <Th >Delete</Th>


      </Tr>
    </Thead>
    {details?.map((item)=>{
      ///console.log('item',item);
      const appointmentDate = new Date(item.date);
//console.log('appointmentDate < currentDate',appointmentDate,currentDate,appointmentDate > currentDate);
// if (appointmentDate < currentDate) {
//   // Update the status to true for past appointments
//   handleOppointment(item._id,item,item.status)
const dateString = item.date;
const dateParts = dateString && dateString.split('-');
const year =dateParts && parseInt(dateParts[0]);
const month =dateParts && parseInt(dateParts[1]) - 1; // Month is zero-based
const day = dateParts&& parseInt(dateParts[2]);
const dateToCheck = new Date(year, month, day);
// }
//console.log('currentDate',dateToCheck);

// if (dateToCheck > currentDate) {
//   console.log('The date is greater than the current date.');
// } else if (dateToCheck.toDateString() === currentDate.toDateString()) {
//   console.log('The date is equal to the current date.');

// } else {
//   console.log('The date is less than the current date.');
// }
            return(
    <Tbody>
      <Tr>
        <Td  ><Link to={`/patient/${item._id}`}><Text color='blue'>{item.name}</Text></Link></Td>
        <Td>{item.date}</Td>
        <Td>{item.time}</Td>

        <Td ><Text color={'blue'}>{item.oemail}</Text></Td>
        <Td >{item.mobileNo}</Td>
        <Td >{item.age}</Td>
        <Td>
          {
            (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString()) 
             && !item.visited ?(<Text >Not visited</Text>)
            :
           (!item.visited ? item.status  ?(<Text backgroundColor={''}>Not Visited</Text>):
            (<Text backgroundColor={''}>pending</Text>)       
               :(<Link to={`/patient/${item._id}`}><Button bg={'gray'}>Documents</Button></Link>))

          }
                        </Td>
{!item.is_cancelled ?
        (<Td>
          <Link to={`/doctors/contactss/fees/${item._id}`} color='blue' >
            <Text color='blue'>{item.Appofees ?(item.Appofees):(0)}</Text>
          </Link>
          </Td>):<Td><Text>Cancel</Text></Td>}

        {/* <Td  border={'1px solid black'} >
          {!item.visited ?item.status ?(<Button backgroundColor={'green'} onClick={()=>handleOppointment(item._id,item,item.status)}>confirmed</Button>):
          //  :appointmentDate < currentDate ?(<Button backgroundColor={'red'}>Not visited</Button>):
          (<Button backgroundColor={'red'} onClick={()=>handleOppointment(item._id,item,item.status)}>pending</Button>)
          
          :(<Button bg='orange'>Visited</Button>)}
          
          </Td> */}



<Td  >
          {
          (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString()) 
           && !item.visited ?(<Button backgroundColor={'red'}>Not visited</Button>)
          :
          (!item.visited ? !item.is_cancelled ?
            item.status ?(<Button backgroundColor={'#2a9df4'} 
          onClick={()=>handleOppointment(item._id,item,item.status)}>confirmed</Button>):
          //  :appointmentDate < currentDate ?(<Button backgroundColor={'red'}>Not visited</Button>):
          (<Button backgroundColor={'orange'} 
          onClick={()=>handleOppointment(item._id,item,item.status)}>pending</Button>):(<Button bg='red'>Cancelled</Button>)
          
          :(<Button bg='green'>Visited</Button>))}
          
          </Td>
          <Td ><Button onClick={()=>handleDeleteopp(item._id,item)}><AiFillDelete/></Button></Td>

      </Tr>
     
    </Tbody>
    ) })}

  </Table>
</TableContainer>         
    
    </div>
  )
}

export default TodayAppointment
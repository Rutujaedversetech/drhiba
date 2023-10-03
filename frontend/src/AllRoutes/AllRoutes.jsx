import React, { useEffect } from 'react'
import {Routes,Route,useRoutes,Router, useNavigate} from "react-router-dom"
import Home from '../Pages/Home/Home'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import About from '../Pages/About/About'
import Specialization from '../Pages/Specialization/Specialization'
import Contact from '../Pages/Contact/Contact'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from '../Pages/Login/Login'
import SignupCard from '../Pages/SignUp/Singup'
import Oppoinment from '../Pages/Oppoinment/Oppoinment'
import { useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'
import PatientDetails from '../Pages/PatientDetails/PatientDetails'
import Cheking from '../Pages/PatientDetails/Cheking'
import Upload from '../Pages/PatientDetails/Upload'
import PatientProfile from '../Pages/PatientDetails/PatientProfile'
import { isExpired, decodeToken } from "react-jwt";
import DoctorPortal from '../Pages/PatientDetails/DoctorPortal'
import PrivateRoute from './PrivateRoute'
import ContactDoctor from '../Pages/PatientDetails/ContactDoctor'
import ContactSpecificdetais from '../Pages/PatientDetails/ContactSpecificdetais'
import VisitedFees from '../Pages/PatientDetails/VisitedFees'
import ViewPatient from '../Pages/PatientDetails/ViewPatient'
import Dashboard from '../Pages/PatientDetails/Dashboard'
import UserFeedback from '../Pages/PatientDetails/UserFeedback'
import Promotion from '../Pages/PatientDetails/Promotion'
import Slot from '../Pages/PatientDetails/Availability/Slot'
import AppoinSlot from '../Pages/PatientDetails/Availability/AppoinSlot'
import AppoinHoliday from '../Pages/PatientDetails/Availability/AppoinHoliday'
import AppVideo from '../Pages/PatientDetails/HomeDoctor/AppVideo'
import BeforeAfter from '../Pages/PatientDetails/HomeDoctor/BeforeAfter'
import Caraousel from '../Pages/PatientDetails/HomeDoctor/Caraousel'
import CardInfo from '../Pages/PatientDetails/HomeDoctor/CardInfo'
import Service from '../Pages/PatientDetails/HomeDoctor/Service'
import ServiceDetails from '../Pages/PatientDetails/HomeDoctor/ServiceDetails'
import AboutDocs from '../Pages/PatientDetails/HomeDoctor/AboutDocs'
import Dates from '../Dates'
import MyPatientDocs from '../Pages/Oppoinment/OppointCompo/MyPatientDocs'
import PatientPortal from '../Pages/PatientDetails/PatientDashboard/PatientPortal'
import TimeLine from '../Pages/PatientDetails/PatientDashboard/TimeLine'
import Announcement from '../Pages/PatientDetails/PatientDashboard/Announcement'
import MyFamilyAppointment from '../Pages/PatientDetails/PatientDashboard/MyFamilyAppointment'
import Billing from '../Pages/PatientDetails/PatientDashboard/Billing'
import Visit from '../Pages/PatientDetails/PatientDashboard/Visit'
import ClinicalSummary from '../Pages/PatientDetails/PatientDashboard/ClinicalSummary'
import Documents from '../Pages/PatientDetails/PatientDashboard/Documents'


const AllRoutes = () => {
  const  data = useSelector((store) => store.auth);
  const slideshowdata = useSelector((state)=>state.slideshow)
  const beforeafterdata = useSelector((state)=>state.before)
  const serviceshowdata = useSelector((state)=>state.service)
  const servicedetailsshowdata = useSelector((state)=>state.sdetails)
  const card = useSelector((state)=>state.card)
  const about = useSelector((state)=>state.about)
  const slot = useSelector((state)=>state.slot)
  const holiday = useSelector((state)=>state.holiday)
  const slotholiday = useSelector((state)=>state.slotholiday)
  const video = useSelector((state)=>state.video)
  const family = useSelector((state)=>state.family)
console.log('====================================');
console.log('family',family);
console.log('====================================');

  //DeleteProduct
// console.log('beforeafterdata',beforeafterdata);
// console.log('slideshowdata',slideshowdata);
 console.log('auth',data);

console.log('data.AddOppointment.message',data.AddOppointment);
  const token=localStorage.getItem('token')

  //console.log('datr',data);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedTokenAll',myDecodedToken)
  const toast=useToast()
  const navigate=useNavigate()

  useEffect(() => {
    AOS.init({
      duration: 800,  // Duration of animation
      easing: 'ease-out',  // Easing function for animation
      once: false,  // Only animate elements once while scrolling
    });
  }, []);

  useEffect(()=>{






    // if(myDecodedToken){
    //   //navigate("/patientDetails")
    //   console.log('hello');
    //   // if(myDecodedToken.role=='doctor'){
    //   //     navigate("/patientDetails")
  
    //   // }
    // }
    if(data.AddOppointment.message==='Appointment booked successfullyy'){
      
      toast({
        title: "Appointment booked successfully",
        status: "info",
        duration: 500,
        isClosable: true,
        position: "top",
      });    
      setTimeout(()=>{
        
     navigate('/patient/timeline')
      },1000)
    
    }
    else if(data.AddOppointment.message==='please create your account'){
      
      toast({
        title: "please create your account",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });    
      setTimeout(()=>{
        
     navigate('/signup')
      },1000)
    
    }
    else if(data.AddOppointment.message==='please provide valid mobile number'){
      
      toast({
        title: "please provide valid mobile number",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });    
      
    
    } 
   else if(data.userRegister.message.message==='signup sucessfully'){
      
      toast({
        title: "user added sucessfully",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });    
     setTimeout(()=>{
        
     navigate('/login')
      },1000)
    
    }

    else if(data.userRegister.message.message==="please enter valid email"){
      
      toast({
        title: "please enter valid email",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });    
        

    
    }
    else if(data.userRegister.message.message==="User already signedup!"){


      
      toast({
        title: "User already signedup!",
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "top",
      });    
        

    
    }


    else if(data.userLogin.message==='Login Successfull'){
      
      toast({
        title: "Login Successfull",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });    
      if(myDecodedToken.role=='patient'){
      setTimeout(()=>{
        
     navigate('/patient/timeline')
      },1000)
    }
   else if(myDecodedToken.role=='doctor'){
      setTimeout(()=>{
        
     navigate('/patientDetails')
      },1000)
    }
    }

   else if(data.userLogin.message==='user with this mail does not exist'){
      
      toast({
        title: "invalid email or password",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });    
        

    
    }
    else if(data.userLogout.message==='Logout Successfully'){
      toast({
        title: "user logged out",
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "top",
      });    
      setTimeout(()=>{
        
     navigate('/login')
      },1000)
    
    }
//    else{
//   toast({
//     title: "data deleted successfully",
//     status: "info",
//     duration: 2000,
//     isClosable: true,
//     position: "top",
//   });  
 
// }
// else if(slideshowdata.DeleteProduct.message=='slide deleted'){
//   toast({
//     title: "data deleted successfully",
//     status: "info",
//     duration: 2000,
//     isClosable: true,
//     position: "top",
//   });  
  
// }
// else if(beforeafterdata.DeleteProduct.message=='data deleted'){
//   toast({
//     title: "data deleted successfully before after",
//     status: "info",
//     duration: 2000,
//     isClosable: true,
//     position: "top",
//   });  
//   // setTimeout(()=>{
        
//   //    },1000)
// }
// else if(beforeafterdata.AddProduct.message=='data added'){
//   toast({
//     title: "Data added successfully in before after",
//     status: "info",
//     duration: 2000,
//     isClosable: true,
//     position: "top",
//   });  
  
// }

  },[data])

  

useEffect(()=>{
//   if(slideshowdata.AddProduct.message=='slide added'){
//   toast({
//     title: "Slide added successfully",
//     status: "info",
//     duration: 2000,
//     isClosable: true,
//     position: "top",
//   });  
 
// }
//  if(slideshowdata.DeleteProduct.message=='slide deleted'){
//   toast({
//     title: "data deleted successfully",
//     status: "info",
//     duration: 2000,
//     isClosable: true,
//     position: "top",
//   });  
  
// }
 if(beforeafterdata.DeleteProduct.message=='data deleted'){
  toast({
    title: "data deleted successfully before after",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
  // setTimeout(()=>{
        
  //    },1000)
}
 if(beforeafterdata.AddProduct.message=='data added'){
  toast({
    title: "Data added successfully in before after",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
  
}

},[beforeafterdata])

useEffect(()=>{
  //   if(slideshowdata.AddProduct.message=='slide added'){
  //   toast({
  //     title: "Slide added successfully",
  //     status: "info",
  //     duration: 2000,
  //     isClosable: true,
  //     position: "top",
  //   });  
   
  // }
  //  if(slideshowdata.DeleteProduct.message=='slide deleted'){
  //   toast({
  //     title: "data deleted successfully",
  //     status: "info",
  //     duration: 2000,
  //     isClosable: true,
  //     position: "top",
  //   });  
    
  // }
   if(family.DeleteProduct.message=='data deleted'){
    toast({
      title: "data deleted successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });  
    // setTimeout(()=>{
          
    //    },1000)update success
  }
   if(family.AddProduct.message=='data added'){
    toast({
      title: "family member added successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });  
    
  }
  if(family.UpdateProduct.message=='update success'){
    toast({
      title: "data edited successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });  
    
  }
  },[family])

useEffect(()=>{
  if(slideshowdata.AddProduct.message=='slide added'){
  toast({
    title: "Slide added successfully",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
 
}
 if(slideshowdata.DeleteProduct.message=='slide deleted'){
  toast({
    title: "data deleted successfully",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
  
}
},[slideshowdata])

useEffect(()=>{
  if(servicedetailsshowdata.AddProduct.message=='data added'){
  toast({
    title: "data added successfully in servicedetails",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
 
}
 if(servicedetailsshowdata.DeleteProduct.message=='data deleted'){
  toast({
    title: "data deleted successfully",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
  
}
},[servicedetailsshowdata])


useEffect(()=>{
  if(serviceshowdata.AddProduct.message=='data added'){
  toast({
    title: "data added successfully",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
 
}
 if(serviceshowdata.DeleteProduct.message=='data deleted'){
  toast({
    title: "data deleted successfully",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });  
  
}
},[serviceshowdata])

useEffect(()=>{
  //   if(slideshowdata.AddProduct.message=='slide added'){
  //   toast({
  //     title: "Slide added successfully",
  //     status: "info",
  //     duration: 2000,
  //     isClosable: true,
  //     position: "top",
  //   });  
   
  // }
  //  if(slideshowdata.DeleteProduct.message=='slide deleted'){
  //   toast({
  //     title: "data deleted successfully",
  //     status: "info",
  //     duration: 2000,
  //     isClosable: true,
  //     position: "top",
  //   });  
    
  // }
   if(card.DeleteProduct.message=='data deleted'){
    toast({
      title: "data deleted successfully ",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });  
    // setTimeout(()=>{
          
    //    },1000)
  }
   if(card.AddProduct.message=='data added'){
    toast({
      title: "Data added successfully card",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });  
    
  }
  
  },[card])

  useEffect(()=>{
   

     if(about.DeleteProduct.message=='data deleted'){
      toast({
        title: "data deleted successfully ",
        status: "info",
        duration: 500,
        isClosable: true,
        position: "top",
      });  
      // setTimeout(()=>{
            
      //    },1000)
    }
     if(about.AddProduct.message=='data added'){
      toast({
        title: "Data added successfully card",
        status: "info",
        duration: 500,
        isClosable: true,
        position: "top",
      });  
      
    }
    
    },[about])


    useEffect(()=>{
   

      if(slot.DeleteProduct.message=='data deleted'){
       toast({
         title: "data deleted successfully ",
         status: "info",
         duration: 500,
         isClosable: true,
         position: "top",
       });  
       // setTimeout(()=>{
             
       //    },1000)
     }
      if(slot.AddProduct.message=='data added'){
       toast({
         title: "Data added successfully card",
         status: "info",
         duration: 500,
         isClosable: true,
         position: "top",
       });  
       
     }
     
     },[slot])

     useEffect(()=>{
   

      if(holiday.DeleteProduct.message=='data deleted'){
       toast({
         title: "data deleted successfully ",
         status: "info",
         duration: 500,
         isClosable: true,
         position: "top",
       });  
       // setTimeout(()=>{
             
       //    },1000)
     }
      if(holiday.AddProduct.message=='data added'){
       toast({
         title: "Data added successfully card",
         status: "info",
         duration: 500,
         isClosable: true,
         position: "top",
       });  
       
     }
     
     },[holiday])

     useEffect(()=>{
   

      if(slotholiday.DeleteProduct.message=='data deleted'){
       toast({
         title: "data deleted successfully ",
         status: "info",
         duration: 500,
         isClosable: true,
         position: "top",
       });  
       // setTimeout(()=>{
             
       //    },1000)
     }
      if(slotholiday.AddProduct.message=='data added'){
       toast({
         title: "Data added successfully card",
         status: "info",
         duration: 500,
         isClosable: true,
         position: "top",
       });  
       
     }
     
     },[slotholiday])


     useEffect(()=>{
      if(video.AddProduct.message=='data added'){
      toast({
        title: "video added successfully",
        status: "info",
        duration: 500,
        isClosable: true,
        position: "top",
      });  
     
    }
     if(video.DeleteProduct.message=='data deleted'){
      toast({
        title: "video deleted successfully",
        status: "info",
        duration: 500,
        isClosable: true,
        position: "top",
      });  
      
    }
    },[video])


  return (
    <div>       
        <Routes>
    <Route path="/" element={<><Navbar/><Home/><Footer/></>}/> 
    <Route path="/about" element={<><Navbar/><About/><Footer/></>}/> 
    <Route path="/specialization" element={<><Navbar/><Specialization/><Footer/></>}/> 
    <Route path="/contact" element={<><Navbar/><Contact/><Footer/></>}/> 
    <Route path="/login" element={<><Navbar/><Login/><Footer/></>}/> 
    <Route path="/signup" element={<><Navbar/><SignupCard/><Footer/></>}/> 
    <Route path="/oppointment" element={<><PrivateRoute><Navbar/><Oppoinment/><Footer/></PrivateRoute></>}/> 
    <Route path="/patientDetails" element={<><PrivateRoute><DoctorPortal><PatientDetails/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/p1" element={<><Dates/></>}/>
 
    <Route path="/patientProfile" element={<><PrivateRoute><PatientPortal><PatientProfile/></PatientPortal></PrivateRoute></>}/> 
    <Route path="/doctor/contacts" element={<><PrivateRoute><DoctorPortal><ContactDoctor/></DoctorPortal></PrivateRoute></>}/> 

    <Route path="/doctor/contacts/:id" element={<><PrivateRoute><DoctorPortal><ContactSpecificdetais/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/contactss/fees/:id" element={<><PrivateRoute><DoctorPortal><VisitedFees/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/viewpatient" element={<><PrivateRoute><DoctorPortal><ViewPatient/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/dashboard" element={<><PrivateRoute><DoctorPortal><Dashboard/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/userFeedback" element={<><PrivateRoute><DoctorPortal><UserFeedback/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/slot" element={<><PrivateRoute><DoctorPortal><Slot/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/appoinslot" element={<><PrivateRoute><DoctorPortal><AppoinSlot/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/appoinholiday" element={<><PrivateRoute><DoctorPortal><AppoinHoliday/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/about" element={<><PrivateRoute><DoctorPortal><AboutDocs/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/appvideo" element={<><PrivateRoute><DoctorPortal><AppVideo/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/beforeafter" element={<><PrivateRoute><DoctorPortal><BeforeAfter/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/caraousel" element={<><PrivateRoute><DoctorPortal><Caraousel/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/cardinfo" element={<><PrivateRoute><DoctorPortal><CardInfo/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/service" element={<><PrivateRoute><DoctorPortal><Service/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/doctors/serviceDetails" element={<><PrivateRoute><DoctorPortal><ServiceDetails/></DoctorPortal></PrivateRoute></>}/> 


    <Route path="/doctors/promotion" element={<><PrivateRoute><DoctorPortal><Promotion/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/patient/timeline" element={<><PrivateRoute><PatientPortal><TimeLine/></PatientPortal></PrivateRoute></>}/> 
    <Route path="/patient/family" element={<><PrivateRoute><PatientPortal><MyFamilyAppointment/></PatientPortal></PrivateRoute></>}/> 
    <Route path="/patient/billing" element={<><PrivateRoute><PatientPortal><Billing/></PatientPortal></PrivateRoute></>}/> 
    <Route path="/patient/visit" element={<><PrivateRoute><PatientPortal><Visit/></PatientPortal></PrivateRoute></>}/>
    <Route path="/patient/document" element={<><PrivateRoute><PatientPortal><Documents/></PatientPortal></PrivateRoute></>}/> 
    <Route path="/patient/personal/appointment" element={<><PrivateRoute><PatientPortal><ClinicalSummary/></PatientPortal></PrivateRoute></>}/> 


    <Route path="/patient/:id" element={<><PrivateRoute><DoctorPortal><Upload/></DoctorPortal></PrivateRoute></>}/> 
    <Route path="/mypatientdocs/:id" element={<><PrivateRoute><PatientPortal><MyPatientDocs/></PatientPortal></PrivateRoute></>}/> 

        </Routes>
        </div>
  )
}

export default AllRoutes
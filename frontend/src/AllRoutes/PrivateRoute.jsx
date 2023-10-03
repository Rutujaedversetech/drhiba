import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
/*
Dont make any changes to this file
*/
import { isExpired, decodeToken } from "react-jwt";

function PrivateRoute({children}) {
  const authState1 = useSelector((state)=>state.auth.data)
  const authState = useSelector((state)=>state.auth)

console.log('authStae',authState);
const myDecodedToken = decodeToken(authState1.token);
  console.log('myDecodedTokenAll',myDecodedToken)
  if(!authState.data.isAuthenticated ){
    return <Navigate to={'/login'} />
  }
//  else if(!authState.data.isAuthenticated && myDecodedToken.role=='doctor'){
//     return <Navigate to={'/login'} />
//   }
//   if(myDecodedToken.role=='doctor'){
//     return <Navigate to={'/patientDetails'} />

//   }
  return (
    <div>
      {children}
    </div>
  )
}

export default PrivateRoute

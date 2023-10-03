import axios from "axios";
import { ADD_OTP_FAILURE, ADD_OTP_REQUEST, ADD_OTP_SUCCESS } from "./actionTypes";

export const getAllCard = () => async (dispatch) => {
//console.log('page1234',query1,typeof show);
const token=localStorage.getItem("token")
//const limit=Number(show)
  try {
    dispatch({ type: GET_ALL_CARD_REQUEST });
   
    
    const res=  await fetch(`http://localhost:8080/card/getall`, {
      // body: JSON.stringify(res),
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data=await res.json()
console.log('fgh12345',data);
    dispatch({ type: GET_ALL_CARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CARD_FAILURE,
      payload:error
    });
  }
};





export const addOTP = (data) => async (dispatch) => {
  console.log('datajhbhb',data);
    try {
      dispatch({ type: ADD_OTP_REQUEST });
  
    

      axios.post('http://localhost:8080/card/upload',
          data,
          // {
          //     headers: { 'Authorization': localStorage.getItem('token') }
          // }
      )
          .then((res) => {
              console.log(res.data)
              dispatch({ type: ADD_OTP_SUCCESS, payload: res.data });

    
          })
          .catch(err => {
              console.log(err, "err")
          })

    } catch (error) {
      dispatch({
        type: ADD_OTP_FAILURE,
      });
    }
  };










import axios from "axios";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_AUTHOR_PRODUCT_REQUEST,
  GET_AUTHOR_PRODUCT_SUCCESS,
  GET_AUTHOR_PRODUCT_FAILURE,
  GET_SINGLE_PRODUCT_FAILURE,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  GET_ALL_PATIENTDETAILS_REQUEST,
  GET_ALL_PATIENTDETAILS_SUCCESS,
  GET_ALL_PATIENTDETAILS_FAILURE,
  DELETE_OPPOINTMENT_REQUEST,
  DELETE_OPPOINTMENT_SUCCESS,
  DELETE_OPPOINTMENT_FAILURE,
  GET_AUTHOR_PRODUCT_REQUEST1,
  GET_AUTHOR_PRODUCT_SUCCESS2,
  GET_AUTHOR_PRODUCT_FAILURE3,
  GET_ALL_PATIENTCONTACT_REQUEST,
  GET_ALL_PATIENTCONTACT_SUCCESS,
  GET_ALL_PATIENTCONTACT_FAILURE,
  GET_SINGLE_CONTACT_REQUEST,
  GET_SINGLE_CONTACT_SUCCESS,
  GET_SINGLE_CONTACT_FAILURE,
  UPDATE_PATIENTCONTACT_REQUEST,
  UPDATE_PATIENTCONTACT_SUCCESS,
  UPDATE_PATIENTCONTACT_FAILURE,
  GET_ALL_SLIDEIMAGE_REQUEST,
  GET_ALL_SLIDEIMAGE_FAILURE,
  GET_ALL_SLIDEIMAGE_SUCCESS,
  
  DELETE_SLIDEIMAGE_REQUEST,
  DELETE_SLIDEIMAGE_SUCCESS,
  DELETE_SLIDEIMAGE_FAILURE,
  GET_ALL_BEFOREAFTER_REQUEST,
  GET_ALL_BEFOREAFTER_SUCCESS,
  GET_ALL_BEFOREAFTER_FAILURE,
  DELETE_BEFOREAFTER_REQUEST,
  DELETE_BEFOREAFTER_SUCCESS,
  DELETE_BEFOREAFTER_FAILURE,
  ADD_BEFOREAFTER_REQUEST,
  ADD_BEFOREAFTER_SUCCESS,
  ADD_BEFOREAFTER_FAILURE,
  GET_ALL_SERVICEDETAILS_REQUEST,
  GET_ALL_SERVICEDETAILS_SUCCESS,
  GET_ALL_SERVICEDETAILS_FAILURE,
  DELETE_SERVICEDETAILS_FAILURE,
  DELETE_SERVICEDETAILS_REQUEST,
  DELETE_SERVICEDETAILS_SUCCESS,
  ADD_SERVICEDETAILS_REQUEST,
  ADD_SERVICEDETAILS_SUCCESS,
  ADD_SERVICEDETAILS_FAILURE,
  GET_ALL_PROMOTION_REQUEST,
  GET_ALL_PROMOTION_SUCCESS,
  DELETE_PROMOTION_REQUEST,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_FAILURE,
  ADD_PROMOTION_SUCCESS,
  ADD_PROMOTION_REQUEST,
  ADD_PROMOTION_FAILURE,
  GET_ALL_PROMOTION_FAILURE,
} from "./actionTypes";

export const getAllpromotion = (q,limit,page) => async (dispatch) => {
//console.log('page1234',query1,typeof show);
const token=localStorage.getItem("token")
//const limit=Number(show)
  try {
    dispatch({ type: GET_ALL_PROMOTION_REQUEST });
   
    
    const res=  await fetch(`http://localhost:8080/promotion/getall?query=${q}&limit=${limit}&page=${page}`, {
      // body: JSON.stringify(res),
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data=await res.json()
console.log('fgh12345',data);
    dispatch({ type: GET_ALL_PROMOTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PROMOTION_FAILURE,
      payload:error
    });
  }
};


//   console.log('page1234',page,typeof show);
//   const token=localStorage.getItem("token")
//   const limit=Number(show)
//     try {
//       dispatch({ type: GET_ALL_PATIENTCONTACT_REQUEST });
     
      
//       const res=  await fetch(`http://localhost:8080/contact/getall?query=${q}&limit=${limit}&page=${page}`, {
//         // body: JSON.stringify(res),
//         method: "GET",
//         headers: {
//           token:token,
//           "Content-Type": "application/json",
//         },
//       });
//       var data=await res.json()
//   console.log('fgh12345',data);
//       dispatch({ type: GET_ALL_PATIENTCONTACT_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: GET_ALL_PATIENTCONTACT_FAILURE,
//         payload:error
//       });
//     }
//   };

// export const getSingleContact = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: GET_SINGLE_CONTACT_REQUEST });

//     const res = await axios.get(
//       `http://localhost:8080/contact/${id}`
//     );
    
// console.log('fgh',res);
//     dispatch({ type: GET_SINGLE_CONTACT_SUCCESS, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: GET_SINGLE_CONTACT_FAILURE,
//     });
//   }
// };






// export const getautherblog = (id) => async (dispatch) => {
//   //console.log('is',iid);
//   //var id=id
//     //console.log('is',id);
//    // const token=localStorage.getItem("token")


//   try {
//     dispatch({ type: GET_AUTHOR_PRODUCT_REQUEST });

    
//     const res=  await fetch(`http://localhost:8080/blogs/asd`, {
//       // body: JSON.stringify(res),
//       method: "GET",
//       headers: {
//         token:localStorage.getItem("token")
// ,
//         "Content-Type": "application/json",
//       },
//     });
//     var data=await res.json()
// console.log('fgh123',data);
// //console.log('fgh123',res.data);
//     dispatch({ type: GET_AUTHOR_PRODUCT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: GET_AUTHOR_PRODUCT_FAILURE,
//     });
//   }
// };





// export const getperticulaPatientDocs = (id) => async (dispatch) => {
//   //console.log('is',iid);
//   //var id=id
//     //console.log('is',id);
//    // const token=localStorage.getItem("token")


//   try {
//     dispatch({ type: GET_AUTHOR_PRODUCT_REQUEST1 });

    
//     const res=  await fetch(`http://localhost:8080/application/getall/${id}`, {
//       // body: JSON.stringify(res),
//       method: "GET",
//       headers: {
//         token:localStorage.getItem("token")
// ,
//         "Content-Type": "application/json",
//       },
//     });
//     var data=await res.json()
// console.log('fgh123yu',data);
// //console.log('fgh123',res.data);
//     dispatch({ type: GET_AUTHOR_PRODUCT_SUCCESS2, payload: data });
//   } catch (error) {
//     dispatch({
//       type: GET_AUTHOR_PRODUCT_FAILURE3,
//     });
//   }
// };








// export const addPatientDocs = (formData,id) => async (dispatch) => {

//   try {

//     dispatch({ type: ADD_PRODUCT_REQUEST });

//     const res = await axios.post(
//                    `http://localhost:8080/application/uploads/${id}`,
//                                formData
      
//                );
//              console.log(res.data);
//     console.log('res=',res);
//     //console.log('data1=',data1);
//     dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: ADD_PRODUCT_FAILURE,
//     });
//   }
// };
// //used
// export const updateContactStatus = (id, data) => async (dispatch) => {
//   console.log('opp',data);
//   try {
//     dispatch({ type: UPDATE_PATIENTCONTACT_REQUEST });

//     await fetch(`http://localhost:8080/contact/${id}`, {
//       body: JSON.stringify(data),
//       method: "PATCH",
//       headers: {
//         token: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       },
//     });
    

//     dispatch({ type: UPDATE_PATIENTCONTACT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PATIENTCONTACT_FAILURE,
//     });
//   }
// };

export const deletepromotion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROMOTION_REQUEST });

    await fetch(`http://localhost:8080/promotion/${id}`, {
      method: "DELETE",
      headers: {
       // token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_PROMOTION_FAILURE,
    });
  }
};



export const addpromotion = (data) => async (dispatch) => {
  console.log('datajhbhb',data);
    try {
      dispatch({ type: ADD_PROMOTION_REQUEST });



      axios.post('http://localhost:8080/promotion/upload',
          data,
          //  {
          //   headers: {
          //           'Content-Type': 'multipart/form-data',
          //          },          }
      )
          .then((res) => {
              console.log(res.data)
       //       dispatch({ type: ADD_BEFOREAFTER_SUCCESS, payload: res.data });
     dispatch({ type: ADD_PROMOTION_SUCCESS, payload: res.data });


    
          })
          .catch(err => {
              console.log(err, "err")
          })


          // try {
             //const response = await axios.post('http://localhost:8080/promotion/upload', data,
          //     {
          //    headers: {
          //       'Content-Type': 'multipart/form-data',
          //     },
          //  }
          // );
        
          //   setMessage(response.data);
              //  dispatch({ type: ADD_PROMOTION_SUCCESS, payload: response.data });


          // }
          // catch (error) {
          //   setMessage('Upload failed');
          //   console.error('Error:', error);
          // }



    } catch (error) {
      dispatch({
        type: ADD_PROMOTION_FAILURE,
      });
    }
  };










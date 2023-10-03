import axios from "axios";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
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
  GET_ALL_FAMILYDETAILS_REQUEST,
  GET_ALL_FAMILYDETAILS_SUCCESS,
  GET_ALL_FAMILYDETAILS_FAILURE,
  GET_SINGLE_FAMILY_REQUEST,
  GET_SINGLE_FAMILY_FAILURE,
  GET_SINGLE_FAMILY_SUCCESS,
  GET_DOCTOR_FAMILY_REQUEST,
  GET_DOCTOR_FAMILY_SUCCESS,
  GET_DOCTOR_FAMILY_FAILURE,
  ADD_MEMBER_FAMILY_REQUEST,
  ADD_MEMBER_FAMILY_SUCCESS,
  ADD_MEMBER_FAMILY_FAILURE,
  DELETE_MEMBER_FAMILY_REQUEST,
  DELETE_MEMBER_FAMILY_SUCCESS,
  DELETE_MEMBER_FAMILY_FAILURE,
  UPDATE_MEMBER_FAMILY_REQUEST,
  UPDATE_MEMBER_FAMILY_SUCCESS,
  UPDATE_MEMBER_FAMILY_FAILURE,
} from "./actionTypes";

export const getAllProducts = (q) => async (dispatch) => {
console.log('page',q);
const token=localStorage.getItem("token")
if(!q){
  q=''
}

//const url=`http://localhost:8080/blogs/getall?${q}`

  try {
    dispatch({ type: GET_ALL_FAMILYDETAILS_REQUEST });
   
    
    const res=  await fetch(`http://localhost:8080/family/getall`, {
      // body: JSON.stringify(res),
      method: "GET",
      headers: {
        token:token
,
        "Content-Type": "application/json",
      },
    });
    var data=await res.json()
console.log('fgh123',data);
    dispatch({ type: GET_ALL_FAMILYDETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FAMILYDETAILS_FAILURE,
      payload:error
    });
  }
};





//for only one family member
export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_FAMILY_REQUEST });

    const res = await axios.get(
      `http://localhost:8080/blogs/speblogs/${id}`
    );
    
console.log('fgh',res);
    dispatch({ type: GET_SINGLE_FAMILY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_FAMILY_FAILURE,
    });
  }
};





//for all family
export const getfamilymember = (id) => async (dispatch) => {
  //console.log('is',iid);
  //var id=id
    //console.log('is',id);
   // const token=localStorage.getItem("token")


  try {
    dispatch({ type: GET_DOCTOR_FAMILY_REQUEST });

    
    const res=  await fetch(`http://localhost:8080/family/myfamily`, {
      // body: JSON.stringify(res),
      method: "GET",
      headers: {
        token:localStorage.getItem("token")
,
        "Content-Type": "application/json",
      },
    });
    var data=await res.json()
console.log('fgh123',data);
//console.log('fgh123',res.data);
    dispatch({ type: GET_DOCTOR_FAMILY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DOCTOR_FAMILY_FAILURE,
    });
  }
};


//for add family member
export const addfamilymember = (data) => async (dispatch) => {
  console.log('datajhbhb',data);
    try {
      dispatch({ type: ADD_MEMBER_FAMILY_REQUEST });
  
      const res = await fetch("http://localhost:8080/family/info", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      let data1 = await res.json();
      // console.log('res=',res);
      console.log('data1=',data1);
      dispatch({ type: ADD_MEMBER_FAMILY_SUCCESS, payload: data1 });
    } catch (error) {
      dispatch({
        type: ADD_MEMBER_FAMILY_FAILURE,
      });
    }
  };


export const getperticulaPatientDocs = (id) => async (dispatch) => {
  //console.log('is',iid);
  //var id=id
    //console.log('is',id);
   // const token=localStorage.getItem("token")


  try {
    dispatch({ type: GET_AUTHOR_PRODUCT_REQUEST1 });

    
    const res=  await fetch(`http://localhost:8080/application/getall/${id}`, {
      // body: JSON.stringify(res),
      method: "GET",
      headers: {
        token:localStorage.getItem("token")
,
        "Content-Type": "application/json",
      },
    });
    var data=await res.json()
console.log('fgh123yu',data);
//console.log('fgh123',res.data);
    dispatch({ type: GET_AUTHOR_PRODUCT_SUCCESS2, payload: data });
  } catch (error) {
    dispatch({
      type: GET_AUTHOR_PRODUCT_FAILURE3,
    });
  }
};







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

// export const updateOppintmentStatus = (id, data) => async (dispatch) => {
//   console.log('opp',data);
//   try {
//     dispatch({ type: UPDATE_PRODUCT_REQUEST });

//     await fetch(`http://localhost:8080/blogs/update/${id}`, {
//       body: JSON.stringify(data),
//       method: "PATCH",
//       headers: {
//         token: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       },
//     });
    

//     dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PRODUCT_FAILURE,
//     });
//   }
// };

// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_PRODUCT_REQUEST });

//     await fetch(`http://localhost:8080/application/${id}`, {
//       method: "DELETE",
//       headers: {
//        // token: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       },
//     });
//     dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
//   } catch (error) {
//     dispatch({
//       type: DELETE_PRODUCT_FAILURE,
//     });
//   }
// };




// export const deleteOppointment= (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_OPPOINTMENT_REQUEST });

//     await fetch(`http://localhost:8080/blogs/${id}`, {
//       method: "DELETE",
//       headers: {
//         token: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       },
//     });
//     dispatch({ type: DELETE_OPPOINTMENT_SUCCESS, payload: id });
//   } catch (error) {
//     dispatch({
//       type: DELETE_OPPOINTMENT_FAILURE,
//     });
//   }
// };


export const deleteFamilymember = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MEMBER_FAMILY_REQUEST });

    await fetch(`http://localhost:8080/family/memeber/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: DELETE_MEMBER_FAMILY_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_MEMBER_FAMILY_FAILURE,
    });
  }
};



export const Updatefamilyinfo = (id, data) => async (dispatch) => {
  console.log('updatedata',id,data);
  try {
    dispatch({ type: UPDATE_MEMBER_FAMILY_REQUEST });

    await fetch(`http://localhost:8080/family/update/${id}`, {
      body: JSON.stringify(data),
      method: "PATCH",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    
console.log('opk',data);
    dispatch({ type: UPDATE_MEMBER_FAMILY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_MEMBER_FAMILY_FAILURE,
    });
  }
};



export const Updatefamilyinfostatus = (id, data) => async (dispatch) => {
  console.log('updatedata',id,data);
  try {
    dispatch({ type: UPDATE_MEMBER_FAMILY_REQUEST });

    await fetch(`http://localhost:8080/family/status/update/${id}`, {
      body: JSON.stringify(data),
      method: "PATCH",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    
console.log('opk',data);
    dispatch({ type: UPDATE_MEMBER_FAMILY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_MEMBER_FAMILY_FAILURE,
    });
  }
};





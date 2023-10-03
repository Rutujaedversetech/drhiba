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
  GET_ALL_PATIENTCONTACT_REQUEST,
  GET_ALL_PATIENTCONTACT_SUCCESS,
  GET_ALL_PATIENTCONTACT_FAILURE,
  GET_SINGLE_CONTACT_REQUEST,
  GET_SINGLE_CONTACT_SUCCESS,
  GET_SINGLE_CONTACT_FAILURE,
  UPDATE_PATIENTCONTACT_REQUEST,
  UPDATE_PATIENTCONTACT_SUCCESS,
  UPDATE_PATIENTCONTACT_FAILURE,
} from "./actionTypes";

export const getAllContacts = (query1) => async (dispatch) => {
console.log('page1234',query1,typeof show);
const token=localStorage.getItem("token")
//const limit=Number(show)
  try {
    dispatch({ type: GET_ALL_PATIENTCONTACT_REQUEST });
   
    
    const res=  await fetch(`http://localhost:8080/contact/getall?${query1}`, {
      // body: JSON.stringify(res),
      method: "GET",
      headers: {
        token:token,
        "Content-Type": "application/json",
      },
    });
    var data=await res.json()
console.log('fgh12345',data);
    dispatch({ type: GET_ALL_PATIENTCONTACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PATIENTCONTACT_FAILURE,
      payload:error
    });
  }
};


export const getAllContacts2 = (page,show,q) => async (dispatch) => {
  console.log('page1234',page,typeof show);
  const token=localStorage.getItem("token")
  const limit=Number(show)
    try {
      dispatch({ type: GET_ALL_PATIENTCONTACT_REQUEST });
     
      
      const res=  await fetch(`http://localhost:8080/contact/getall?query=${q}&limit=${limit}&page=${page}`, {
        // body: JSON.stringify(res),
        method: "GET",
        headers: {
          token:token,
          "Content-Type": "application/json",
        },
      });
      var data=await res.json()
  console.log('fgh12345',data);
      dispatch({ type: GET_ALL_PATIENTCONTACT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_PATIENTCONTACT_FAILURE,
        payload:error
      });
    }
  };

export const getSingleContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CONTACT_REQUEST });

    const res = await axios.get(
      `http://localhost:8080/contact/specific/${id}`
    );
    
console.log('fgh',res);
    dispatch({ type: GET_SINGLE_CONTACT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CONTACT_FAILURE,
    });
  }
};






export const getautherblog = (id) => async (dispatch) => {
  //console.log('is',iid);
  //var id=id
    //console.log('is',id);
   // const token=localStorage.getItem("token")


  try {
    dispatch({ type: GET_AUTHOR_PRODUCT_REQUEST });

    
    const res=  await fetch(`http://localhost:8080/blogs/asd`, {
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
    dispatch({ type: GET_AUTHOR_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_AUTHOR_PRODUCT_FAILURE,
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








export const addPatientDocs = (formData,id) => async (dispatch) => {

  try {

    dispatch({ type: ADD_PRODUCT_REQUEST });

    const res = await axios.post(
                   `http://localhost:8080/application/uploads/${id}`,
                               formData
      
               );
             console.log(res.data);
    console.log('res=',res);
    //console.log('data1=',data1);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
    });
  }
};
//used
export const updateContactStatus = (id, data) => async (dispatch) => {
  console.log('opp',data);
  try {
    dispatch({ type: UPDATE_PATIENTCONTACT_REQUEST });

    await fetch(`http://localhost:8080/contact/${id}`, {
      body: JSON.stringify(data),
      method: "PATCH",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    

    dispatch({ type: UPDATE_PATIENTCONTACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PATIENTCONTACT_FAILURE,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    await fetch(`http://localhost:8080/application/${id}`, {
      method: "DELETE",
      headers: {
       // token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
    });
  }
};




export const deleteOppointment= (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_OPPOINTMENT_REQUEST });

    await fetch(`http://localhost:8080/blogs/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: DELETE_OPPOINTMENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_OPPOINTMENT_FAILURE,
    });
  }
};











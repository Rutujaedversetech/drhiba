import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGOUT,
  ADD_OPPOINTMENT_REQUEST,
  ADD_OPPOINTMENT_SUCCESS,
  ADD_OPPOINTMENT_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from "./actionTypes";
import axios from "axios";

export const authRegister = (data) => async (dispatch) => {
  console.log('data',data);
  try {
    dispatch({ type: AUTH_REGISTER_REQUEST });

    const res = await axios.post(
      "http://localhost:8080/users/signup",
      data
    );
    console.log('res: ', res);

    dispatch({
      type: AUTH_REGISTER_SUCCESS,
      payload: {
        message: res.data,
        data:res.data
      },
    });
  } catch (error) {
    console.log('error: ', error.response.data);

    dispatch({
      type: AUTH_REGISTER_FAILURE,
      payload: {
        message: error.response.data,
      },
    });
  }
};


export const addOppointment = (data) => async (dispatch) => {
console.log('datajhbhb',data);
  try {
    dispatch({ type: ADD_OPPOINTMENT_REQUEST });

    const res = await fetch("http://localhost:8080/blogs/appointment", {
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
    dispatch({ type: ADD_OPPOINTMENT_SUCCESS, payload: data1 });
  } catch (error) {
    dispatch({
      type: ADD_OPPOINTMENT_FAILURE,
    });
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_USER_REQUEST });

    const res = await axios.get(
    `http://localhost:8080/users/user/${id}`, {headers: {
        token:localStorage.getItem("token")
,
        "Content-Type": "application/json",
      },}
    );
    
console.log('fgh',res);
    dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_USER_FAILURE,
    });
  }
};

export const authLogin = (data) => async (dispatch) => {
//   console.log("data: ", data);
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    const res = await axios.post(
      "http://localhost:8080/users/login",
      data
    );
     console.log("res: ", res);

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        message:res.data.message,
        user: res.data.user,
      },
    });
  } catch (error) {
    // console.log("error: ", error);

    dispatch({
      type: AUTH_LOGIN_FAILURE,
      payload: {
        message: 'user with this mail does not exist',
      },
    });
  }
};

export const signout = () => {
  return {
    type: AUTH_LOGOUT,
    
  };
};


export const getAllusers = (query1) => async (dispatch) => {
  //console.log('page',page);
  const token=localStorage.getItem("token")
  
    try {
      dispatch({ type: GET_ALL_USERS_REQUEST });
     
      
      const res=  await fetch(`http://localhost:8080/users/getall?${query1}`, {
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
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_USERS_FAILURE,
        payload:error
      });
    }
  };




  export const getAllusers2 = (page,show,q) => async (dispatch) => {
    //console.log('page',page);
    const token=localStorage.getItem("token")
    const limit=Number(show)

      try {
        dispatch({ type: GET_ALL_USERS_REQUEST });
       
        
        const res=  await fetch(`http://localhost:8080/users/getall?query=${q}&limit=${limit}&page=${page}`, {
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
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_ALL_USERS_FAILURE,
          payload:error
        });
      }
    };



  export const deleteuser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        headers: {
        //  token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILURE,
      });
    }
  }

  export const updateUserStatus = (id, data) => async (dispatch) => {
    console.log('opp',data);
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      await fetch(`http://localhost:8080/users/user/${id}`, {
        body: JSON.stringify(data),
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
      });
    }
  };
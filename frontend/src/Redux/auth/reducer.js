import {
  ADD_OPPOINTMENT_FAILURE,
  ADD_OPPOINTMENT_REQUEST,
  ADD_OPPOINTMENT_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_RESET,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_RESET,
  AUTH_REGISTER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_SINGLE_USER_FAILURE,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./actionTypes";
import { isExpired, decodeToken } from "react-jwt";

const TOKEN = localStorage.getItem("token");
const myDecodedToken = decodeToken(TOKEN);
  console.log('myDecodedToken',myDecodedToken)

const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },
  DeleteProduct: { loading: true, error: false,message:"" },

  userRegister: { loading: false, error: false, message: "" },
  AddOppointment: { loading: true, error: false,message:'' },
  totalPage:'',
  UpdateProduct: { loading: false, error: false,message:'' },

  TotalData:'',
  data: {
    isAuthenticated: !!TOKEN,
    token: TOKEN,
    user: myDecodedToken,
  },
  Alluser:[]
};

export default function authReducer(state = initialState, { type, payload }) {
console.log('stateAuth',state,payload);
  switch (type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        userLogout: { message: "" },
        userRegister: { loading: false, error: false, message: "" },

        userLogin: { loading: true, error: false },
      };
    case AUTH_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        userRegister: { loading: false, error: false, message: "" },

        userLogin: { loading: false, error: false, message: payload.message },
        userLogout: { message: "" },
        AddOppointment: { loading: true, error: false,message:'' },
        singleData:{},
        data: { isAuthenticated: true,
          token: payload.token,
          user: payload.user,
        },
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        userLogin: { loading: false, error: true, message: payload.message },
        data: {
          isAuthenticated: false,
          token: '',
          user:'',
        },
        userRegister: { loading: false, error: false, message: "" },
        AddOppointment: { loading: true, error: false,message:'' },
      
      };

    case AUTH_LOGIN_RESET:
      return {
        ...state,
        userLogin: { loading: false, error: false, message: "" },
      };

      case GET_SINGLE_USER_REQUEST:
        return {
          ...state,
          Product: { loading: true, error: false },
          AddOppointment: { loading: true, error: false,message:'' },
          userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },

  userRegister: { loading: false, error: false, message: "" },
        };
      case GET_SINGLE_USER_SUCCESS:
        return {
          ...state,
          Product: {
            loading: false,
            error: false,
          },
          AddOppointment: { loading: true, error: false,message:'' },
          userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },

  userRegister: { loading: false, error: false, message: "" },
          singleData: payload,
        };
  
      case GET_SINGLE_USER_FAILURE:
        return {
          ...state,
          AddOppointment: { loading: true, error: false,message:'' },
          userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },

  userRegister: { loading: false, error: false, message: "" },
          Product: { loading: false, error: true },
        };

        case UPDATE_USER_REQUEST:

        return {
          ...state,
          UpdateProduct: { loading: true, error: false,message:'' },
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          UpdateProduct: { loading: false, error: false,message:"data updated3" },
          Alluser: state.Alluser.map((item) =>
          //console.log('item',item)
            item._id == payload._id ? payload : item
          ),
        };
  
      case UPDATE_USER_FAILURE:
        return {
          ...state,
          UpdateProduct: { loading: false, error: true,message:'' },
        };






    case AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userLogin: { loading: false, error: false, message:'' },
        userRegister: { loading: false, error: false, message: "" },
        AddOppointment: { loading: true, error: false,message:'' },
        userLogout: { message: "Logout Successfully" },
        data: {
          isAuthenticated: false,
          token: null,
          user: null,
        },
      };

    case AUTH_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: { loading: true, error: false,  message:'',
        },
        userLogout: { message: "" },

      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        userRegister: {
          loading: false,
          error: false,
          message: payload.message,
        },
        userLogout: { message: "" },
        userLogin: { loading: false, error: false, message: "" },


      };
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        userRegister: { loading: false, error: true, message:payload },
        userLogin: { loading: false, error: false, message: "" },

      };

    case AUTH_REGISTER_RESET:
      return {
        ...state,
        userRegister: { loading: false, error: false, message: "" },
      };
      case ADD_OPPOINTMENT_REQUEST:
        return {
          ...state,
          AddOppointment: { loading: true, error: false,message:'' },
          userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },

  userRegister: { loading: false, error: false, message: "" },
        };
      case ADD_OPPOINTMENT_SUCCESS:

        return {
          ...state,
          AddOppointment: { loading: false, error: false,message:'Appointment booked successfullyy'  },
          // data: [...state.data, payload.blog],
          userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },

  userRegister: { loading: false, error: false, message: "" },
        };
        case GET_ALL_USERS_REQUEST:
        return {
          ...state,
          AllProducts: { loading: true, error: false },
          AddProduct: { loading: false, error: false ,message:''},
          userRegister: { loading: false, error: false, message: "" },
          DeleteProduct: { loading: false, error: false,message:"" },


        };
      case GET_ALL_USERS_SUCCESS:
        return {
          ...state,
          AllProducts: { loading: false, error: false },
          AddProduct: { loading: false, error: false ,message:''},
          userRegister: { loading: false, error: false, message: "" },
          DeleteProduct: { loading: false, error: false,message:"" },

          Alluser:[...payload.paginatedData],
          totalPage:payload.totalPages,
          TotalData:payload.TotalData


        };
  
      case GET_ALL_USERS_FAILURE:
        return {
          ...state,
          AllProducts: { loading: false, error: true },
          AddProduct: { loading: false, error: true ,message:''},
          userRegister: { loading: false, error: false, message: "" },
          DeleteProduct: { loading: false, error: false,message:"" },

        };
  
        case DELETE_USER_REQUEST:
          return {
            ...state,
            DeleteProduct: { loading: true, error: false,message:"" },
          };
        case DELETE_USER_SUCCESS:
          return {
            ...state,
            DeleteProduct: { loading: false, error: false,message:"data deleted" },
            Alluser: state.Alluser.filter((item) => item._id !== payload),
          };
    
        case DELETE_USER_FAILURE:
          return {
            ...state,
            DeleteProduct: { loading: false, error: true,message:"" },
          };
  


      case ADD_OPPOINTMENT_FAILURE:
        return {
          ...state,
          AddOppointment: { loading: false, error: true,message:'' },
          userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },

  userRegister: { loading: false, error: false, message: "" },
        };
    default:
      return state;
  }
}
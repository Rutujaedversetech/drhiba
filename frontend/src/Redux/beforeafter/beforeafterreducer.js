import {
  ADD_BEFOREAFTER_FAILURE,
  ADD_BEFOREAFTER_REQUEST,
  ADD_BEFOREAFTER_SUCCESS,
  ADD_SLIDEIMAGE_FAILURE,
  ADD_SLIDEIMAGE_REQUEST,
    ADD_SLIDEIMAGE_SUCCESS,
    DELETE_BEFOREAFTER_FAILURE,
    DELETE_BEFOREAFTER_REQUEST,
    DELETE_BEFOREAFTER_SUCCESS,
    // ADD_PRODUCT_FAILURE,
    // ADD_PRODUCT_REQUEST,
    // ADD_PRODUCT_SUCCESS,
    DELETE_OPPOINTMENT_FAILURE,
    DELETE_OPPOINTMENT_REQUEST,
    DELETE_OPPOINTMENT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_SLIDEIMAGE_FAILURE,
    DELETE_SLIDEIMAGE_REQUEST,
    DELETE_SLIDEIMAGE_SUCCESS,
    GET_ALL_BEFOREAFTER_FAILURE,
    GET_ALL_BEFOREAFTER_REQUEST,
    GET_ALL_BEFOREAFTER_SUCCESS,
    GET_ALL_PATIENTCONTACT_FAILURE,
    GET_ALL_PATIENTCONTACT_REQUEST,
    GET_ALL_PATIENTCONTACT_SUCCESS,
    GET_ALL_PATIENTDETAILS_FAILURE,
    GET_ALL_PATIENTDETAILS_REQUEST,
    GET_ALL_PATIENTDETAILS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_SLIDEIMAGE_FAILURE,
    GET_ALL_SLIDEIMAGE_REQUEST,
    GET_ALL_SLIDEIMAGE_SUCCESS,
    GET_AUTHOR_PRODUCT_FAILURE,
    GET_AUTHOR_PRODUCT_FAILURE3,
    GET_AUTHOR_PRODUCT_REQUEST,
    GET_AUTHOR_PRODUCT_REQUEST1,
    GET_AUTHOR_PRODUCT_SUCCESS,
    GET_AUTHOR_PRODUCT_SUCCESS2,
    GET_SINGLE_CONTACT_FAILURE,
    GET_SINGLE_CONTACT_REQUEST,
    GET_SINGLE_CONTACT_SUCCESS,
    GET_SINGLE_PRODUCT_FAILURE,
    GET_SINGLE_PRODUCT_REQUEST,
    GET_SINGLE_PRODUCT_SUCCESS,
    UPDATE_PATIENTCONTACT_FAILURE,
    UPDATE_PATIENTCONTACT_REQUEST,
    UPDATE_PATIENTCONTACT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
  } from "./actionTypes";
  
  const initialState = {
    AllProducts: { loading: false, error: false },
    Product: { loading: false, error: false },
    AddProduct: { loading: false, error: false ,message:''},
    UpdateProduct: { loading: false, error: false },
    DeleteProduct: { loading: false, error: false,message:'' },
    Deleteoppointment: { loading: false, error: false },
    totalPage:'',
    data: [],
    singleData: {},
    userDetails:{}
  };
  
  export default function PatientdetailsReducer(
    state = initialState,
    { type, payload }
  ) {
    console.log('blog',payload,state);

    switch (type) {
      case GET_ALL_BEFOREAFTER_REQUEST:
        return {
          ...state,
          AllProducts: { loading: true, error: false },
          //AddProduct: { loading: false, error: false ,message:''},
          DeleteProduct: { loading: false, error: true,message:'' },

        };
      case GET_ALL_BEFOREAFTER_SUCCESS:
        return {
          ...state,
          AllProducts: { loading: false, error: false },
        //  AddProduct: { loading: false, error: false ,message:''},
          DeleteProduct: { loading: false, error: true,message:'' },

          data:[...payload],
        };
  
      case GET_ALL_BEFOREAFTER_FAILURE:
        return {
          ...state,
          AllProducts: { loading: false, error: true },
         // AddProduct: { loading: false, error: true ,message:''},
          DeleteProduct: { loading: false, error: true,message:'' },

        };
  


        case GET_AUTHOR_PRODUCT_REQUEST:
          return {
            ...state,
            AllProducts: { loading: true, error: false },
          };
        case  GET_AUTHOR_PRODUCT_SUCCESS:
          return {
            ...state,
            AllProducts: { loading: false, error: false },
            data: [...payload],
          };
    
        case  GET_AUTHOR_PRODUCT_FAILURE:
          return {
            ...state,
            AllProducts: { loading: false, error: true },
          };
    


          case GET_AUTHOR_PRODUCT_REQUEST1:
          return {
            ...state,
            AllProducts: { loading: true, error: false },
          };
        case  GET_AUTHOR_PRODUCT_SUCCESS2:
          return {
            ...state,
            AllProducts: { loading: false, error: false },
            data: [...payload],
          };
    
        case  GET_AUTHOR_PRODUCT_FAILURE3:
          return {
            ...state,
            AllProducts: { loading: false, error: true },
          };
    





      case GET_SINGLE_CONTACT_REQUEST:
        return {
          ...state,
          Product: { loading: true, error: false },
        };
      case GET_SINGLE_CONTACT_SUCCESS:
        return {
          ...state,
          Product: {
            loading: false,
            error: false,
          },
          singleData: payload,
        };
  
      case GET_SINGLE_CONTACT_FAILURE:
        return {
          ...state,
          Product: { loading: false, error: true },
        };
  
      case ADD_BEFOREAFTER_REQUEST:
        return {
          ...state,
          DeleteProduct: { loading: false, error: true,message:'' },

          AddProduct: { loading: true, error: false,message:'' },
        };
      case ADD_BEFOREAFTER_SUCCESS:

        return {
          ...state,
          DeleteProduct: { loading: false, error: true,message:'' },

          AddProduct: { loading: false, error: false,message:'data added'  },
          data: [...state.data, payload],
        };
  
      case ADD_BEFOREAFTER_FAILURE:
        return {
          ...state,
          DeleteProduct: { loading: false, error: true,message:'' },

          AddProduct: { loading: false, error: true,message:'' },
        };
  
      case UPDATE_PATIENTCONTACT_REQUEST:

        return {
          ...state,
          UpdateProduct: { loading: true, error: false },
        };
      case UPDATE_PATIENTCONTACT_SUCCESS:
        return {
          ...state,
          UpdateProduct: { loading: false, error: false },
          data: state.data.map((item) =>
          //console.log('item',item)
            item._id == payload._id ? payload : item
          ),
        };
  
      case UPDATE_PATIENTCONTACT_FAILURE:
        return {
          ...state,
          UpdateProduct: { loading: false, error: true },
        };
  
      case DELETE_BEFOREAFTER_REQUEST:
        return {
          ...state,
          AddProduct: { loading: false, error: false,message:''  },

          DeleteProduct: { loading: true, error: false,message:"" },
        };
      case DELETE_BEFOREAFTER_SUCCESS:
        return {
          ...state,
          DeleteProduct: { loading: false, error: false,message:"data deleted" },
          AddProduct: { loading: false, error: false,message:''  },

          data: state.data.filter((item) => item._id !== payload),
        };
  
      case DELETE_BEFOREAFTER_FAILURE:
        return {
          ...state,
          DeleteProduct: { loading: false, error: true ,message:""},
        };

        case DELETE_OPPOINTMENT_REQUEST:
        return {
          ...state,
          Deleteoppointment: { loading: true, error: false },
        };
      case DELETE_OPPOINTMENT_SUCCESS:
        return {
          ...state,
          Deleteoppointment: { loading: false, error: false },
          data: state.data.filter((item) => item._id !== payload),
        };
  
      case DELETE_OPPOINTMENT_FAILURE:
        return {
          ...state,
          Deleteoppointment: { loading: false, error: true },
        };
  
      default:
        return state;
    }
  }
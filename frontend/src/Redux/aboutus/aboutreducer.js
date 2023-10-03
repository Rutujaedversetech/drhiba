import {
  
  ADD_ABOUT_FAILURE,
  ADD_ABOUT_REQUEST,
  ADD_ABOUT_SUCCESS,
  ADD_CARD_FAILURE,
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_REQUEST,
    ADD_SERVICE_SUCCESS,
    ADD_SLOT_FAILURE,
    ADD_SLOT_REQUEST,
    ADD_SLOT_SUCCESS,
    DELETE_ABOUT_FAILURE,
    DELETE_ABOUT_REQUEST,
    DELETE_ABOUT_SUCCESS,
    DELETE_CARD_FAILURE,
    DELETE_CARD_REQUEST,
    DELETE_CARD_SUCCESS,
    // ADD_PRODUCT_FAILURE,
    // ADD_PRODUCT_REQUEST,
    // ADD_PRODUCT_SUCCESS,
    DELETE_OPPOINTMENT_FAILURE,
    DELETE_OPPOINTMENT_REQUEST,
    DELETE_OPPOINTMENT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    
    DELETE_SERVICE_FAILURE,
    
    DELETE_SERVICE_REQUEST,
    
    DELETE_SERVICE_SUCCESS,
    
    DELETE_SLOT_FAILURE,
    
    DELETE_SLOT_REQUEST,
    
    DELETE_SLOT_SUCCESS,
    
    GET_ALL_ABOUT_FAILURE,
    
    GET_ALL_ABOUT_REQUEST,
    
    GET_ALL_ABOUT_SUCCESS,
    
    GET_ALL_CARD_FAILURE,
    
    GET_ALL_CARD_REQUEST,
    
    GET_ALL_CARD_SUCCESS,
    
    GET_ALL_PATIENTCONTACT_FAILURE,
    GET_ALL_PATIENTCONTACT_REQUEST,
    GET_ALL_PATIENTCONTACT_SUCCESS,
    GET_ALL_PATIENTDETAILS_FAILURE,
    GET_ALL_PATIENTDETAILS_REQUEST,
    GET_ALL_PATIENTDETAILS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_SERVICE_FAILURE,
    GET_ALL_SERVICE_REQUEST,
    GET_ALL_SERVICE_SUCCESS,
    GET_ALL_SLIDEIMAGE_FAILURE,
    GET_ALL_SLIDEIMAGE_REQUEST,
    GET_ALL_SLIDEIMAGE_SUCCESS,
    GET_ALL_SLOT_FAILURE,
    GET_ALL_SLOT_REQUEST,
    GET_ALL_SLOT_SUCCESS,
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
    DeleteProduct: { loading: false, error: false },
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
      case GET_ALL_ABOUT_REQUEST:
        return {
          ...state,
          AllProducts: { loading: true, error: false },
          //AddProduct: { loading: false, error: false ,message:''},
          DeleteProduct: { loading: false, error: true,message:'' },


        };
      case GET_ALL_ABOUT_SUCCESS:
        return {
          ...state,
          AllProducts: { loading: false, error: false },
          AddProduct: { loading: false, error: false ,message:''},

          data:[...payload],
        };
  
      case GET_ALL_ABOUT_FAILURE:
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
  
      case ADD_ABOUT_REQUEST:
        return {
          ...state,
          DeleteProduct: { loading: false, error: true,message:'' },

          AddProduct: { loading: true, error: false,message:'' },        };
      case ADD_ABOUT_SUCCESS:

        return {
          ...state,
          DeleteProduct: { loading: false, error: true,message:'' },

          AddProduct: { loading: false, error: false,message:'data added'  },
                    data: [...state.data, payload],
        };
  
      case ADD_ABOUT_FAILURE:
        return {
          ...state,
          DeleteProduct: { loading: false, error: true,message:'' },

          AddProduct: { loading: false, error: true,message:'' },        };
  
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
  
      case DELETE_ABOUT_REQUEST:
        return {
          ...state,
          AddProduct: { loading: false, error: false,message:''  },

          DeleteProduct: { loading: true, error: false,message:"" },
                };
      case DELETE_ABOUT_SUCCESS:
        return {
          ...state,
          DeleteProduct: { loading: false, error: false,message:"data deleted" },
          AddProduct: { loading: false, error: false,message:''  },
                    data: state.data.filter((item) => item._id !== payload),
        };
  
      case DELETE_ABOUT_FAILURE:
        return {
          ...state,
          DeleteProduct: { loading: false, error: true },
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
import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    combineReducers,
  } from "redux";
  
  import thunk from 'redux-thunk';
  import authReducer from './auth/reducer';
import PatientdetailsReducer from "./blogs/reducer";
import contactreducer from './contact/contactreducer';
import slidereducer from './slideshow/slidereducer';
import servicereducer from './service/servicereducer';
import beforereducer from './beforeafter/beforeafterreducer';
import cardreducer from './card/cardreducer';
import slotreducer from './slot/slotreducer';


import servicedetailreducer from './servicedetails/servicedetailreducer';
import promotionreducer from './promotion/promotionreducer';

import videoreducer from './videoadd/videoreducer';
import aboutreducer from './aboutus/aboutreducer';
import dateholidayreducer from './dateholiday/dateholidayreducer';
import slotholidayreducer from './slotholiday/slotholidayreducer';

import familyreducer from './family/familyreducer';


  //import cartReducer from './cart/reducer';
  //import productsReducer from './products/reducer';
  
  const rootReducer = combineReducers({
      auth : authReducer,
      patient : PatientdetailsReducer,
      contact: contactreducer,
      slideshow:slidereducer,
      service:servicereducer,
      before:beforereducer,
      card:cardreducer,
      sdetails:servicedetailreducer,
      promotion:promotionreducer,
      video:videoreducer,
      slot:slotreducer,
      about:aboutreducer,
      holiday:dateholidayreducer,
      slotholiday:slotholidayreducer,
      family:familyreducer











  });
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
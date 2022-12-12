import { GET_COUNTIES_LIST_FAIL, GET_COUNTIES_LIST_REQUEST, GET_COUNTIES_LIST_SUCCESS, GET_COUNTY_DETAILS_LIST_FAIL, GET_COUNTY_DETAILS_LIST_SUCCESS, GET_COUNTY_DETAILS_REQUEST, GET_STATES_LIST_FAIL, GET_STATES_LIST_REQUEST, GET_STATES_LIST_SUCCESS } from '../constants';


export function reducer(state, action) {
	switch (action.type) {
		case GET_STATES_LIST_REQUEST:
      return {
        ...state, 
        loadingStates: true 
      };
    case GET_STATES_LIST_SUCCESS:
      return {
        ...state,
        loadingStates: false,
        states: action.payload,
      };
    case GET_STATES_LIST_FAIL:
      return {
        ...state, 
        loadingStates: false, 
        errorStates: action.payload 
      };
      case GET_COUNTIES_LIST_REQUEST:
      return {
        ...state, 
         loadingCounties: true 
        };
    case GET_COUNTIES_LIST_SUCCESS:
      return {
        ...state,
        loadingCounties: false,
        counties: action.payload,
      };
    case GET_COUNTIES_LIST_FAIL:
      return {
        ...state, 
        loadingCounties: false, 
        errorCounty: action.payload 
      };
      case GET_COUNTY_DETAILS_REQUEST:
      return {
        ...state,
         loading: true 
        };
    case GET_COUNTY_DETAILS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        county: action.payload,
      };
    case GET_COUNTY_DETAILS_LIST_FAIL:
      return { 
        ...state,
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
}
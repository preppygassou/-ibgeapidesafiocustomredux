import  { createContext, useEffect, useReducer } from 'react';
import { GET_COUNTIES_LIST_FAIL, GET_COUNTIES_LIST_REQUEST, GET_COUNTIES_LIST_SUCCESS, GET_COUNTY_DETAILS_LIST_FAIL, GET_COUNTY_DETAILS_LIST_SUCCESS, GET_COUNTY_DETAILS_REQUEST, GET_STATES_LIST_FAIL, GET_STATES_LIST_REQUEST, GET_STATES_LIST_SUCCESS } from '../constants';
import api from '../services/api';
import {reducer} from '../reducers';


const Store = createContext();

//initialState
const initialState = {
  states:null,
  counties:null,
  county:null,
  loading: false,
  loadingCounties: false,
  loadingstates: false,
  error: false,
}

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Actions
  const getStatesLists = async () => {
    dispatch({
      type: GET_STATES_LIST_REQUEST,
    });
    try {
      const { data } = await api.get("/estados");
      dispatch({ type: GET_STATES_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type:  GET_STATES_LIST_FAIL, payload: error.message });
    }
  };
  
  const geCountiesListsByStateUF = async (Uf) => {
    dispatch({
      type: GET_COUNTIES_LIST_REQUEST,
    });
    try {
      const { data } = await api.get(`/estados/${Uf}/municipios`);
      dispatch({ type: GET_COUNTIES_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type:  GET_COUNTIES_LIST_FAIL, payload: error.message });
    }
  };
  
  const geCountydetails = async (countyId) => {
    dispatch({
      type: GET_COUNTY_DETAILS_REQUEST,
    });
    try {
      const { data } = await api.get(`/municipios/${countyId}/distritos`);
      dispatch({ type: GET_COUNTY_DETAILS_LIST_SUCCESS, payload: data[0] });
    } catch (error) {
      dispatch({ type:  GET_COUNTY_DETAILS_LIST_FAIL, payload: error.message });
    }
  };

  useEffect(() => {
    getStatesLists();
  }, [])
  

  const value = { 
    state, 
		dispatch, 
    geCountiesListsByStateUF,
    geCountydetails
  }

  return <Store.Provider value={value}>{props.children}</Store.Provider>;

}

export { Store, StoreProvider };
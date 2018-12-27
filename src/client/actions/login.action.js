import { userConstants } from '../constants/loginConstant';

import axios from 'axios';
import { alertActions } from './alert.action';

const apiUrl='http://localhost:8000/register'

// const login=(username, password)=> {
//     console.log("login details===>",username,password);

//     return dispatch => dispatch({
//         type:userConstants.LOGIN_REQUEST,
//         username,password

//     });
// }
const login =(username,password)=> {
    console.log("login client details===>",username,password);
    const credentials={username,password}
    return (dispatch) => {
        return axios.post(`${apiUrl}/api/login`,credentials)
        .then(res => {
            console.log(res.data)
            dispatch(alertActions.afterLoginData(res.data))
        })
        .then(() => {
            dispatch(alertActions.afterLogin())
        })
        .catch(err => {throw(err)} )
    }
}

// const googleLog_in=() => {
//     //console.log("yey");
//     return (dispatch)=> {
      
//     }
// }

 
const thunk_action_creator = (user) => {
    console.log('thunk action==',user)
    return (dispatch) => {
      return axios.post(`${apiUrl}/api/register`,user)
        .then(response => {
            //console.log("response data...",response.data)
            dispatch(register(response.data))
        })
         .then(()=>dispatch(alertActions.success('Registration successful'))) 
        .catch((err) => dispatch(alertActions.error('error or username exists.')));
    };
  };


 const register= user => ({
        type:userConstants.REGISTER_REQUEST,
        user
    });

const save_csv_data =(data) => {
    console.log('in action',data);
    return (dispatch) => {
        return axios.post(`${apiUrl}/api/saveCsvData`,data)
          .then(response => {
              console.log("response data...",response.data)
              
          })     
          .catch((err) => console.log(err));
      };
}

const delete_csv_record =(dataId) => {
    console.log('in action',dataId);
    return (dispatch) => {
        return axios.post(`${apiUrl}/api/csvdata/delete`,dataId)
          .then(response => {
              console.log(" delete response ...",response.data)
              dispatch(alertActions.deleteSuccess(response.data));
          })     
          .catch((err) => console.log(err));
      };
}



export const userActions = {
    login,
    register,
    thunk_action_creator,
    save_csv_data,
    delete_csv_record
    //googleLog_in
   
};
  




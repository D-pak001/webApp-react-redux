import { alertConstants } from '../constants/alertConstants';

//const initialState = []

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
      
      
    case alertConstants.loginSuccess:
       let isLogged = true
      return {
        ...state,
        isLogged
       
      }; 
    case alertConstants.LOGOUT:
    console.log("inside logout reduc")
    return {isLogged:false};

    case alertConstants.DeleteSuccess:
    console.log("inside reduc")
    return {
      type: 'alert-deleteSuccess',
      message: action.message
    };
    

    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}
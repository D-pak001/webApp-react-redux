import { userConstants } from '../constants/loginConstant';
import { alertConstants } from '../constants/alertConstants';

export function logins(state = [], action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    console.log(action.password);
      return {...state, 
          username:action.username,
          password:action.password,
          };

   case alertConstants.loginSuccessData:
      console.log("===login reduc",action.user)
      let user = action.user;
      return  [{
               ...state, 
                  user:user
              }];
       
    default:
      return state;
  }
}
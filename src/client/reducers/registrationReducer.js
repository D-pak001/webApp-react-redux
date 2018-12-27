import { userConstants } from '../constants/loginConstant';

export function registration(state = [], action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
        console.log("in reg reduc==",action.user)
      return [...state, 
        { user:action.user,registering: true }
      ];
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}
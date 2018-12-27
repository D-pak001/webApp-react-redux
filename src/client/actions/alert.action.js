import { alertConstants } from '../constants/alertConstants';

export const alertActions = {
    success,
    error,
    clear,
    afterLogin,
    afterLoginData,
    logout,
    deleteSuccess
};

function afterLogin() {
    return { 
        type:alertConstants.loginSuccess,
    };
}
function afterLoginData(user) {
    return { 
        type:alertConstants.loginSuccessData,
        user
    };
}
function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}
function logout() {
    
    return {type: alertConstants.LOGOUT}
}
function deleteSuccess(message) {
    
    return {type: alertConstants.DeleteSuccess,
        message
    }
}
function clear() {
    return { type: alertConstants.CLEAR };
}
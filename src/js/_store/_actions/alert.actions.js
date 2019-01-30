import { alertConstants } from '../_constants';

export const alertActions = {
  success,
  error,
  clear
};

const success = (message) => {
  return {
    type: alertConstants.SUCCESS,
    message: message
  };
}

const error = (message) => {
  return {
    type: alertConstants.ERROR,
    message:message
  };
}

const clear = () => {
  return {
    type: alertConstants.CLEAR
  };
}

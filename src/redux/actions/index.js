export const EMAIL_USER = 'EMAIL_USER';

export const API_STARTED = 'API_STARTED';
export const API_ACCEPTED = 'API_ACCEPTED';
export const API_REJECTED = 'API_REJECTED';
export const SUBMIT_DISPESA = 'SUBMIT_DISPESA';
export const DELETE_DISPESA = 'DELETE_DISPESA';

export const getEmail = (email) => ({
  type: EMAIL_USER,
  payload: email,
});

export const subimitDispesa = (currency) => ({
  type: SUBMIT_DISPESA,
  payload: currency,
});

export const apiStart = () => ({
  type: API_STARTED,
});

export const apiAccepted = (data) => (
  {
    type: API_ACCEPTED,
    payload: data,
  }
);

export const apiRejected = (error) => ({
  type: API_REJECTED,
  payload: error,
});

export const deleteDispesa = (idDispesa) => ({
  type: DELETE_DISPESA,
  payload: idDispesa,
});

export const fetchCurrency = () => (dispatch) => {
  dispatch(apiStart());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      dispatch(apiAccepted(data));
    })
    .catch((error) => apiRejected(error));
};

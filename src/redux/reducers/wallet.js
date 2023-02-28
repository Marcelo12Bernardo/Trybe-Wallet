import {
  SUBMIT_DISPESA,
  API_ACCEPTED,
  API_STARTED,
  DELETE_DISPESA,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_DISPESA:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
          exchangeRates: state.exchangeRates,
        },
      ],
    };
  case API_STARTED:
    return {
      ...state,
    };
  case API_ACCEPTED:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((key) => key !== 'USDT'),
      exchangeRates: action.payload,
    };
  case DELETE_DISPESA:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

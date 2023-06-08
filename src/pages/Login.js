import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, getEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      { [name]: value },
      this.validForm,
    );
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email,password  } = this.state;
    dispatch(getEmail({ email, password }));
    dispatch(fetchCurrency());
    return history.push('/Trybe-Wallet/carteira');
  };

  validForm = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/i;
    const minLength = 5;

    if (regex.test(email) && password.length > minLength) {
      this.setState({ isDisable: false });
      return;
    }
    this.setState({ isDisable: true });
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div>
        <h1> TELA DE LOGIN</h1>
        <input
          id="email"
          name="email"
          type="email"
          value={ email }
          placeholder="email"
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          id="password"
          name="password"
          type="password"
          value={ password }
          placeholder="senha"
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Login.defaultProps = {
  history: '',
  dispatch: '',
};

export default connect()(Login);

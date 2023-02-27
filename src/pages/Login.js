import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    return dispatch(getEmail(email));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validate);
  };

  validate = () => {
    const { email, password } = this.state;
    const minCharacter = 6;
    const passwordValidate = password.length >= minCharacter;
    const emailValidate = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(email);
    this.setState({ isDisabled: !(passwordValidate && emailValidate) });
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <from>
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </from>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   userEmail: state.user.email,
// });

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);

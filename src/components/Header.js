import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <section>
          <h3>Email:</h3>
          <p data-testid="email-field">{email}</p>
        </section>

        <section>
          <h3>Total de dispesas:</h3>
          <p data-testid="total-field">
            {
              expenses.length > 0
                ? (expenses.reduce((acc, expeMap) => acc + (Number(expeMap.value)
                * expeMap.exchangeRates[expeMap.currency].ask), 0).toFixed(2))
                : '0.00'
            }
          </p>
        </section>

        <section>
          <h3>Moeda utilizada:</h3>
          <p data-testid="header-currency-field">BRL</p>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);

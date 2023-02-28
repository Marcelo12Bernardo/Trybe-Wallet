import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteDispesa } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses
              && expenses.map((expeMap) => (
                <tr key={ expeMap.id }>
                  <td>{ expeMap.description }</td>
                  <td>{ expeMap.tag }</td>
                  <td>{ expeMap.method }</td>
                  <td>{ Number(expeMap.value).toFixed(2) }</td>
                  <td>{ expeMap.exchangeRates[expeMap.currency].name }</td>
                  <td>
                    { Number(expeMap.exchangeRates[expeMap.currency].ask).toFixed(2) }
                  </td>
                  <td>
                    { Number(expeMap.value * expeMap.exchangeRates[expeMap.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => {
                        dispatch(deleteDispesa(expeMap.id));
                      } }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(Table);

import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa se os elementos do <Header/> é renderizada corretamente', () => {
  beforeEach(() => {
    const initialEntries = ['/carteira'];
    const initialState = { user: { email: 'mbernardo12@gmail.com' } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
  });
  it('Testa se o email do usuário esta renderizado na tela', () => {
    const email = screen.getByText(/email: mbernardo12@gmail.com/i);

    expect(email).toBeInTheDocument();
  });
  it('Testa se o valor total começa com o valor: "0,00 BRL"', () => {
    const totalValue = screen.getByText(/0.00/i);
    const currency = screen.getByText(/BRL/i);

    expect(totalValue).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });

  // it('Testa se o valor total começa com o valor: "0,00 BRL"', () => {
  //   const totalValue = screen.getByText(/0.00/i);
  //   const currency = screen.getByText(/URL/i);

  //   expect(totalValue).toBeInTheDocument();
  //   expect(currency).toBeInTheDocument();
  // });
  // VERIFICAR ERRO
});

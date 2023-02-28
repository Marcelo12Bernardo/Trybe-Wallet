import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testar o componente  "<Login/>"', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  it('Testa se a tela <Login /> é renderizada', () => {
    const titleWallet = screen.getByRole('heading', { name: /Trybe Wallet/i, level: 1 });
    expect(titleWallet).toBeInTheDocument();
    expect(titleWallet).toHaveTextContent(/Trybe Wallet/i);
    screen.logTestingPlaygroundURL();
  });

  it('Testa se a tela <Login /> contém inputs corretos', () => {
    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
  });

  it('Testa se o botao é ativado apos preencher corretamente os campos', () => {
    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const btnElement = screen.getByRole('button', { name: /Entrar/i });
    expect(btnElement).toBeDisabled();

    const typeInputEmail = 'mbernardo12@gmail.com';
    const typeInputPassword = 'marcelo1234';
    userEvent.type(inputEmail, typeInputEmail);
    userEvent.type(inputPass, typeInputPassword);

    expect(btnElement).not.toBeDisabled();
  });

  it('Testa se apos clicar no botão redireciona para a página Wallet', () => {
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPass = screen.getByPlaceholderText(/Senha/i);
    const btnElement = screen.getByRole('button', { name: /Entrar/i });
    expect(btnElement).toBeDisabled();

    const typeInputEmail = 'mbernardo12@gmail.com';
    const typeInputPassword = 'marcelo1234';
    userEvent.type(inputEmail, typeInputEmail);
    userEvent.type(inputPass, typeInputPassword);

    userEvent.click(btnElement);
    const titleWallet = screen.getByRole('heading', { name: /TrybeWallet/i, level: 1 });
    expect(btnElement).not.toBeDisabled();
    expect(titleWallet).toBeInTheDocument();
    expect(titleWallet).toHaveTextContent(/TrybeWallet/i);
  });
});

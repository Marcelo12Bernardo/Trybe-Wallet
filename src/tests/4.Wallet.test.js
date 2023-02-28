import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const valueInput = 'value-input';

const inputList = [
  valueInput,
  'description-input',
  'currency-input',
  'method-input',
  'tag-input',
];

describe('Testar o componente <WalletForm/>', () => {
  beforeEach(() => {
    const initialEntries = ['/carteira'];
    const initialState = { user: { email: 'ambernardo12@gmail.com' } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se renderiza os inputs do formulário', () => {
    inputList.map((input) => expect(screen.getByTestId(input)).toBeInTheDocument());
  });

  it('Testa se renderiza o botão com o texto "Adicionar despesa"', () => {
    const btnElement = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveTextContent(/Adicionar despesa/i);
  });

  it('Testa se limpa os inputs de valor e descrição ', async () => {
    const inputValue = await screen.findByTestId(valueInput);
    const inputDescription = await screen.findByTestId('description-input');
    const btnElement = await screen.findByRole('button', { name: /Adicionar/i });

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'Dispesa teste');
    expect(inputValue).toHaveValue('10');
    expect(inputDescription).toHaveValue('Dispesa teste');

    userEvent.click(btnElement);

    await waitFor(() => {
      expect(inputValue).toHaveValue('');
      expect(inputDescription).toHaveValue('');
    });
  });

  it('muda o botão "Adicionar despesa" para "Editar despesa" após clicar em "Editar"', async () => {
    const btnAddExpense = await screen.findByRole('button', { name: /Adicionar despesa/i });
    expect(btnAddExpense).toBeInTheDocument();
    expect(btnAddExpense).toHaveTextContent('Adicionar despesa');

    userEvent.click(btnAddExpense);
    const btnEdit = await screen.findByTestId('edit-btn');
    userEvent.click(btnEdit);

    expect(btnEdit).toBeInTheDocument();
    expect(btnAddExpense).toHaveTextContent(/Editar/i);
  });

  it('Testa se atualiza o valor total após adicionar uma despesa', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockReturnValue(mockData),
    });

    const inputValue = await screen.findByTestId(valueInput);
    const btnElement = await screen.findByRole('button', { name: /Adicionar/i });
    const totalField = await screen.findByTestId('total-field');

    expect(totalField).toBeInTheDocument();
    userEvent.type(inputValue, '10');
    userEvent.click(btnElement);

    await waitFor(() => {
      expect(totalField).toHaveTextContent('47.53');
    });
  });
});

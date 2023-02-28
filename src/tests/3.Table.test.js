import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const tableHeaderNameList = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

describe('Testa o componente <Table />', () => {
  beforeEach(() => {
    const initialEntries = ['/carteira'];
    const initialState = { user: { email: 'ambernardo12@gmail.com' } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
  });

  it('Testa se ao clicar no botão renderiza uma tabela com dois botões', async () => {
    const addExpenseBtn = await screen.findByRole('button', { name: /Adicionar/i });
    userEvent.click(addExpenseBtn);

    const editBtn = await screen.findByTestId('edit-btn');
    const delBtn = await screen.findByTestId('delete-btn');

    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent(/Editar/i);
    expect(delBtn).toBeInTheDocument();
    expect(delBtn).toHaveTextContent(/Excluir/i);

    screen.logTestingPlaygroundURL();
  });
  it('Testa se os textos do header da tabela estão sendo renderizados corretamente', async () => {
    const addExpenseBtn = await screen.findByRole('button', { name: /Adicionar/i });
    userEvent.click(addExpenseBtn);

    tableHeaderNameList.forEach((name) => {
      const nameList = screen.getByRole('columnheader', { name });

      expect(nameList).toBeInTheDocument();
      expect(nameList).toHaveTextContent(name);
    });
  });
  it('Testa se a "Moeda de conversão" é sempre em "Real/BRL"', async () => {
    const addExpenseBtn = await screen.findByRole('button', { name: /Adicionar/i });
    userEvent.click(addExpenseBtn);

    const convertedValue = await screen.findByRole('cell', { name: 'Real' });

    expect(convertedValue).toBeInTheDocument();
    expect(convertedValue).toHaveTextContent('Real');
  });
  it('Testa se o botão "Excluir" está funcionando', async () => {
    const addExpenseBtn = await screen.findByRole('button', { name: /Adicionar/i });
    userEvent.click(addExpenseBtn);

    const convertedValue = await screen.findByRole('cell', { name: 'Real' });
    const delBtn = await screen.findByRole('button', { name: /Excluir/i });

    expect(convertedValue).toBeInTheDocument();
    expect(delBtn).toBeInTheDocument();
    userEvent.click(delBtn);

    await waitFor(() => {
      expect(convertedValue).toHaveTextContent(/real/i);
    });
  });
  it('Testa se o botão "Editar" está funcionando', async () => {
    const btnExpense = await screen.findByRole('button', { name: /Adicionar/i });
    expect(btnExpense).toHaveTextContent(/Adicionar/i);
    userEvent.click(btnExpense);

    const editBtn = await screen.findByRole('button', { name: /Editar/i });
    userEvent.click(editBtn);

    const inputDescription = await screen.findByTestId('description-input');
    const inputValue = await screen.findByTestId('value-input');
    userEvent.type(inputDescription, 'Test');
    userEvent.type(inputValue, '10');

    const editBtnExpense = await screen.findByRole('button', { name: /Editar despesa/i });
    expect(editBtnExpense).toHaveTextContent(/Editar despesa/i);
    userEvent.click(editBtnExpense);

    expect(inputDescription).toBeInTheDocument();
    expect(inputDescription).not.toHaveValue('Test');
    expect(inputValue).toBeInTheDocument();
    expect(inputValue).not.toHaveValue('10');
  });
});

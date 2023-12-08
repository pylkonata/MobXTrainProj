import { ITodo } from "./types";

const BASIC_URL = 'http://localhost:3000';

export const addTodo = async (todo: ITodo) => {
  const response = await fetch(`${BASIC_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw Error("Something went wrong... Error!");
  return await response.json();
}
export const getTodos = async () => {
  const response = await fetch(`${BASIC_URL}/todos`);
  if (!response.ok) throw Error("Something went wrong... Error!");
  return await response.json();
};

export const changeTodoStatus = async (id: number, completed: boolean) => {
  const response = await fetch(`${BASIC_URL}/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw Error("Something went wrong... Error!");
  return await response.json();
}

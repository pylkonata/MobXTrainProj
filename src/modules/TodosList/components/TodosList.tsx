import { useQuery } from 'react-query';

import { ITodo } from '../types';
import { getTodos } from '../services';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import { List } from '@mui/material';

const TodosList = () => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  })

  if (todosQuery.status === "loading") return <h1>Loading...</h1>
  if (todosQuery.status === "error") {
    return <h1>{JSON.stringify(todosQuery.error)}</h1>
  }

  return (
    <>
      <AddTodo />
      <List sx={{ width: '100%', maxWidth: '75%', bgcolor: 'background.paper' }}>
        {todosQuery.data.map((todo: ITodo) => {
          return (
            <TodoItem key={todo.id} todo={todo} />
          );
        })}
      </List>
    </>
  )
}

export default TodosList;

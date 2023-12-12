import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { blue } from '@mui/material/colors';
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { ITodo } from '../types';
import { changeTodoStatus } from '../services';
type TodoItemProps = {
  todo: ITodo,
}
const TodoItem = ({ todo }: TodoItemProps) => {
  const client = useQueryClient();
  const labelId = useMemo(() => {
    return `checkbox-list-label-${todo.id}`
  }, [todo.id]);

  const { mutate: toggle } = useMutation({
    mutationFn: () => changeTodoStatus(todo.id, !todo.completed),
    onSuccess: (data) => {
      client.setQueryData(["todos", data.id], data),
        client.invalidateQueries(["todos"])
    },
  });
  return (
    <ListItem
      key={todo.id}
      disablePadding
      sx={{
        '&:hover': {
          backgroundColor: blue[50],
        }
      }}
    >
      <ListItemButton role={undefined} onClick={() => toggle()} dense>
        <ListItemIcon >
          <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            color="secondary"
            sx={{
              color: blue[200],
              '&.Mui-checked': {
                color: blue[600],
              },
            }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.title} />
      </ListItemButton>
    </ListItem>
  )
}

export default TodoItem;

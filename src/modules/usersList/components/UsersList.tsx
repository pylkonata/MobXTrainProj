import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useUsersStore } from '../storeZustand';
const UsersList = () => {
  const users = useUsersStore(state => state.users);
  const fetchUsers = useUsersStore(state => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <Grid container spacing={2} sx={{ p: '2rem', flexDirection: 'column' }}>
      {
        users.length === 0 ? 'Loading' :
        (users.map(user => {
          return (
            <li key={user.id} style={{listStyle: 'none'}}>{`${user.id}: ${user.name}`}</li>
          )
        }))
      }
    </Grid>
  )
}

export default UsersList;

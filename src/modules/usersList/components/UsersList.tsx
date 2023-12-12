import { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useUsersStore } from '../storeZustand';
import { user } from '../../../mock-data';
const UsersList = () => {
  const users = useUsersStore(state => state.users);
  const fetchUsers = useUsersStore(state => state.fetchUsers);
  // const addUser = useUsersStore(state => state.addUser);
  const postNewUser = useUsersStore(state => state.postUserRequest);
  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ maxWidth: '450px', p: '2rem', flexDirection: 'column' }}>
        {
          users.length === 0 ? 'Loading' :
            (users.map(user => {
              return (
                <li key={user.id} style={{ listStyle: 'none' }}>{`${user.id}: ${user.name}`}</li>
              )
            }))
        }
        <Button
          variant="text"
          size="small"
          onClick={() => postNewUser(user)}
        >
          Add new user
        </Button>
      </Grid>
    </>
  )
}

export default UsersList;

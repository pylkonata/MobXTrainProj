import { useEffect, useRef } from 'react';
import { Button, Grid } from '@mui/material';
import { useUsersStore } from '../storeZustand';
import { user } from '../../../mock-data';
const UsersList = () => {
  const users = useUsersStore(state => state.users);
  const fetchUsers = useUsersStore(state => state.fetchUsers);
  // const addUser = useUsersStore(state => state.addUser);
  const postNewUser = useUsersStore(state => state.postUserRequest);
  const initial = useRef(false);
  useEffect(() => {
    if (!initial.current) {
      fetchUsers();
      initial.current = true;
    }
  }, [])

  return (
    <>
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
      <Button
        variant="text"
        size="small"
        onClick={()=>postNewUser(user)}
      >
        Add new user
      </Button>
    </>
  )
}

export default UsersList;

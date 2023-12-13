import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Alert, AlertTitle, Button, MenuItem, Snackbar, TextField, Typography } from '@mui/material';

import { UserType } from '../types';
import { useUsersStore } from '../storeZustand';

type UserState = Omit<UserType, 'key' | 'id'>;

const AddUser = () => {
  const [user, setUser] = useState<UserState>({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    address: '',
    company: '',
  });
  const [disabledButton, setDisabledButton] = useState(true);
  const [successResponse, setSuccessResponse] = useState(false);
  const postNewUser = useUsersStore(state => state.postUserRequest);
  const validateUserInput = (user: UserState) => {
    if (user.first_name && user.last_name && user.email && user.gender && user.address && user.company) {
      setDisabledButton(false);
      return;
    }
    setDisabledButton(true);
  };

  useEffect(() => {
    validateUserInput(user);
  }, [user])

  const onChangeUserValue = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target) {
      const { name, value } = e.target;
      setUser(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postNewUser({
      id: Date.now(),
      key: String(Date.now()),
      ...user
    });

    setUser(prev => ({
      ...prev,
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      address: '',
      company: '',
    }));
    setSuccessResponse(true);
  };


  return (
    <>
      <form
        style={{ maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={onSubmit}
      >
        <Typography variant="h3" component="h2">New User</Typography>
        <TextField label='First name' value={user.first_name} name='first_name' onChange={onChangeUserValue} />
        <TextField label='Last name' value={user.last_name} name='last_name' onChange={onChangeUserValue} />
        <TextField label='Email' value={user.email} name='email' onChange={onChangeUserValue} type='email' />
        <TextField
          select
          label="Gender"
          value={user.gender}
          name='gender'
          onChange={onChangeUserValue}
        >
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
        </TextField>
        <TextField label='City' value={user.address} name='address' onChange={onChangeUserValue} />
        <TextField label='Company' value={user.company} name='company' onChange={onChangeUserValue} />
        <Button variant="text"
          size="small"
          type='submit'
          disabled={disabledButton}
        >
          Add new user
        </Button>
      </form>
      <Snackbar
        open={successResponse}
        autoHideDuration={5000}
        onClose={() => setSuccessResponse(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
          the user was added!
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddUser;

import { useEffect } from 'react';
import { useUsersStore } from '../storeZustand';

import UsersTable from './UsersTable';

const UsersComponent = () => {
  const users = useUsersStore(state => state.users);
  const fetchUsers = useUsersStore(state => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      {
        users.length === 0 ? 'Loading' :
          <UsersTable />
      }
    </>
  )
}

export default UsersComponent;

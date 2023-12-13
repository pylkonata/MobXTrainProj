import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useUsersStore } from '../storeZustand';
import { UserType } from '../types';

const columns: ColumnsType<UserType> = [
  {
    key: 'first_name',
    title: 'First Name',
    dataIndex: 'first_name',
    sorter: (a, b) => a.first_name.localeCompare(b.first_name),
  },
  {
    key: 'last_name',
    title: 'Last Name',
    dataIndex: 'last_name',
    sorter: (a, b) => a.last_name.localeCompare(b.last_name),
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    key: 'gender',
    title: 'Gender',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.localeCompare(b.gender),
  },
  {
    key: 'address',
    title: 'City',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    key: 'company',
    title: 'Company',
    dataIndex: 'company',
    sorter: (a, b) => a.company.localeCompare(b.company),
  },
];
const UsersTable = () => {
  const users = useUsersStore(state => state.users);


  return (
    <Table dataSource={users} columns={columns} />
  )
}

export default UsersTable

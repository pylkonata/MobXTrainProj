import { create } from 'zustand';
import { UserType } from './types';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { BASIC_URL } from '../../constants';
type Store = {
  users: UserType[],
  addUser: (user: UserType) => void,
  fetchUsers: () => void,
  postUserRequest: (user: UserType) => void
}

export const useUsersStore = create<Store>()(
  immer(
    devtools(
      (set) => ({
        users: [],
        addUser: (user: UserType) => set(state => {
          state.users.push(user);
        }),
        fetchUsers: async () => {
          try {
            const response = await fetch(`${BASIC_URL}/users`);
            const data: UserType[] = await response.json();
            set({ users: data });
          } catch (error) {
            console.log(error);
          }
        },
        postUserRequest: async (user: UserType) => {
          try {
            const response = await fetch(`${BASIC_URL}/users`, {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
            const data: UserType = await response.json();
            set(state => {
              state.users.push(data);
            })
          } catch (err) {
            console.log(err);
          }
        },
      }))))

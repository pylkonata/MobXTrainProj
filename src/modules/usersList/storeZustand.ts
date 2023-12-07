import { create } from 'zustand';
import { IUser } from './types';
import { devtools} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
type Store = {
  users: IUser[],
  addUser: (user: IUser) => void,
  fetchUsers: () => void,
  postUserRequest: (user: IUser) => void
}

export const useUsersStore = create<Store>()(
  immer(
  devtools(
  (set) => ({
    users: [],
    addUser: (user: IUser) => set(state => {
      state.users.push(user);
    }),
    fetchUsers: async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: IUser[] = await response.json();
        set({ users: data });      
      } catch (error) {
        console.log(error);
      }
    },
    postUserRequest: async (user: IUser) => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const data: IUser = await response.json();
        set(state => {
          state.users.push(data);
        })        
      } catch (err) {
        console.log(err);
      }
    },
}))))

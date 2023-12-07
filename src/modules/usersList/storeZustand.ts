import { create } from 'zustand';
import { IUser } from './types';
type Store = {
  users: IUser[],
  fetchUsers: () => void,
}

export const useUsersStore = create<Store>()((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: IUser[] = await response.json();
      set({ users: data });      
    } catch (error) {
      console.log(error);
    }
  }
}))

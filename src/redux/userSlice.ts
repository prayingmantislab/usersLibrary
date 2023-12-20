import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../App';
interface UserState {
  users: User[] | null;
}

const initialState: UserState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users?.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index) {
        state.users?.splice(index, 1, action.payload);
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      if (state.users) {
        state.users = state.users.filter(
          (user) => user.id.toString() !== action.payload
        );
      }
    },
  },
});

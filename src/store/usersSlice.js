import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiUsers: [],
  localUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setApiUsers: (state, action) => {
      state.apiUsers = action.payload;
    },

    addUser: (state, action) => {
      state.loaclUsers.unshift(action.payload);
    },
    updateUser: (state, action) => {
      const { id, data } = action.payload;
      state.apiUsers = state.apiUsers.map((u) =>
        u.id === id ? { ...u, ...data } : u
      );
      state.loaclUsers = state.loaclUsers.map((u) =>
        u.id === id ? { ...u, ...data } : u
      );
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.apiUsers = state.apiUsers.filter((u) => u.id !== id);
      state.loaclUsers = state.loaclUsers.filter((u) => u.id !== id);
    },
  },
});

export const { setApiUsers, addUser, updateUser, deleteUser } =
  usersSlice.actions;
export default usersSlice.reducer;

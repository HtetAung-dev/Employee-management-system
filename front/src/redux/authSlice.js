import { createSlice } from '@reduxjs/toolkit';

// Get token from localStorage (optional: you can persist token between sessions)
const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: initialToken || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save token to localStorage for persistence
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove token from localStorage on logout
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

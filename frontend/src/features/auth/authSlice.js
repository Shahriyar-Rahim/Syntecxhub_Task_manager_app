import { createSlice } from '@reduxjs/toolkit';

// Helper to safely parse user from localStorage on initial load
const getStoredUser = () => {
  const user = localStorage.getItem('user');
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: getStoredUser(), 
    token: localStorage.getItem('token') || null 
  },
  reducers: {
    setCredentials: (state, action) => {
  // Debug: Log the payload to see exactly where the token is
  // console.log("Login Payload:", action.payload);

  // Adjust these lines based on your actual backend response structure
  const user = action.payload.user || action.payload; 
  const token = action.payload.token || (action.payload.user && action.payload.user.token);

  if (token) {
    state.user = user;
    state.token = token;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  } else {
    console.error("Token not found in payload!");
  }
},
    logOut: (state) => {
      state.user = null;
      state.token = null;
      
      // Clear persistence
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
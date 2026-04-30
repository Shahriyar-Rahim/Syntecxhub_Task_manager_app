import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    // 🛡️ Ensure we are grabbing the token from the 'auth' slice
    const token = getState().auth.token || localStorage.getItem('token');
    
    if (token && token !== 'undefined') {
      headers.set('authorization', `Bearer ${token}`);
      // console.log("Header Set with Token:", token.substring(0, 10) + "...");
    } else {
      console.warn("No token found in state or localStorage for request");
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Task', 'User'], // Helps with automated UI refreshing
  endpoints: (builder) => ({}),
});
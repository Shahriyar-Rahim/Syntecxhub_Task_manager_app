import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  // ADD THIS LINE to send cookies with every request
  credentials: 'include', 
  prepareHeaders: (headers, { getState }) => {
    // 1. Try to get token from Redux state first
    // 2. Fallback to localStorage if state is re-hydrating
    const token = getState().auth.token || localStorage.getItem('token');
    
    if (token && token !== 'undefined') {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Task', 'User'], // Helps with automated UI refreshing
  endpoints: (builder) => ({}),
});
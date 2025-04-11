import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/config/api';
interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}
interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  dob: string;
  avatar?: File | null;
}
const initialState: AuthState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
};


// Thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', credentials); 
      return res.data; // { user, token }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Login failed');
    }
  }
);
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: RegisterPayload, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('email', payload.email);
      formData.append('password', payload.password);
      formData.append('username', payload.username);
      formData.append('dob', payload.dob);
      if (payload.avatar) {
        formData.append('avatar', payload.avatar);
      }

      const res = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data; // optional, based on backend response
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setAuthFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
          state.user = JSON.parse(storedUser);
          state.token = storedToken;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      // You can optionally set user/token here if your backend returns them
      // Example:
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", action.payload.token);
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout , setAuthFromStorage} = authSlice.actions;
export default authSlice.reducer;
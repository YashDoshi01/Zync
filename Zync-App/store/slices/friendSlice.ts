import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/config/api';
import { RootState } from '../index';

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: 'PENDING' | 'ACCEPTED';
}

interface FriendState {
  friendList: Friend[];
  pendingRequests: Friend[];
  loading: boolean;
  error: string | null;
}

const initialState: FriendState = {
  friendList: [],
  pendingRequests: [],
  loading: false,
  error: null,
};
const token = localStorage.getItem('token');
// ✅ Send Friend Request
export const sendFriendRequest = createAsyncThunk(
  'friends/sendRequest',
  async (friendId: string, thunkAPI) => {
    try {
      const res = await api.post('/friends/add', { friendId }, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return res.data.request as Friend;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to send request');
    }
  }
);

// ✅ Get Friend List
export const getFriends = createAsyncThunk(
  'friends/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/friends', {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return res.data.friends as Friend[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch friends');
    }
  }
);

// ✅ Get Pending Friend Requests
export const getPendingRequests = createAsyncThunk(
  'friends/getRequests',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/friends/requests', {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return res.data.requests as Friend[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch requests');
    }
  }
);

// ✅ Accept Friend Request
export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptRequest',
  async (requestId: string, thunkAPI) => {
    try {
      const res = await api.patch(`/friends/accept/${requestId}`, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return res.data.friend as Friend;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to accept request');
    }
  }
);

// ✅ Remove Friend
export const removeFriend = createAsyncThunk(
  'friends/remove',
  async (friendId: string, thunkAPI) => {
    try {
      await api.delete(`/friends/remove/${friendId}`, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return friendId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to remove friend');
    }
  }
);

// ✅ Slice
const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    resetFriendError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // SEND REQUEST
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests.push(action.payload); // optional
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET FRIENDS
      .addCase(getFriends.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friendList = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET PENDING
      .addCase(getPendingRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = action.payload;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ACCEPT REQUEST
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friendList.push(action.payload);
        // remove from pending
        state.pendingRequests = state.pendingRequests.filter(
          (req) => req.id !== action.payload.id
        );
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REMOVE FRIEND
      .addCase(removeFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.friendList = state.friendList.filter(
          (f) => f.friendId !== action.payload && f.userId !== action.payload
        );
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFriendError } = friendSlice.actions;

export default friendSlice.reducer;

// Selectors (Optional)
export const selectFriendList = (state: RootState) => state.friends.friendList;
export const selectPendingRequests = (state: RootState) => state.friends.pendingRequests;
export const selectFriendLoading = (state: RootState) => state.friends.loading;
export const selectFriendError = (state: RootState) => state.friends.error;

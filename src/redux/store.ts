import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import friendReucer from './slices/friends-slice';
import nonFriendReducer from './slices/non-friends-slice';
import friendRequestReducer from './slices/friend-requests-slice';
import sentRequestReducer from './slices/sent-requests-slice';
import recentChatReducer from './slices/recent-chat-slice';
import socketReducer from './slices/socket';

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendReucer,
    nonFriends: nonFriendReducer,
    friendRequests: friendRequestReducer,
    sentRequests: sentRequestReducer,
    recentChat: recentChatReducer,
    socket: socketReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



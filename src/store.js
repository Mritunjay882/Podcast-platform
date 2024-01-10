import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import podcastReducer from './slices/podcastSlice'
export const store = configureStore({
  reducer: {
    user:userReducer,
      podcast:podcastReducer,
    // episode:episodeReducer,
  },
});
export default store;
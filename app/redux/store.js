import { configureStore } from '@reduxjs/toolkit';
import promptsSlice from './features/promptsSlice';
import userSlice from './features/userSlice';

const albumStore = configureStore({
	reducer: {
		promptsList: promptsSlice,
		userProfile: userSlice,
	},
});

export default albumStore;

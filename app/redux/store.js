import { configureStore } from '@reduxjs/toolkit';
import promptsSlice from './features/promptsSlice';
import userSlice from './features/userSlice';
import tagsSlice from './features/tagsSlice';

const albumStore = configureStore({
	reducer: {
		promptsList: promptsSlice,
		tagsList: tagsSlice,
		userProfile: userSlice,
	},
});

export default albumStore;

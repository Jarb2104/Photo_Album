import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	status: 'idle',
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserById(state, action) {
			//should call api to get the user by userID
			state = initialState;
		},
	},
});

export const { getUserById } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: { name: 'UserProfile' },
	status: 'idle',
	error: null,
};

export const getUserById = createAsyncThunk('userProfile/getUserById', async (userId) => {
	const response = await fetch(`api/users/${userId}`);
	const data = await response.json();
	return data;
});

const userSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUserById.fulfilled, (state, action) => {
				state.status = 'completed';
				state.user = action.payload;
			})
			.addCase(getUserById.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;

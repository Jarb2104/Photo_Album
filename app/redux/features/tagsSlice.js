import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	tags: [],
	status: 'idle',
	error: null,
};

export const fetchTags = createAsyncThunk('tagsList/fetchTags', async () => {
	const response = await fetch('/api/tags');
	const data = await response.json();
	console.log(data);
	return data;
});

const tagsSlice = createSlice({
	name: 'tagsList',
	initialState,
	reducers: {},

	extraReducers(builder) {
		builder
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.status = 'completed';
				state.tags = action.payload;
			})
			.addCase(fetchTags.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export default tagsSlice.reducer;

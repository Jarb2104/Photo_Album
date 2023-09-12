import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	prompts: [],
	status: 'idle',
	error: null,
};

export const fetchPrompts = createAsyncThunk('promptsList/fetchPrompts', async () => {
	const response = await fetch('/api/prompt');
	const data = await response.json();
	return data;
});

export const addNewPrompt = createAsyncThunk('promptsList/addNewPrompt', async (newPrompt) => {
	const response = await fetch('api/prompt/new', {
		method: 'POST',
		body: JSON.stringify(newPrompt),
	});
	const data = await response.json();
	return data;
});

export const updatePrompt = createAsyncThunk('promptsList/updatePrompt', async (changedPrompt) => {
	const response = await fetch(`api/prompt/${changedPrompt.promptId}`, {
		method: 'PATCH',
		body: JSON.stringify(changedPrompt.newValues),
	});
	const data = await response.json();
	return data;
});

export const deletePrompt = createAsyncThunk('promptsList/deletePrompt', async (promptId) => {
	const response = await fetch(`api/prompt/${promptId}`, { method: 'DELETE' });
	const data = await response.json();
	return data;
});

const promptsSlice = createSlice({
	name: 'promptsList',
	initialState,
	reducers: {},

	extraReducers(builder) {
		builder
			.addCase(fetchPrompts.fulfilled, (state, action) => {
				state.status = 'completed';
				state.prompts = action.payload;
			})
			.addCase(fetchPrompts.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(addNewPrompt.fulfilled, (state, action) => {
				state.prompts.push(action.payload);
			})
			.addCase(addNewPrompt.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(updatePrompt.fulfilled, (state, action) => {
				const updatedPrompt = state.prompts.find((pr) => pr.id === action.payload.id);
				updatedPrompt.prompt = action.payload.prompt;
				updatedPrompt.imgUrl = action.payload.imgUrl;
				updatedPrompt.tags = action.payload.tags;
			})
			.addCase(updatePrompt.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(deletePrompt.fulfilled, (state, action) => {
				state.prompts.splice(
					state.prompts.findIndex((pr) => pr.id === action.payload.id),
					1
				);
			})
			.addCase(deletePrompt.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export const selectPromptById = (state, promptId) => state.promptsList.prompts.find((pr) => pr.id === promptId);
export const selectPromptsByUserId = (state, userId) => state.promptsList.prompts.filter((pr) => pr.userId === userId);

export default promptsSlice.reducer;

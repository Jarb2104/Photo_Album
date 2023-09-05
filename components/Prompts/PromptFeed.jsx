'use client';

import { useEffect, useState } from 'react';
import PromptCardList from './PromptCardList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrompts } from '@app/redux/features/promptsSlice';

const PromptFeed = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [filteredPrompts, setFilteredPrompts] = useState([]);
	const fetchedPrompts = useSelector((state) => state.promptsList.prompts);
	const promptApiCallStatus = useSelector((state) => state.promptsList.status);

	const filterSearch = () => {
		const pattern = new RegExp(`.*${searchText}.*`);
		setFilteredPrompts(fetchedPrompts.filter((pr) => pattern.test(pr.user.name) || pattern.test(pr.prompt) || pr.tags.some((t) => pattern.test(t.tag))));
	};

	const handleSearch = (e) => {
		setSearchText(e.target.value);
		filterSearch();
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);
		filterSearch();
	};

	useEffect(() => {
		if (promptApiCallStatus === 'idle') dispatch(fetchPrompts());
		filterSearch();
	}, [promptApiCallStatus]);

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='search for a tag or a user name'
					value={searchText}
					onChange={handleSearch}
					required
					className='search_input peer'
				></input>
			</form>

			<PromptCardList
				fetchedPrompts={filteredPrompts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default PromptFeed;

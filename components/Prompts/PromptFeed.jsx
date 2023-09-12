'use client';

import { useEffect, useState } from 'react';
import PromptCardList from './PromptCardList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrompts } from '@app/redux/features/promptsSlice';
import TagList from '@components/MostUsedTags/TagList';
import { fetchTags } from '@app/redux/features/tagsSlice';

const PromptFeed = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [filteredPrompts, setFilteredPrompts] = useState([]);
	const fetchedPrompts = useSelector((state) => state.promptsList.prompts);
	const promptApiCallStatus = useSelector((state) => state.promptsList.status);
	const tagList = useSelector((state) => state.tagsList.tags);
	const tagApiCallStatus = useSelector((state) => state.promptsList.status);

	const filterSearch = () => {
		const pattern = new RegExp(`.*${searchText}.*`);
		setFilteredPrompts(fetchedPrompts.filter((pr) => pattern.test(pr.user.name) || pattern.test(pr.prompt) || pr.tags.some((t) => pattern.test(t.tag))));
	};

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);
	};

	useEffect(() => {
		if (promptApiCallStatus === 'idle') dispatch(fetchPrompts());
		if (tagApiCallStatus === 'idle') dispatch(fetchTags());
		filterSearch();
	}, [fetchedPrompts, promptApiCallStatus, searchText]);

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
			<div className='gap-5 outline_btn whitespace-nowrap'>
				<label>{'Popular Tags! =>'}</label>
				<TagList
					tagData={tagList.slice(0, 9)}
					lstClassName='flex gap-2'
					btnClassName='purple_btn'
					handleListTagClick={handleTagClick}
				/>
			</div>
			<PromptCardList
				fetchedPrompts={filteredPrompts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default PromptFeed;

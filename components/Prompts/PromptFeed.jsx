'use client';

import { useEffect, useState } from 'react';
import PromptCardList from './PromptCardList';

const PromptFeed = () => {
	const [searchText, setSearchText] = useState('');
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	const filterPosts = (filterText) => {
		const pattern = new RegExp(`.*${filterText}.*`);
		const filteredPosts = fetchedPosts.filter((post) => pattern.test(post.user.name) || pattern.test(post.prompt) || post.tags.some((t) => pattern.test(t.tag)));
		setFilteredPosts(filteredPosts);
	};

	const handleSearch = (e) => {
		setSearchText(e.target.value);
		filterPosts(e.target.value);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);
		filterPosts(tagName);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();
			setFetchedPosts(data);
			setFilteredPosts(data);
		};

		fetchPosts();
	}, []);

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
				fetchedPrompts={filteredPosts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default PromptFeed;

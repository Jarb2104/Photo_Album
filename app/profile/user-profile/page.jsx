'use client';
import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
	const searchParams = useSearchParams();
	const userId = searchParams.get('id');

	const [fetchedPosts, setFetchedPosts] = useState([]);
	const [user, setUser] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`../api/users/${userId}/posts`);
			const data = await response.json();
			console.log(data);
			setFetchedPosts(data);
		};

		const fetchUser = async () => {
			const response = await fetch(`../api/users/${userId}`);
			const data = await response.json();
			console.log(data);
			setUser(data);
		};

		if (userId) {
			fetchPosts();
			fetchUser();
		}
	}, []);

	return (
		<Profile
			name={user.name}
			desc={`Look at these posts from ${user.name}, let them drive your curiosity and imagination...`}
			fetchedPosts={fetchedPosts}
		/>
	);
};

export default ProfilePage;

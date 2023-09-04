'use client';
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
	const { data: session } = useSession();
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const router = useRouter();

	const handleChange = (prompt) => {
		router.push(`/update-prompt?id=${prompt.id}`);
	};
	const handleDelete = async (promptId) => {
		const hasConfirmed = confirm('Are you sure you want to delete your prompt?');
		if (hasConfirmed) {
			try {
				const filteredPosts = fetchedPosts.filter((post) => post.id !== promptId);
				await fetch(`api/prompt/${promptId}`, { method: 'DELETE' });

				setFetchedPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`api/users/${session?.user.id}/posts`);
			const data = await response.json();
			console.log(data);
			setFetchedPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, []);

	return (
		<Profile
			name='My'
			desc='Here is your profile and of course your amazing image prompts'
			fetchedPosts={fetchedPosts}
			handleChange={handleChange}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;

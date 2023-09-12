'use client';
import Profile from '@components/Profile';
import { deletePrompt, selectPromptsByUserId } from '@app/redux/features/promptsSlice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { getUserById } from '@app/redux/features/userSlice';
import { fetchTags } from '@app/redux/features/tagsSlice';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();
	const userId = searchParams.get('id');

	const { data: session } = useSession();

	const fetchedPosts = [...useSelector((state) => selectPromptsByUserId(state, userId))];
	const userProfile = useSelector((state) => state.userProfile.user);

	const handleChange = (prompt) => {
		router.push(`/update-prompt?id=${prompt.id}`);
	};

	const handleDelete = (promptId) => {
		const hasConfirmed = confirm('Are you sure you want to delete your prompt?');
		if (hasConfirmed) {
			try {
				dispatch(deletePrompt(promptId));
				dispatch(fetchTags());
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		if (userId) {
			dispatch(getUserById(userId));
		}
	}, [userId]);

	return (
		<Profile
			name={session?.user.id === userId ? 'My' : userProfile.name}
			desc={session?.user.id === userId ? 'Here is your profile and of course your amazing image prompts' : `Look at these posts from ${userProfile.name}, let them drive your curiosity and imagination...`}
			fetchedPosts={fetchedPosts}
			handleChange={handleChange}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;

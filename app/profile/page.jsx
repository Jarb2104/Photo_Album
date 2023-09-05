'use client';
import { deletePrompt, selectPromptsByUserId } from '@app/redux/features/promptsSlice';
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { data: session } = useSession();
	const fetchedPosts = useSelector((state) => selectPromptsByUserId(state, session?.user.id));

	const handleChange = (prompt) => {
		router.push(`/update-prompt?id=${prompt.id}`);
	};

	const handleDelete = async (promptId) => {
		const hasConfirmed = confirm('Are you sure you want to delete your prompt?');
		if (hasConfirmed) {
			try {
				await dispatch(deletePrompt(promptId)).unwrap();
			} catch (error) {
				console.log(error);
			}
		}
	};

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

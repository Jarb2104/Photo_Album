'use client';
import { selectPromptsByUserId } from '@app/redux/features/promptsSlice';
import { getUserById } from '@app/redux/features/userSlice';
import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const userId = searchParams.get('id');
	const fetchedPrompts = useSelector((state) => selectPromptsByUserId(state, userId));
	const fetchedUser = useSelector((state) => state.userProfile.user);

	const [user, setUser] = useState([]);

	useEffect(() => {
		if (userId) {
			dispatch(getUserById(userId));
			setUser(fetchedUser);
		}
	}, [userId]);

	return (
		<Profile
			name={user.name}
			desc={`Look at these posts from ${user.name}, let them drive your curiosity and imagination...`}
			fetchedPosts={fetchedPrompts}
		/>
	);
};

export default ProfilePage;

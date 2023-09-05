'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPrompt } from '@app/redux/features/promptsSlice';

const CreatePrompt = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { data: session } = useSession();

	const [submitting, setSubmitting] = useState(false);
	const [userPost, setUserPost] = useState({ prompt: '', imgUrl: '', tags: '' });

	const createNewPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const newPrompt = {
				prompt: userPost.prompt,
				userId: session?.user.id,
				tags: userPost.tags,
				imgUrl: userPost.imgUrl,
			};

			await dispatch(addNewPrompt(newPrompt)).unwrap();
			router.push('/');
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type='Create'
			post={userPost}
			setPost={setUserPost}
			submitting={submitting}
			handleSubmit={createNewPrompt}
		/>
	);
};

export default CreatePrompt;

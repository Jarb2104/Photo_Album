'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { useState } from 'react';

const CreatePrompt = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setSubmitting] = useState(false);
	const [userPost, setUserPost] = useState({ prompt: '', imgUrl: '', tag: '' });

	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const newPrompt = { prompt: userPost.prompt, userId: session?.user.id, tag: userPost.tag, imgUrl: userPost.imgUrl };
			const response = await fetch('api/prompt/new', {
				method: 'POST',
				body: JSON.stringify(newPrompt),
			});

			if (response.ok) {
				router.push('/');
			}
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
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;

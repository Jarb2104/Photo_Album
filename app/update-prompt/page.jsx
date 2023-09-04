'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { useEffect, useState } from 'react';

const EditPrompt = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');
	const [submitting, setSubmitting] = useState(false);
	const [userPost, setUserPost] = useState({ prompt: '', imgUrl: '', tag: '' });

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`api/prompt/${promptId}`);
			const promptData = await response.json();

			setUserPost({
				prompt: promptData.prompt,
				tag: promptData.tag,
				imgUrl: promptData.imgUrl,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert('Unable to find modified prompt');

		try {
			const changedPrompt = { prompt: userPost.prompt, tag: userPost.tag, imgUrl: userPost.imgUrl };
			const response = await fetch(`api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify(changedPrompt),
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
			type='Change'
			post={userPost}
			setPost={setUserPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;

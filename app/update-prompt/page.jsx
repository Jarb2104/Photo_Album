'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPromptById, updatePrompt } from '@app/redux/features/promptsSlice';

const EditPrompt = () => {
	const dispatch = useDispatch();

	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');
	const promptData = useSelector((state) => selectPromptById(state, promptId));

	const [submitting, setSubmitting] = useState(false);
	const [userPost, setUserPost] = useState({ prompt: '', tags: '', imgUrl: '' });

	useEffect(() => {
		if (promptId) {
			if (promptData) {
				setUserPost({
					prompt: promptData.prompt,
					tags: promptData.tags.map((t) => t.tag).toString(),
					imgUrl: promptData.imgUrl,
				});
			} else {
				alert('Prompt not found');
				router.push('/');
			}
		}
	}, [promptId]);

	const updateChangedPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert('Unable to find modified prompt');

		try {
			const changedPrompt = {
				promptId: promptId,
				newValues: {
					prompt: userPost.prompt,
					imgUrl: userPost.imgUrl,
					tags: userPost.tags,
				},
			};
			await dispatch(updatePrompt(changedPrompt)).unwrap();
			router.push('/');
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
			handleSubmit={updateChangedPrompt}
		/>
	);
};

export default EditPrompt;

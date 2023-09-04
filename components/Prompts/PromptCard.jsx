'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import copyImage from '../../assets/icons/copy.svg';
import tickImage from '../../assets/icons/tick.svg';

const PromptCard = ({ promptData, handleCardTagClick, handleChange, handleDelete }) => {
	const [promptTest, setPromptTest] = useState('');
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const handleCopy = () => {
		setPromptTest(promptData.prompt);
		navigator.clipboard.writeText(promptData.prompt);
		setTimeout(() => setPromptTest(''), 9000);
	};

	const handleUserClicked = () => {
		router.push(`/profile/user-profile?id=${promptData.user?.id}`);
	};

	return (
		<div className='prompt_card'>
			<div className='flex justify-between items-start gap-5'>
				<div
					className='flex-1 felx justify-start items-center gap-3 cursor-pointer'
					onClick={handleUserClicked}
				>
					<Image
						src={promptData.user?.image}
						alt='user_image'
						width={40}
						height={40}
						className='rounded-full object-contain'
					/>
					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold text-gray-900'>{promptData.user?.name}</h3>
						<p className='font-inter text-sm text-gray-500'>{promptData.user?.email}</p>
					</div>
				</div>
				<div
					className='copy_btn'
					onClick={handleCopy}
				>
					<Image
						src={promptTest === promptData.prompt ? tickImage : copyImage}
						width={12}
						height={12}
						alt={promptTest === promptData.prompt ? 'copied' : 'copy'}
					/>
				</div>
			</div>
			<div className='flex justify-between break-inside-avoid items-start gap-5 my-4 font-satoshi test-sm text-grey-700'>
				<p>{promptData.prompt}</p>
				<Image
					src={promptData.imgUrl}
					width={150}
					height={150}
					alt='your image goes here'
					className='rounded-lg border-2 border-blue-500 object-contain'
				/>
			</div>
			<div className='flex gap-2'>
				{promptData.tags.map((tag) => (
					<button
						key={tag.id}
						type='button'
						className='blue_btn'
						onClick={() => handleCardTagClick && handleCardTagClick(tag.tag)}
					>
						{tag.tag}
					</button>
				))}
			</div>
			{session?.user.id === promptData.user?.id && pathName === '/profile' && (
				<div className='mt-5 flex-end gap-4 border-t border-gray-100 pt-3'>
					<p
						className='font-inter text-sm green_gradient cursor-pointer'
						onClick={handleChange}
					>
						Change
					</p>
					<p
						className='font-inter text-sm orange_gradient cursor-pointer'
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
